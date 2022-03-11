import { TypeMap, UseActivityTag } from "./useActifityTag.types";

export function useActivityTag(): UseActivityTag {
  const getTypeString = (type: string): string => {
    const typeMap = {
      account_create: "Account Creation",
      limit_order_create: "Create Order",
      limit_order_cancel: "Cancel Order",
      fill_order: "Order Filled",
      account_update: "Account Updated",
      account_upgrade: "Account Upgraded",
      worker_create: "Worker Created",
      proposal_create: "Proposal Create",
      balance_claim: "Balance claim",
      transfer: "Transfer",
      asset_fund_fee_pool: "Fund Asset Fee Pool",
      account_whitelist: "Account Whitelist",
      asset_create: "Asset Create",
      asset_issue: "Issue Asset",
      asset_update: "Update Asset",
      asset_claim_pool: "Claim asset fee pool",
      asset_update_issuer: "Update asset issuer",
      asset_update_feed_producers: "Update asset feed producers",
    };
    return typeMap[type as keyof TypeMap];
  };
  return { getTypeString };
}
