export type BlockHeader = {
  extensions: any[];
  next_secret_hash: string;
  previous: string;
  previous_secret: string;
  timestamp: string;
  transaction_merkle_root: string;
  witness: string;
};
