import { useCallback } from "react";

import { ActivityTypeMap, UseActivityTagResult } from "./useActivityTag.types";

export function useActivityTag(): UseActivityTagResult {
  const getActivityType = useCallback((type: string): string => {
    const activitytypeMap = {
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
    } as ActivityTypeMap;
    return activitytypeMap[type as keyof ActivityTypeMap];
  }, []);

  return { getActivityType };
}
