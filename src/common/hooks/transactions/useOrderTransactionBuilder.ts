import { useCallback } from "react";

import { roundNum } from "..";
import { useAssetsContext } from "../../providers";
import { Amount, Asset, Transaction } from "../../types";

import { UseOrderTransactionBuilderResult } from "./useOrderTransactionBuilder.types";

export function useOrderTransactionBuilder(): UseOrderTransactionBuilderResult {
  const { defaultAsset } = useAssetsContext();

  const buildCreateLimitOrderTransaction = useCallback(
    (
      sellerId: string,
      quantity: number,
      total: number,
      currentBase: Asset,
      currentQuote: Asset,
      expiration: string,
      fill_or_kill: boolean,
      extensions: any[],
      isBuyOrder: boolean
    ): Transaction => {
      let amount_to_sell, min_to_receive: Amount;
      if (isBuyOrder) {
        const sellAsset = currentBase;
        const buyAsset = currentQuote;
        amount_to_sell = {
          amount: roundNum(
            total * 10 ** sellAsset.precision,
            sellAsset.precision
          ),
          asset_id: sellAsset.id,
        };

        min_to_receive = {
          amount: roundNum(
            quantity * 10 ** buyAsset.precision,
            buyAsset.precision
          ),
          asset_id: buyAsset.id,
        };
      } else {
        const sellAsset = currentQuote;
        const buyAsset = currentBase;
        amount_to_sell = {
          amount: roundNum(
            quantity * 10 ** sellAsset.precision,
            sellAsset.precision
          ),
          asset_id: sellAsset.id,
        };

        min_to_receive = {
          amount: roundNum(
            total * 10 ** buyAsset.precision,
            buyAsset.precision
          ),
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
    [defaultAsset, roundNum]
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
    [defaultAsset, roundNum]
  );

  const buildSwapTransaction = useCallback(
    (
      sellerId: string,
      minToReceive: number,
      amountToSell: number,
      sellAsset: Asset,
      buyAsset: Asset
    ): Transaction => {
      const amount_to_sell = {
        amount: roundNum(
          amountToSell * 10 ** sellAsset.precision,
          sellAsset.precision
        ),
        asset_id: sellAsset.id,
      } as Amount;

      const min_to_receive = {
        amount: roundNum(
          minToReceive * 10 ** buyAsset.precision,
          buyAsset.precision
        ),
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
    [defaultAsset, roundNum]
  );

  return {
    buildCreateLimitOrderTransaction,
    buildCancelLimitOrderTransaction,
    buildSwapTransaction,
  };
}
