import { useCallback } from "react";

import { useAssetsContext } from "../../providers";
import { Asset, Transaction, VestingBalance } from "../../types";

import { UseGPOSTransactionBuilderResult } from "./useGPOSTransactionBuilder.types";

export function useGPOSTransactionBuilder(): UseGPOSTransactionBuilderResult {
  const { defaultAsset } = useAssetsContext();

  const buildVestingBalanceCreateTransaction = useCallback(
    (
      gposAsset: Asset,
      depositAmount: number,
      accountId: string
    ): Transaction => {
      const begin_timestamp = new Date().toISOString().replace("Z", "");
      const amount = {
        amount: Math.round(Number(depositAmount) * 10 ** gposAsset.precision),
        asset_id: gposAsset.id,
      };
      const trx = {
        type: "vesting_balance_create",
        params: {
          fee: {
            amount: 0,
            asset_id: gposAsset.id,
          },
          creator: accountId,
          owner: accountId,
          amount: amount,
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
      const amount = {
        amount: Math.round(Number(withdrawAmount) * 10 ** gposAsset.precision),
        asset_id: gposAsset.id,
      };
      const trx = {
        type: "vesting_balance_withdraw",
        params: {
          fee: {
            amount: 0,
            asset_id: gposAsset.id,
          },
          vesting_balance: vestingBalances[0].id,
          owner: accountId,
          amount: amount,
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
