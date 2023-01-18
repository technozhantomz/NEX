export type OrderColumn = {
  title: string;
  dataIndex: string;
  key: string;
  render?: ((_value: string, record: unknown) => string) | undefined;
  fixed: string | boolean;
};
