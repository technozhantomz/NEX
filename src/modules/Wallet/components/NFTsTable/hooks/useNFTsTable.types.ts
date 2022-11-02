import { Dispatch, SetStateAction } from "react";

export type UseNFTsTableresult = {
  loading: boolean;
  nftRows: NFTRow[];
  searchDataSource: NFTRow[];
  setSearchDataSource: Dispatch<SetStateAction<NFTRow[]>>;
};

export type NFTRow = {
  key: string;
  img: string;
  name: string;
  maker: string;
  collection: string;
  // lastPrice: string;
  // bestOffer: string;
  quantity: number;
  // value: string;
  onSale: boolean;
};
