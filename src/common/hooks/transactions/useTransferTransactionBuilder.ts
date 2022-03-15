import { Aes, TransactionHelper } from "peerplaysjs-lib";
import { useCallback } from "react";

import { useAccount, useAsset } from "..";
import { Account, Asset, Transaction } from "../../types";

import { UseTransferTransactionBuilderResult } from "./useTransferTransactionBuilder.types";

export function useTransferTransactionBuilder(): UseTransferTransactionBuilderResult {
  const { getPrivateKey } = useAccount();
  const { defaultAsset } = useAsset();

  const buildTransferTransaction = useCallback(
    (
      from: Account,
      to: Account,
      memo: string,
      asset: Asset,
      password: string,
      quantity: number
    ): Transaction => {
      let memoFromPublic, memoToPublic;
      if (memo) {
        memoFromPublic = from.options.memo_key;
        memoToPublic = to.options.memo_key;
      }
      let memoFromPrivkey;
      if (memo) {
        if (from.options.memo_key === from.active.key_auths[0][0]) {
          memoFromPrivkey = getPrivateKey(password, "active");
        } else {
          memoFromPrivkey = getPrivateKey(password, "memo");
        }
        if (!memoFromPrivkey) {
          throw new Error("Missing private memo key for sender: " + from.name);
        }
      }
      let memoObject;
      if (memo && memoFromPublic && memoToPublic) {
        if (
          !/111111111111111111111/.test(memoFromPublic) &&
          !/111111111111111111111/.test(memoToPublic)
        ) {
          const nonce = TransactionHelper.unique_nonce_uint64();
          const message = Aes.encrypt_with_checksum(
            memoFromPrivkey,
            memoToPublic,
            nonce,
            memo
          );
          memoObject = {
            from: memoFromPublic,
            to: memoToPublic,
            nonce,
            message,
          };
        } else {
          memoObject = {
            from: memoFromPublic,
            to: memoToPublic,
            nonce: 0,
            message: Buffer.isBuffer(memo)
              ? memo
              : Buffer.concat([
                  Buffer.alloc(4),
                  Buffer.from(memo.toString(), "utf-8"),
                ]),
          };
        }
      }

      const amount = {
        amount: quantity * 10 ** Number(asset?.precision),
        asset_id: asset?.id,
      };

      const trx = {
        type: "transfer",
        params: {
          fee: {
            amount: 0,
            asset_id: defaultAsset?.id,
          },
          from: from.id,
          to: to.id,
          amount,
          memo: memoObject,
        },
      };
      return trx;
    },
    [getPrivateKey, defaultAsset]
  );
  return { buildTransferTransaction };
}
