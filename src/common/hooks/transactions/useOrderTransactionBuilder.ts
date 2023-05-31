import { useCallback } from "react";

import { useAssetsContext } from "../../providers";
import { Amount, Asset, Transaction } from "../../types";

import { UseOrderTransactionBuilderResult } from "./useOrderTransactionBuilder.types";

export function useOrderTransactionBuilder(): UseOrderTransactionBuilderResult {
  const { defaultAsset } = useAssetsContext();

  const buildCreateLimitOrderTransaction = useCallback(
    (
      sellerId: string,
      amounts: {
        quantity: string;
        total: string;
      },
      assetPairs: { base: Asset; quote: Asset },
      expiration: string,
      fill_or_kill: boolean,
      extensions: any[],
      isBuyOrder: boolean
    ): Transaction => {
      let amount_to_sell, min_to_receive: Amount;
      if (isBuyOrder) {
        const sellAsset = assetPairs.base;
        const buyAsset = assetPairs.quote;
        amount_to_sell = {
          amount: Math.round(Number(amounts.total) * 10 ** sellAsset.precision),
          asset_id: sellAsset.id,
        };

        min_to_receive = {
          amount: Math.round(
            Number(amounts.quantity) * 10 ** buyAsset.precision
          ),
          asset_id: buyAsset.id,
        };
      } else {
        const sellAsset = assetPairs.quote;
        const buyAsset = assetPairs.base;
        amount_to_sell = {
          amount: Math.round(
            Number(amounts.quantity) * 10 ** sellAsset.precision
          ),
          asset_id: sellAsset.id,
        };

        min_to_receive = {
          amount: Math.round(Number(amounts.total) * 10 ** buyAsset.precision),
          asset_id: buyAsset.id,
        };
      }
      const trx = {
        type: "limit_order_create",
        params: {
          fee: { amount: 0, asset_id: defaultAsset?.id },
          seller: sellerId,
          amount_to_sell,
          min_to_receive,
          expiration,
          fill_or_kill,
          extensions: extensions,
        },
      };
      return trx;
    },
    [defaultAsset]
  );

  const buildCancelLimitOrderTransaction = useCallback(
    (orderId: string, feePayingAccount: string): Transaction => {
      const trx = {
        type: "limit_order_cancel",
        params: {
          fee_paying_account: feePayingAccount,
          order: orderId,
          fee: { amount: 0, asset_id: defaultAsset?.id },
        },
      };
      return trx;
    },
    [defaultAsset]
  );

  const buildSwapTransaction = useCallback(
    (
      sellerId: string,
      minToReceive: string,
      amountToSell: string,
      sellAsset: Asset,
      buyAsset: Asset
    ): Transaction => {
      const amount_to_sell = {
        amount: Math.round(Number(amountToSell) * 10 ** sellAsset.precision),
        asset_id: sellAsset.id,
      } as Amount;

      const min_to_receive = {
        amount: Math.round(Number(minToReceive) * 10 ** buyAsset.precision),
        asset_id: buyAsset.id,
      } as Amount;

      const trx = {
        type: "limit_order_create",
        params: {
          fee: { amount: 0, asset_id: defaultAsset?.id },
          seller: sellerId,
          amount_to_sell,
          min_to_receive,
          expiration: new Date(
            new Date().getTime() + 1000 * 60 * 60 * 24 * 365
          ).toISOString(),
          fill_or_kill: true,
          extensions: [],
        },
      };
      return trx;
    },
    [defaultAsset]
  );

  return {
    buildCreateLimitOrderTransaction,
    buildCancelLimitOrderTransaction,
    buildSwapTransaction,
  };
}
