import { TransactionBuilder } from "peerplaysjs-lib";
import { useCallback } from "react";

import { useAsset } from "../../hooks";

import { ITransactionBuilder } from "./useTransactionBuilder.types";

export function useTransactionBuilder(): ITransactionBuilder {
  const { defaultAsset, setPrecision } = useAsset();
  const trxBuilder = useCallback(async (trx, keys) => {
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
      const tr = new TransactionBuilder();
      await trx.forEach((elem: any) =>
        tr.add_type_operation(elem.type, elem.params)
      );
      await tr.set_required_fees();
      const amtArr = tr.operations.map((x) => {
        return x[1].fee.amount;
      });
      let amt = 0;
      amtArr.forEach((e) => {
        amt += e;
      });
      const fee = setPrecision(true, amt, defaultAsset?.precision);
      return fee;
    },
    [defaultAsset, setPrecision]
  );

  return { trxBuilder, getTrxFee };
}
