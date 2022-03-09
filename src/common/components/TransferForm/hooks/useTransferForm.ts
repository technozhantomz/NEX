import { Aes, TransactionHelper } from "peerplaysjs-lib";
import { useEffect, useState } from "react";

import { defaultToken } from "../../../../api/params/networkparams";
import { Form } from "../../../../ui/src";
import {
  roundNum,
  useAccount,
  useAsset,
  useFees,
  useTransactionBuilder,
} from "../../../hooks";
import { Account } from "../../../types";
import { useUserContext } from "../../UserProvider";

import { TransferForm } from "./useTransferForm.types";

export function useTransferForm(): TransferForm {
  const [status, setStatus] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [toAccount, setToAccount] = useState<Account>();
  const [fromAccount, setFromAccount] = useState<Account>();
  const { getAccountByName, getPrivateKey, formAccountBalancesByName } =
    useAccount();
  const { defaultAsset } = useAsset();
  const { localStorageAccount, assets } = useUserContext();
  const { trxBuilder } = useTransactionBuilder();
  const { calculteTransferFee } = useFees();
  const [transferForm] = Form.useForm();

  useEffect(() => {
    const transferFee = calculteTransferFee(transferForm.getFieldValue("memo"));
    if (transferFee) {
      setFeeAmount(transferFee);
    }
    transferForm.setFieldsValue({ from: localStorageAccount });
  }, [localStorageAccount, calculteTransferFee, assets]);

  const onCancel = () => {
    setVisible(false);
  };

  const confirm = () => {
    transferForm.validateFields().then(() => {
      setVisible(true);
    });
  };

  const onFormFinish = (name: string, info: { values: any; forms: any }) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        sendTransfer(values.password);
      });
    }
  };

  const handleValuesChange = (changedValues: any) => {
    setStatus("");
    if (changedValues.quantity) {
      if (changedValues.quantity < 0) {
        transferForm.setFieldsValue({ quantity: 0 });
      } else {
        const selectedAsset = transferForm.getFieldValue("asset");
        const selectedAccountAsset = assets.find(
          (asset) => asset.symbol === selectedAsset
        );

        if (selectedAccountAsset) {
          transferForm.setFieldsValue({
            quantity: roundNum(
              changedValues.quantity,
              selectedAccountAsset.precision
            ),
          });
        }
      }
    }
  };

  const sendTransfer = async (password: string) => {
    const values = transferForm.getFieldsValue();
    const from = (
      fromAccount ? fromAccount : await getAccountByName(values.from)
    ) as Account;
    const to = (
      toAccount ? toAccount : await getAccountByName(values.to)
    ) as Account;
    const asset = assets.filter((asset) => asset.symbol === values.asset)[0];
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
          asset_id: defaultAsset?.id,
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
      setStatus(
        `Successfully Transfered ${values.quantity} ${values.asset} to ${values.to}`
      );
      transferForm.resetFields();
    } else {
      setVisible(false);
      setStatus("Server error, please try again later.");
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
    if (value === localStorageAccount) {
      return Promise.reject(new Error("Can not send to yourself"));
    }
    if (!acc) {
      return Promise.reject(new Error("User not found"));
    }
    setToAccount(acc);
    return Promise.resolve();
  };

  const validateQuantity = async (_: unknown, value: number) => {
    const selectedAsset = transferForm.getFieldValue("asset");
    const isDefaultAsset = selectedAsset === defaultToken;
    const selectedAccountAsset = assets.find(
      (asset) => asset.symbol === selectedAsset
    );
    if (!selectedAccountAsset) {
      return Promise.reject(new Error("Balance is not enough"));
    }

    if (isDefaultAsset) {
      const total = Number(value) + feeAmount;
      if ((selectedAccountAsset.amount as number) < total) {
        return Promise.reject(new Error("Balance is not enough"));
      }
      return Promise.resolve();
    } else {
      const accountDefaultAsset = assets.find(
        (asset) => asset.symbol === defaultToken
      );
      if ((selectedAccountAsset.amount as number) < value) {
        return Promise.reject(new Error("Balance is not enough"));
      }
      if (!accountDefaultAsset) {
        return Promise.reject(
          new Error("Balance is not enough to pay the fee")
        );
      }
      if ((accountDefaultAsset.amount as number) < feeAmount) {
        return Promise.reject(
          new Error("Balance is not enough to pay the fee")
        );
      }
      return Promise.resolve();
    }
  };

  const validateMemo = async (_: unknown, value: string) => {
    const updatedFee = calculteTransferFee(value);
    if (updatedFee) {
      setFeeAmount(updatedFee);
    }
    return Promise.resolve();
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
    asset: [{ required: true, message: "Asset is required" }],
    memo: [{ validator: validateMemo }],
  };

  return {
    status,
    visible,
    feeAmount,
    transferForm,
    formValdation,
    confirm,
    onCancel,
    onFormFinish,
    handleValuesChange,
  };
}
