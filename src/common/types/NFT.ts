import { Amount } from "./Asset";

export type NFT = {
  id: string;
  nft_metadata_id: string;
  owner: string;
  approved: string;
  approved_operators: string[];
  token_uri: string;
};

export type NFTMetaData = {
  id: string;
  owner: string;
  name: string;
  symbol: string;
  base_uri: string;
  revenue_partner: string;
  revenue_split: number;
  is_transferable: boolean;
  is_sellable: boolean;
  max_supply: number;
};

export type NFTOffer = {
  id: string;
  issuer: string;
  item_ids: string[];
  minimum_price: Amount;
  maximum_price: Amount;
  buying_item: boolean;
  offer_expiration_date: string;
};
