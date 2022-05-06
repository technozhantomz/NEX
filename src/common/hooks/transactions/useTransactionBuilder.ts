import { TransactionBuilder } from "peerplaysjs-lib";
import { useCallback } from "react";

import { useAsset } from "../../hooks";

import { ITransactionBuilder } from "./useTransactionBuilder.types";

export function useTransactionBuilder(): ITransactionBuilder {
  const { defaultAsset, setPrecision } = useAsset();
  const buildTrx = useCallback(async (trx, keys) => {
    const tr = new TransactionBuilder();

    await trx.forEach((elem: any) =>
      tr.add_type_operation(elem.type, elem.params)
    );
    await tr.set_required_fees();
    await keys.forEach((elem: any) => tr.add_signer(elem));

    return tr.broadcast();
  }, []);

  const getTrxFee = useCallback(
    async (trx) => {
      if (defaultAsset !== undefined) {
        const tr = new TransactionBuilder();
        await trx.forEach((elem: any) =>
          tr.add_type_operation(elem.type, elem.params)
        );
        await tr.set_required_fees();
        const feeAmounts: number[] = tr.operations.map((operation: any) => {
          return operation[1].fee.amount;
        });
        let feeAmount = 0;
        feeAmounts.forEach((amount) => {
          feeAmount += amount;
        });
        const fee = setPrecision(true, feeAmount, defaultAsset?.precision);
        return fee;
      }
    },
    [defaultAsset, setPrecision]
  );

  return { buildTrx, getTrxFee };
}
