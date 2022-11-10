import { Dispatch, SetStateAction } from "react";

export type UseNFTsTableresult = {
  loading: boolean;
  nftRows: NFTRow[];
  nftColumns: NFTColumnsType[];
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
  bestOffer: string;
  quantity: number;
  // value: string;
  onSale: boolean;
};

export type NFTColumnsType = {
  title: () => JSX.Element;
  dataIndex: string;
  key: string;
  render: ((img: string) => JSX.Element) | undefined;
  filters:
    | { text: string; value: string }[]
    | { text: string; value: boolean }[]
    | undefined;
  filterMode: string | undefined;
  filterSearch: boolean | undefined;
  onFilter:
    | ((value: boolean, record: NFTRow) => boolean)
    | ((value: string, record: NFTRow) => boolean)
    | undefined;
  sorter:
    | ((a: { bestOffer: string }, b: { bestOffer: string }) => number)
    | ((a: { quantity: number }, b: { quantity: number }) => number)
    | undefined;
};
