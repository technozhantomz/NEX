export type UseActivityTagResult = {
  getActivityType: (type: string) => string;
};

export type ActivityTypeMap = {
  account_create: string;
  limit_order_create: string;
  limit_order_cancel: string;
  fill_order: string;
  account_update: string;
  account_upgrade: string;
  worker_create: string;
  proposal_create: string;
  balance_claim: string;
  transfer: string;
  asset_fund_fee_pool: string;
  account_whitelist: string;
  asset_create: string;
  asset_issue: string;
  asset_update: string;
  asset_claim_pool: string;
  asset_update_issuer: string;
  asset_update_feed_producers: string;
};
