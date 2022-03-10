export type UseHistoryResult = {
  getOperationType: (user: any, operation: any) => string;
  getHistoryById: (id: string) => Promise<History[]>;
};
