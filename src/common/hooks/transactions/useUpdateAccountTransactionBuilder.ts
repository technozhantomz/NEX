import { useCallback } from "react";

import { useAssetsContext } from "../../providers";
import { Transaction } from "../../types";

import { UseUpdateAccountTransactionBuilderResult } from "./useUpdateAccountTransactionBuilder.types";

export function useUpdateAccountTransactionBuilder(): UseUpdateAccountTransactionBuilderResult {
  const { defaultAsset } = useAssetsContext();

  const buildUpdateAccountTransaction = useCallback(
    (updatedAccount: any, accountId: string): Transaction => {
      const trx = {
        type: "account_update",
        params: {
          ...updatedAccount,
          account: accountId,
          fee: {
            amount: 0,
            asset_id: defaultAsset?.id,
          },
        },
      };
      return trx;
    },
    [defaultAsset]
  );
  return { buildUpdateAccountTransaction };
}
