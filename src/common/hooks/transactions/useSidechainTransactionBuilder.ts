import { useCallback } from "react";

import { useAssetsContext } from "../../providers";
import { Transaction } from "../../types";

import { UseSidechainTransactionBuilderResult } from "./useSidechainTransactionBuilder.types";

export function useSidechainTransactionBuilder(): UseSidechainTransactionBuilderResult {
  const { defaultAsset } = useAssetsContext();
  const buildAddingSidechainTransaction = useCallback(
    (
      user_account_id: string,
      deposit_public_key: string,
      deposit_address: string,
      withdraw_public_key: string,
      withdraw_address: string,
      sidechain: string
    ) => {
      const trx: Transaction = {
        type: "sidechain_address_add",
        params: {
          fee: {
            amount: 0,
            asset_id: defaultAsset?.id,
          },
          payer: user_account_id,
          sidechain_address_account: user_account_id,
          sidechain,
          deposit_public_key,
          deposit_address,
          deposit_address_data: "",
          withdraw_public_key,
          withdraw_address,
        },
      };
      return trx;
    },
    [defaultAsset]
  );

  const buildDeletingSidechainTransaction = useCallback(
    (
      user_account_id: string,
      sidechain_address_id: string,
      sidechain: string
    ) => {
      const trx: Transaction = {
        type: "sidechain_address_delete",
        params: {
          fee: {
            amount: 0,
            asset_id: defaultAsset?.id,
          },
          payer: user_account_id,
          sidechain_address_id,
          sidechain_address_account: user_account_id,
          sidechain,
        },
      };
      return trx;
    },
    [defaultAsset]
  );
  return {
    buildAddingSidechainTransaction,
    buildDeletingSidechainTransaction,
  };
}
