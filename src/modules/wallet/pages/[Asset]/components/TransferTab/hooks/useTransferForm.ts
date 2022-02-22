import { Form } from "antd";
import { Aes, TransactionHelper } from "peerplaysjs-lib";
import { useEffect, useState } from "react";

import {
  useAccount,
  useAsset,
  useFees,
  useTransactionBuilder,
} from "../../../../../../../common/hooks";
import { ITransactionFee } from "../../../../../../../common/hooks/fees/useFees.type";
import { IFullAccount } from "../../../../../../../common/types";
import { useUser } from "../../../../../../../context";

import { ITransferForm, ITransferFormData } from "./useTransferForm.type";

export function useTransferForm(): ITransferForm {
  const [validFrom, setValidForm] = useState<boolean>(false);
  const [feeData, setFeeData] = useState<ITransactionFee>();
  const [toAccount, setToAccount] = useState<IFullAccount>();
  const { getAccountByName } = useAccount();
  const {trxBuilder } = useTransactionBuilder();
  const { accountData } = useUser();
  const { getFees, feeCalculator } = useFees();
  const [transferForm] = Form.useForm();
  const { setPrecision } = useAsset();

  useEffect(() => {
    getFeeData();
  }, []);

  const getFeeData = async () => {
    const rawFeeData = await (
      await getFees()
    ).filter((item) => item.name === "TRANSFER")[0];
    setFeeData({
      amount: rawFeeData.fee,
      asset_id: "1.3.0",
    });
  };

  const onSend = async (values: ITransferFormData) => {
    transferForm.validateFields().then(async () => {
      console.log(values);
      const fromAccount = getAccountByName(values.form);
      toAccount = toAccount ? toAccount : getAccountByName(values.to);
      let memoFromPublic, memoToPublic;
      if (values.memo) {
        memoFromPublic = fromAccount.options.memo_key;
        memoToPublic = toAccount.options.memo_key;
      }
      let memoFromPrivkey;
      //TODO need to get private keey and password Prompt would need to fire here
      // const activeKey =
      // if (values.memo) {
      //   if (
      //     fromAccount.options.memo_key === fromAccount.active.key_auths[0][0]
      //   ) {
      //     memoFromPrivkey = loginData.formPrivateKey(password, "active");
      //   } else {
      //     memoFromPrivkey = loginData.formPrivateKey(password, "memo");
      //   }
      //   if (!memoFromPrivkey) {
      //     throw new Error(
      //       "Missing private memo key for sender: " + fromAccount
      //     );
      //   }
      // }
      //let memoObject;

      // if (values.memo && memoFromPublic && memoToPublic) {
      //   if (
      //     !/111111111111111111111/.test(memoFromPublic) &&
      //     !/111111111111111111111/.test(memoToPublic)
      //   ) {
      //     const nonce = TransactionHelper.unique_nonce_uint64();
      //     memoObject = {
      //       from: memoFromPublic,
      //       to: memoToPublic,
      //       nonce,
      //       message: Aes.encrypt_with_checksum(
      //         memoFromPrivkey,
      //         memoToPublic,
      //         nonce,
      //         values.memo
      //       ),
      //     };
      //   } else {
      //     memoObject = {
      //       from: memoFromPublic,
      //       to: memoToPublic,
      //       nonce: 0,
      //       message: Buffer.isBuffer(values.memo)
      //         ? values.memo
      //         : Buffer.concat([
      //             Buffer.alloc(4),
      //             Buffer.from(values.memo.toString("utf-8"), "utf-8"),
      //           ]),
      //     };
      //   }
      // }
      const trx = {
        type: "transfer",
        params: {
          fee: feeData,
          from: fromAccount?.id,
          to: toAccount?.id,
          amount: values.quantity,
          memo: null,
        },
      };
      const trxResult = await trxBuilder([trx], [activeKey]);
    });
  };

  const validateFrom = (_: unknown, value: string) => {
    if (value !== accountData?.name)
      return Promise.reject(new Error("Not your Account"));
    return Promise.resolve();
  };

  const validateTo = async (_: unknown, value: string) => {
    const acc = await getAccountByName(value);
    if (value === accountData?.name)
      return Promise.reject(new Error("Can not send to yourself"));
    if (acc === undefined) return Promise.reject(new Error("User not found"));
    setToAccount(acc);
    return Promise.resolve();
  };

  const validateQuantity = async (_: unknown, value: number) => {
    const coin = transferForm.getFieldValue("coin");
    const accountAsset = accountData?.assets.filter(
      (asset) => asset.symbol === coin
    );
    const accountBalance = accountAsset
      ? setPrecision(true, accountAsset[0].amount, accountAsset[0].precision)
      : undefined;
    if (accountBalance !== undefined && accountBalance > value + feeData.amount)
      return Promise.resolve();
    return Promise.reject(
      new Error(
        `Must be less then ${accountAsset ? accountAsset[0].amount : ""}`
      )
    );
  };

  const validateMemo = (_: unknown, value: string) => {
    const coin = transferForm.getFieldValue("coin");
    const updatedFee = feeCalculator.transfer(value);
    const sendAmount = transferForm.getFieldValue("quantity");
    const accountAsset = accountData?.assets.filter(
      (asset) => asset.symbol === coin
    );
    const accountBalance = accountAsset
      ? setPrecision(true, accountAsset[0].amount, accountAsset[0].precision)
      : undefined;
    setFeeData({ amount: updatedFee, asset_id: "1.3.0" });
    if (
      accountBalance !== undefined &&
      accountBalance > updatedFee + sendAmount
    ) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(`Insufficient Funds`));
  };

  const formValdation = {
    from: [
      { required: true, message: "From is required" },
      { validator: validateFrom },
    ],
    to: [
      { required: true, message: "To is required" },
      { validator: validateTo },
    ],
    quantity: [
      { required: true, message: "Quantity is required" },
      { validator: validateQuantity },
    ],
    coin: [{ required: true, message: "Coin is required" }],
    memo: [{ validator: validateMemo }],
  };

  return {
    validFrom,
    feeData,
    transferForm,
    onSend,
    formValdation,
  };
}
