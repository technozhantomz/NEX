export type BlockPage = {
  blockData: BlockData;
};

export type BlockData = {
  blockID: string;
  time: string;
  transactions: number;
  witness: string;
};
