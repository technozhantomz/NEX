import counterpart from "counterpart";
import { uniq } from "lodash";
import { useCallback, useEffect, useState } from "react";

import {
  isJson,
  useAccount,
  useAsset,
  useNFTs,
} from "../../../../../common/hooks";
import { useUserContext } from "../../../../../common/providers";
import { NFTColumns } from "../NFTColumns";

import {
  NFTColumnsType,
  NFTRow,
  UseNFTsTableresult,
} from "./useNFTsTable.types";

export function useNFTsTable(): UseNFTsTableresult {
  const [loading, setLoading] = useState<boolean>(true);
  const [nftRows, setNFTRows] = useState<NFTRow[]>([]);
  const [nftColumns, setNFTColumns] = useState<NFTColumnsType[]>(NFTColumns);
  const [searchDataSource, setSearchDataSource] = useState<NFTRow[]>([]);
  const { id, localStorageAccount } = useUserContext();
  const { getUserNamesByIds } = useAccount();
  const { getAssetById } = useAsset();
  const { getNFTsByOwner, getMetaDataByIds, getQuantity, getOffers } =
    useNFTs();

  const getNFTs = useCallback(async () => {
    setLoading(true);
    if (id) {
      try {
        // get All user NFTS
        const rawNFTs = await getNFTsByOwner(id);
        if (rawNFTs && rawNFTs.length > 0) {
          const NFTsMetaDataIds = rawNFTs.map((nft) => nft.nft_metadata_id);
          const NFTsMetaData = await getMetaDataByIds(NFTsMetaDataIds);

          let NFTsOwners: string[] = [];
          if (NFTsMetaData && NFTsMetaData.length > 0) {
            NFTsOwners = await getUserNamesByIds(
              NFTsMetaData.map((metaData) => metaData.owner)
            );
          }

          // create NFT rows
          const NFTS = await Promise.all(
            rawNFTs.map(async (nft, index) => {
              const nftMetaData = NFTsMetaData?.find(
                (metaData) => metaData.id === nft.nft_metadata_id
              );
              let nftMaker = "";
              let collection = "";
              if (nftMetaData) {
                nftMaker = NFTsOwners[index];
                collection = nftMetaData.name;
              }

              const nftQuantity = (await getQuantity(nft.nft_metadata_id)) ?? 1;
              const nftOffers = await getOffers(nft.id);

              const isUriJson = isJson(nft.token_uri);
              const nftUri = isUriJson
                ? JSON.parse(nft.token_uri)
                : nft.token_uri;
              const nftImg = isUriJson
                ? nftUri.image.replace(
                    "ipfs://",
                    "https://tradehands.peerplays.download/ipfs/"
                  )
                : "";
              let nftOnSale = false;
              let bestOffer = "";
              if (nftOffers && nftOffers.length > 0) {
                const sellOffers = nftOffers.filter(
                  (offer) => offer.buying_item === false
                );
                nftOnSale = sellOffers.length > 0 ? true : false;
                const bestOfferAmmount = nftOffers
                  .filter((offer) => offer.buying_item === true)
                  .sort(
                    (a, b) => a.maximum_price.amount - b.maximum_price.amount
                  )[0].maximum_price;
                const bestOfferAsset = await getAssetById(
                  bestOfferAmmount.asset_id
                );
                bestOffer = `${bestOfferAmmount.amount} ${bestOfferAsset?.symbol}`;
              }
              return {
                key: nft.id,
                img: nftImg,
                name: isUriJson ? nftUri.name : "",
                maker: nftMaker,
                collection: collection,
                bestOffer: bestOffer,
                quantity: nftQuantity,
                onSale: nftOnSale,
              };
            })
          );

          const makers = uniq(NFTS.map((nft) => nft.maker));
          const collections = uniq(NFTS.map((nft) => nft.collection));
          const updatedNFTColumns = NFTColumns.map((column) => {
            switch (true) {
              case column.key === "maker":
                column.filters = makers.map((maker) => {
                  return { text: maker, value: maker };
                });
                break;
              case column.key === "collection":
                column.filters = collections.map((collection) => {
                  return { text: collection, value: collection };
                });
                break;
              case column.key === "onSale":
                column.filters = [
                  {
                    text: counterpart.translate(`tableFilters.on_sale`),
                    value: true,
                  },
                  {
                    text: counterpart.translate(`tableFilters.not_for_sale`),
                    value: false,
                  },
                ];
                break;
            }
            return column;
          });
          setNFTColumns(updatedNFTColumns);
          setNFTRows(NFTS);
          setSearchDataSource(NFTS);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  }, [
    getNFTsByOwner,
    getMetaDataByIds,
    getUserNamesByIds,
    setLoading,
    getQuantity,
    getOffers,
    getAssetById,
    id,
    localStorageAccount,
    NFTColumns,
  ]);

  useEffect(() => {
    getNFTs();
  }, [getNFTs]);

  return {
    loading,
    nftRows,
    nftColumns,
    searchDataSource,
    setSearchDataSource,
  };
}
