import { useCallback } from "react";

import { usePeerplaysApiContext } from "../../providers";
import { NFT, NFTMetaData, NFTOffer } from "../../types";

import { UseNFTsResult } from "./useNFTs.types";

export function useNFTs(): UseNFTsResult {
  const { dbApi } = usePeerplaysApiContext();

  const getNFTsByOwner = useCallback(
    async (accountId: string) => {
      try {
        const rawNFTs: NFT[] = await dbApi("nft_get_tokens_by_owner", [
          accountId,
        ]);
        return rawNFTs;
      } catch (e) {
        console.error(e);
      }
    },
    [dbApi]
  );

  const getMetaData = useCallback(
    async (metaDataId: string) => {
      try {
        const NFTMetaData: NFTMetaData[] = await dbApi("get_objects", [
          [metaDataId],
        ]);
        return NFTMetaData[0];
      } catch (e) {
        console.error(e);
      }
    },
    [dbApi]
  );

  const getMultipleMetaData = useCallback(
    async (metaDataIds: string[]) => {
      try {
        const NFTMetaData: NFTMetaData[] = await dbApi("get_objects", [
          metaDataIds,
        ]);
        return NFTMetaData;
      } catch (e) {
        console.error(e);
      }
    },
    [dbApi]
  );

  const getQuantity = useCallback(
    async (metaDataId: string) => {
      try {
        const NFTQuantity: number = await dbApi("nft_get_total_supply", [
          metaDataId,
        ]);
        return NFTQuantity;
      } catch (e) {
        console.error(e);
      }
    },
    [dbApi]
  );

  const getOffers = useCallback(
    async (nftId: string) => {
      try {
        const offers: NFTOffer[] = await dbApi("get_offers_by_item", [
          "1.29.0",
          nftId,
          10,
        ]);
        return offers;
      } catch (e) {
        console.error(e);
      }
    },
    [dbApi]
  );

  return {
    getNFTsByOwner,
    getMetaData,
    getQuantity,
    getOffers,
    getMultipleMetaData,
  };
}
