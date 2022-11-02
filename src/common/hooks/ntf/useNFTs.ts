import { useCallback } from "react";

import { usePeerplaysApiContext } from "../../providers";

import { UseNFTsResult } from "./useNFTs.types";

export function useNFTs(): UseNFTsResult {
  const { dbApi } = usePeerplaysApiContext();

  const getNFTsByOwner = useCallback(async (accountId: string) => {
    try {
      const rawNFTs = await dbApi("nft_get_tokens_by_owner", [accountId]);
      return rawNFTs;
    } catch (e) {
      console.error(e);
    }
  }, []);

  const getMetaData = useCallback(async (metaDataId: string) => {
    try {
      const NFTMetaData = await dbApi("get_objects", [[metaDataId]]);
      return NFTMetaData[0];
    } catch (e) {
      console.error(e);
    }
  }, []);

  const getQuantity = useCallback(async (metaDataId: string) => {
    try {
      const NFTQuantity = await dbApi("nft_get_total_supply", [metaDataId]);
      return NFTQuantity;
    } catch (e) {
      console.error(e);
    }
  }, []);

  const getOffers = useCallback(async (nftId: string) => {
    try {
      const offers = await dbApi("get_offers_by_item", ["1.29.0", nftId, 10]);
      return offers;
    } catch (e) {
      console.error(e);
    }
  }, []);

  return { getNFTsByOwner, getMetaData, getQuantity, getOffers };
}
