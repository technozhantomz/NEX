export type BlockPage = {
  blockData: BlockData;
  onTabClick: (key: string) => void;
};

export type BlockData = {
  blockID: string;
  time: string;
  transactions: number;
  witness: string;
};
