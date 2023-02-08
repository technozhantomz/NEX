export type BookedOrder = {
  base: string;
  price: string;
  quote: string;
};

export type OrderBook = {
  base: string;
  quote: string;
  asks: BookedOrder[];
  bids: BookedOrder[];
};
