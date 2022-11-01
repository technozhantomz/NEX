export type UseNFTsTableresult = {
  loading: boolean;
  nftRows: NFTRow[];
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
