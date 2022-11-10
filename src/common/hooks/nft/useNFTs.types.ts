import { NFT, NFTMetaData, NFTOffer } from "../../types";

export type UseNFTsResult = {
  getNFTsByOwner: (accountId: string) => Promise<NFT[] | undefined>;
  getMetaData: (metaDataId: string) => Promise<NFTMetaData | undefined>;
  getMultipleMetaData: (
    metaDataIds: string[]
  ) => Promise<NFTMetaData[] | undefined>;
  getQuantity: (metaDataId: string) => Promise<number | undefined>;
  getOffers: (nftId: string) => Promise<NFTOffer[] | undefined>;
};
