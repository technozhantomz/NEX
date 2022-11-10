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
  const { getUserNameById } = useAccount();
  const { getAssetById } = useAsset();
  const { getNFTsByOwner, getMultipleMetaData, getQuantity, getOffers } =
    useNFTs();

  const getNFTs = useCallback(async () => {
    setLoading(true);
    if (id) {
      try {
        const rawNFTs = await getNFTsByOwner(id); // NFTS by owner
        if (rawNFTs && rawNFTs.length > 0) {
          const multipleMetaData = await getMultipleMetaData(
            rawNFTs.map((nft) => nft.nft_metadata_id)
          );
          if (multipleMetaData && multipleMetaData.length > 0) {
            const NFTS = await Promise.all(
              rawNFTs.map(async (nft) => {
                const nftMetaData = multipleMetaData.find(
                  (metaData) => metaData.id === nft.nft_metadata_id
                );
                let nftMaker = "";
                let collection = "";
                if (nftMetaData) {
                  nftMaker = await getUserNameById(nftMetaData.owner);
                  collection = nftMetaData.name;
                }

                const nftQuantity =
                  (await getQuantity(nft.nft_metadata_id)) ?? 1;
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
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [setLoading, id, localStorageAccount]);

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
