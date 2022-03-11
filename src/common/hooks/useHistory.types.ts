export type UseHistoryResult = {
  getOperationInfo: (user: any, operation: any) => Promise<any>;
  getHistoryById: (id: string) => Promise<History[]>;
};

export type FormInfoData = {
  account_create: ({ registrar, name }: any) => Promise<any>;
  account_upgrade: ({ account_to_upgrade }: any) => Promise<any>;
  worker_create: ({ owner }: any) => Promise<any>;
  account_update: ({ account }: any) => Promise<any>;
  transfer: ({ from, to, amount }: any) => Promise<any>;
  limit_order_cancel: ({ fee_paying_account, order }: any) => Promise<any>;
  limit_order_create: (
    { seller, min_to_receive, amount_to_sell }: any,
    id: string
  ) => Promise<any>;
  fill_order: ({ receives, pays, order_id, account_id }: any) => Promise<any>;
  asset_fund_fee_pool: ({
    from_account,
    asset_id,
    amount,
  }: any) => Promise<any>;
  account_whitelist: ({
    account_to_list,
    authorizing_account,
    new_listing,
  }: any) => Promise<any>;
  asset_create: ({ symbol, issuer }: any) => Promise<any>;
  asset_issue: ({
    asset_to_issue,
    issue_to_account,
    issuer,
  }: any) => Promise<any>;
  asset_update: ({ issuer, asset_to_update }: any) => Promise<any>;
  asset_claim_pool: ({
    amount_to_claim,
    asset_id,
    issuer,
  }: any) => Promise<any>;
  asset_update_issuer: ({
    new_issuer,
    asset_to_update,
    issuer,
  }: any) => Promise<any>;
  asset_update_feed_producers: ({
    asset_to_update,
    issuer,
  }: any) => Promise<any>;
};
