import { uniq } from "lodash";
import { useCallback, useEffect, useState } from "react";

import { isJson, useAccount, useNFTs } from "../../../../../common/hooks";
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
  const { getNFTsByOwner, getMetaData, getQuantity, getOffers } = useNFTs();

  const getNFTs = useCallback(async () => {
    setLoading(true);
    if (id) {
      const rawNFTs = await getNFTsByOwner(id); // NFTS by owner
      if (rawNFTs.length > 0) {
        const NFTS = await Promise.all(
          rawNFTs.map(async (nft) => {
            const nftMetaData = await getMetaData(nft.nft_metadata_id);
            const nftMaker = await getUserNameById(nftMetaData.owner);
            const nftQuantity = await getQuantity(nft.nft_metadata_id);
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
            if (nftOffers.length > 0) {
              const sellOffers = nftOffers.filter(
                (offer) => offer.buying_item === false
              );
              nftOnSale = sellOffers.length > 0 ? true : false;
            }
            return {
              key: nft.id,
              img: nftImg,
              name: isUriJson ? nftUri.name : "",
              maker: nftMaker,
              collection: nftMetaData.name,
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
      }
    }
  }, [id]);

  useEffect(() => {
    getNFTs();
  }, [id, localStorageAccount]);

  return {
    loading,
    nftRows,
    nftColumns,
    searchDataSource,
    setSearchDataSource,
  };
}
