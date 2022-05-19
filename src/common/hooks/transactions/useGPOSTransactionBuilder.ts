import { useCallback } from "react";

import { useAsset } from "..";
import { Asset, Transaction, VestingBalance } from "../../types";

import { UseGPOSTransactionBuilderResult } from "./useGPOSTransactionBuilder.types";

export function useGPOSTransactionBuilder(): UseGPOSTransactionBuilderResult {
  const { defaultAsset } = useAsset();

  const buildVestingBalanceCreateTransaction = useCallback(
    (
      gposAsset: Asset,
      depositAmount: number,
      accountId: string
    ): Transaction => {
      const begin_timestamp = new Date().toISOString().replace("Z", "");
      const trx = {
        type: "vesting_balance_create",
        params: {
          fee: {
            amount: 0,
            asset_id: gposAsset.id,
          },
          creator: accountId,
          owner: accountId,
          amount: {
            amount: depositAmount,
            asset_id: gposAsset.id,
          },
          asset_symbol: gposAsset.symbol,
          policy: [
            0,
            {
              begin_timestamp,
              vesting_cliff_seconds: 0,
              vesting_duration_seconds: 0,
            },
          ],
          balance_type: "gpos",
        },
      };
      return trx;
    },
    [defaultAsset]
  );

  const buildVestingWithdrawTransaction = useCallback(
    (
      gposAsset: Asset,
      withdrawAmount: number,
      vestingBalances: VestingBalance[],
      accountId: string
    ): Transaction => {
      const trx = {
        type: "vesting_balance_withdraw",
        params: {
          fee: {
            amount: 0,
            asset_id: gposAsset.id,
          },
          vesting_balance: vestingBalances[0].id,
          owner: accountId,
          amount: {
            amount: withdrawAmount,
            asset_id: gposAsset.id,
          },
        },
      };
      return trx;
    },
    [defaultAsset]
  );

  return {
    buildVestingBalanceCreateTransaction,
    buildVestingWithdrawTransaction,
  };
}
