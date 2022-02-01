export type UseOrderBookResult = {
  asks: Order[];
  bids: Order[];
  handleThresholdChange: (value: string) => void;
};

export type Order = {
  base: string;
  price: string;
  quote: string;
};
