import { useCallback } from "react";

import { roundNum, useAsset } from "..";
import { Amount, Asset, Transaction } from "../../types";

import { UseLimitOrderTransactionBuilderResult } from "./useLimitOrderTransactionBuilder.types";

export function useLimitOrderTransactionBuilder(): UseLimitOrderTransactionBuilderResult {
  const { defaultAsset } = useAsset();

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
      } else {
        const sellAsset = currentQuote as Asset;
        const buyAsset = currentBase as Asset;
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
  return { buildCreateLimitOrderTransaction };
}
