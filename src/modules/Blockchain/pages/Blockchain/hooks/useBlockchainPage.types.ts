export type BlockchainPage = {
  pageMeta: PageMeta;
  onTabClick: (key: string) => void;
};

export type PageMeta = {
  title: string;
  heading: string;
  description: string;
};
