import { Form } from "antd";
import { Aes, TransactionHelper } from "peerplaysjs-lib";
import { FormFinishInfo } from "rc-field-form";
import { useEffect, useState } from "react";

import { useUserContext } from "../../../../../../../common/components/UserProvider";
import {
  useAccount,
  useFees,
  useTransactionBuilder,
} from "../../../../../../../common/hooks";
import { TransactionFee } from "../../../../../../../common/hooks/fees/useFees.types";
import { Account } from "../../../../../../../common/types";

import { ITransferForm } from "./useTransferForm.type";

export function useTransferForm(): ITransferForm {
  const [status, upStatus] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [feeData, setFeeData] = useState<TransactionFee>();
  const [toAccount, setToAccount] = useState<Account>();
  const [fromAccount, setFromAccount] = useState<Account>();
  const { getAccountByName, getPrivateKey, formAccountBalancesByName } =
    useAccount();
  const { trxBuilder } = useTransactionBuilder();
  const { localStorageAccount, assets } = useUserContext();
  const { getFees, feeCalculator } = useFees();
  const [transferForm] = Form.useForm();

  useEffect(() => {
    if (localStorageAccount !== null) {
      getFeeData();
      transferForm.setFieldsValue({ from: localStorageAccount });
    }
  }, [localStorageAccount, assets]);

  const onCancel = () => {
    setVisible(false);
  };

  const confirm = () => {
    transferForm.validateFields().then(() => {
      setVisible(true);
    });
  };

  const onFormFinish = (name: string, info: FormFinishInfo) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        sendTransfer(values.password);
      });
    }
  };

  const getFeeData = async () => {
    const rawFeeData = (await getFees()).filter(
      (item) => item.name === "TRANSFER"
    )[0];
    setFeeData({
      amount: rawFeeData.fee,
      asset_id: "1.3.0",
    });
  };

  const sendTransfer = async (password: string) => {
    const values = transferForm.getFieldsValue();
    const from = fromAccount
      ? fromAccount
      : await getAccountByName(values.from);
    const to = toAccount ? toAccount : await getAccountByName(values.to);
    const asset = assets.filter((asset) => asset.symbol === values.coin)[0];
    let memoFromPublic, memoToPublic;
    if (values.memo) {
      memoFromPublic = from.options.memo_key;
      memoToPublic = to.options.memo_key;
    }
    let memoFromPrivkey;
    const activeKey = getPrivateKey(password, "active");
    if (values.memo) {
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

    if (values.memo && memoFromPublic && memoToPublic) {
      if (
        !/111111111111111111111/.test(memoFromPublic) &&
        !/111111111111111111111/.test(memoToPublic)
      ) {
        const nonce = TransactionHelper.unique_nonce_uint64();
        const message = Aes.encrypt_with_checksum(
          memoFromPrivkey,
          memoToPublic,
          nonce,
          values.memo
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
          message: Buffer.isBuffer(values.memo)
            ? values.memo
            : Buffer.concat([
                Buffer.alloc(4),
                Buffer.from(values.memo.toString("utf-8"), "utf-8"),
              ]),
        };
      }
    }

    const amount = {
      amount: values.quantity * 10 ** Number(asset?.precision),
      asset_id: asset?.id,
    };

    const trx = {
      type: "transfer",
      params: {
        fee: {
          amount: 0,
          asset_id: asset?.id,
        },
        from: from.id,
        to: to.id,
        amount,
        memo: memoObject,
      },
    };
    let trxResult;
    try {
      trxResult = await trxBuilder([trx], [activeKey]);
    } catch (e) {
      console.log(e);
    }
    if (trxResult) {
      formAccountBalancesByName(localStorageAccount);
      setVisible(false);
      upStatus(
        `Successfully Transfered ${values.quantity} ${values.coin} to ${values.to}`
      );
    }
  };

  const validateFrom = async (_: unknown, value: string) => {
    if (value !== localStorageAccount)
      return Promise.reject(new Error("Not your Account"));
    setFromAccount(await getAccountByName(value));
    return Promise.resolve();
  };

  const validateTo = async (_: unknown, value: string) => {
    const acc = await getAccountByName(value);
    if (value === localStorageAccount)
      return Promise.reject(new Error("Can not send to yourself"));
    if (acc === undefined) return Promise.reject(new Error("User not found"));
    setToAccount(acc);
    return Promise.resolve();
  };

  const validateQuantity = async (_: unknown, value: number) => {
    const coin = transferForm.getFieldValue("coin");
    const accountAsset = assets.find((asset) => asset.symbol === coin);
    const total = Number(value) + Number(feeData?.amount);
    if (accountAsset !== undefined && accountAsset.amount > total)
      return Promise.resolve();
    return Promise.reject(
      new Error(`Must be less then ${accountAsset ? accountAsset.amount : ""}`)
    );
  };

  const validateMemo = async (_: unknown, value: string) => {
    const coin = transferForm.getFieldValue("coin");
    const updatedFee = await feeCalculator.transfer(value);
    const sendAmount = transferForm.getFieldValue("quantity");
    const accountAsset = assets.find((asset) => asset.symbol === coin);
    setFeeData({ amount: updatedFee, asset_id: "1.3.0" });
    const total = Number(updatedFee) + Number(sendAmount);
    if (accountAsset !== undefined && accountAsset.amount > total)
      return Promise.resolve();
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
    status,
    visible,
    feeData,
    transferForm,
    formValdation,
    confirm,
    onCancel,
    onFormFinish,
  };
}
