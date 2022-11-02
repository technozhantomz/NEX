import { NFT, NFTMetaData, NFTOffer } from "../../types";

export type UseNFTsResult = {
  getNFTsByOwner: (accountId: string) => Promise<NFT[]>;
  getMetaData: (metaDataId: string) => Promise<NFTMetaData>;
  getQuantity: (metaDataId: string) => Promise<number>;
  getOffers: (nftId: string) => Promise<NFTOffer[]>;
};
