import { TransactionBuilder } from "peerplaysjs-lib";
import { useCallback } from "react";

import { ITransactionBuilder } from "./useTransactionBuilder.type";

export function useTransactionBuilder(): ITransactionBuilder {
  const trxBuilder = useCallback(async (trx, keys) => {
    const tr = new TransactionBuilder();

    await trx.forEach((elem) => tr.add_type_operation(elem.type, elem.params));
    await tr.set_required_fees();
    await keys.forEach((elem) => tr.add_signer(elem));

    return tr.broadcast();
  }, []);

  return { trxBuilder };
}
