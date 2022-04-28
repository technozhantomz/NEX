import { useCallback, useEffect, useState } from "react";

import { defaultToken } from "../../../../api/params";
import { Form } from "../../../../ui/src";
import {
  roundNum,
  useAccount,
  useFees,
  useSidechainAccounts,
  useSidechainTransactionBuilder,
  useSonNetwork,
  useTransactionBuilder,
  useTransferTransactionBuilder,
} from "../../../hooks";
import { useUserContext } from "../../../providers";
import { Account } from "../../../types";

import { UseWithdrawFormResult } from "./useWithdrawForm.types";

export function useWithdrawForm(asset: string): UseWithdrawFormResult {
  const [submittingPassword, setSubmittingPassword] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<string>(asset);
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const { getSonNetworkStatus, sonAccount } = useSonNetwork();
  const {
    bitcoinSidechainAccount,
    sidechainAccounts,
    hasBTCDepositAddress,
    loadingSidechainAccounts,
    getSidechainAccounts,
  } = useSidechainAccounts();
  const { getAccountByName, getPrivateKey, formAccountBalancesByName } =
    useAccount();
  const { localStorageAccount, assets, id } = useUserContext();
  const { trxBuilder } = useTransactionBuilder();
  const { calculteTransferFee } = useFees();
  const { buildTransferTransaction } = useTransferTransactionBuilder();
  const {
    buildAddingBitcoinSidechainTransaction,
    buildDeletingBitcoinSidechainTransaction,
  } = useSidechainTransactionBuilder();
  const [withdrawForm] = Form.useForm();

  useEffect(() => {
    const withdrawFee = calculteTransferFee("");
    if (withdrawFee) {
      setFeeAmount(withdrawFee);
    }
  }, [assets, calculteTransferFee]);

  useEffect(() => {
    if (
      selectedAsset === "BTC" &&
      !loadingSidechainAccounts &&
      bitcoinSidechainAccount &&
      hasBTCDepositAddress
    ) {
      withdrawForm.setFieldsValue({
        withdrawAddress: bitcoinSidechainAccount?.withdraw_address,
        withdrawPublicKey: bitcoinSidechainAccount?.withdraw_public_key,
      });
    } else {
      withdrawForm.setFieldsValue({
        withdrawAddress: "",
      });
    }
  }, [
    loadingSidechainAccounts,
    sidechainAccounts,
    bitcoinSidechainAccount,
    selectedAsset,
  ]);

  const handlePasswordModalCancel = () => {
    setIsPasswordModalVisible(false);
  };

  const confirm = () => {
    withdrawForm.validateFields().then(() => {
      setIsPasswordModalVisible(true);
    });
  };

  const onFormFinish = (name: string, info: { values: any; forms: any }) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        handleWithdraw(values.password);
      });
    }
  };

  const handleValuesChange = (changedValues: any) => {
    setStatus("");
    if (changedValues.amount) {
      if (changedValues.amount < 0) {
        withdrawForm.setFieldsValue({ amount: 0 });
      } else {
        const selectedAccountAsset = assets.find(
          (asset) => asset.symbol === selectedAsset
        );

        if (selectedAccountAsset && changedValues.amount > 0) {
          withdrawForm.setFieldsValue({
            amount: roundNum(
              changedValues.amount,
              selectedAccountAsset.precision
            ),
          });
        }
      }
    }
  };

  const handleAssetChange = useCallback(
    (value: unknown) => {
      setSelectedAsset(value as string);
    },
    [setSelectedAsset]
  );

  const handleWithdraw = async (password: string) => {
    setSubmittingPassword(true);
    const values = withdrawForm.getFieldsValue();
    const from = (await getAccountByName(localStorageAccount)) as Account;
    const to = sonAccount
      ? sonAccount
      : ((await getAccountByName("son-account")) as Account);
    const activeKey = getPrivateKey(password, "active");
    let memo = "";
    if (selectedAsset === "BTC") {
      if (
        values.withdrawAddress !== bitcoinSidechainAccount?.withdraw_address ||
        values.withdrawPublicKey !==
          bitcoinSidechainAccount?.withdraw_public_key
      ) {
        const deleteTrx = buildDeletingBitcoinSidechainTransaction(
          id,
          bitcoinSidechainAccount?.id as string,
          id
        );
        try {
          const deleteTrxResult = await trxBuilder([deleteTrx], [activeKey]);
          if (deleteTrxResult) {
            const addTrx = buildAddingBitcoinSidechainTransaction(
              id,
              id,
              bitcoinSidechainAccount?.deposit_public_key as string,
              values.withdrawPublicKey,
              values.withdrawAddress
            );
            try {
              const addTrxResult = await trxBuilder([addTrx], [activeKey]);
              await getSidechainAccounts(id);
              if (!addTrxResult) {
                setIsPasswordModalVisible(false);
                setStatus("Server error, please try again later.");
                setSubmittingPassword(false);
                return;
              }
            } catch (e) {
              await getSidechainAccounts(id);
              setIsPasswordModalVisible(false);
              setStatus("Server error, please try again later.");
              setSubmittingPassword(false);
              console.log(e);
              return;
            }
          } else {
            setIsPasswordModalVisible(false);
            setStatus("Server error, please try again later.");
            setSubmittingPassword(false);
            return;
          }
        } catch (e) {
          console.log(e);
          setIsPasswordModalVisible(false);
          setStatus("Server error, please try again later.");
          setSubmittingPassword(false);
          return;
        }
      }
    } else {
      memo = values.withdrawAddress;
    }
    const asset = assets.filter((asset) => asset.symbol === selectedAsset)[0];
    const trx = buildTransferTransaction(
      from,
      to,
      memo,
      asset,
      password,
      values.amount
    );
    let trxResult;

    try {
      trxResult = await trxBuilder([trx], [activeKey]);
    } catch (e) {
      console.log(e);
      setSubmittingPassword(false);
    }
    if (trxResult) {
      formAccountBalancesByName(localStorageAccount);
      setIsPasswordModalVisible(false);
      setStatus(`Successfully withdrew ${values.amount}`);
      setSubmittingPassword(false);
      withdrawForm.resetFields();
    } else {
      setIsPasswordModalVisible(false);
      setStatus("Server error, please try again later.");
      setSubmittingPassword(false);
    }
  };

  const validateAmount = async (_: unknown, value: number) => {
    const accountAsset = assets.find((asset) => asset.symbol === selectedAsset);
    const accountDefaultAsset = assets.find(
      (asset) => asset.symbol === defaultToken
    );
    if (Number(value) <= 0) {
      return Promise.reject(new Error("Amount should be greater than 0"));
    }
    if (!accountAsset) {
      return Promise.reject(new Error("Balance is not enough"));
    }
    if ((accountAsset.amount as number) < Number(value)) {
      return Promise.reject(new Error("Balance is not enough"));
    }
    if (!accountDefaultAsset) {
      return Promise.reject(new Error("Balance is not enough to pay the fee"));
    }
    if ((accountDefaultAsset.amount as number) < feeAmount) {
      return Promise.reject(new Error("Balance is not enough to pay the fee"));
    }

    return Promise.resolve();
  };

  const validateFrom = async (_: unknown, value: string) => {
    if (value !== localStorageAccount)
      return Promise.reject(new Error("Not your Account"));
    return Promise.resolve();
  };

  // we need bitcoin address validation
  const validateWithdrawAddress = async (_: unknown, value: string) => {
    const sonNetworkStatus = await getSonNetworkStatus();
    if (!sonNetworkStatus.isSonNetworkOk) {
      return Promise.reject(new Error("SONs network is not available now"));
    }
    if (selectedAsset === "BTC") {
      if (!loadingSidechainAccounts) {
        if (!hasBTCDepositAddress) {
          return Promise.reject(
            new Error("Please first generate bitcoin addresses at deposit tab")
          );
        }
        return Promise.resolve();
      }
      return Promise.reject(new Error(""));
    } else {
      const updatedFee = calculteTransferFee(value);
      if (updatedFee) {
        setFeeAmount(updatedFee);
      }
      return Promise.resolve();
    }
  };

  // we need bitcoin pub key validation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const validateWithdrawPublicKey = async (_: unknown, value: string) => {
    const sonNetworkStatus = await getSonNetworkStatus();
    if (!sonNetworkStatus.isSonNetworkOk) {
      return Promise.reject(new Error("SONs network is not available now"));
    }
    if (!loadingSidechainAccounts) {
      if (!hasBTCDepositAddress) {
        return Promise.reject(
          new Error("Please first generate bitcoin addresses at deposit tab")
        );
      }
      return Promise.resolve();
    }
    return Promise.reject(new Error(""));
  };

  const formValdation = {
    from: [
      { required: true, message: "From is required" },
      { validator: validateFrom },
    ],
    amount: [
      { required: true, message: "Amount is required" },
      { validator: validateAmount },
    ],
    withdrawAddress: [
      { required: true, message: "Withdraw address is required" },
      { validator: validateWithdrawAddress },
    ],
    withdrawPublicKey: [
      { required: true, message: "Withdraw public key is required" },
      { validator: validateWithdrawPublicKey },
    ],
  };

  return {
    status,
    isPasswordModalVisible,
    feeAmount,
    withdrawForm,
    formValdation,
    confirm,
    //loggedIn: localStorageAccount !== null && localStorageAccount !== "",
    handlePasswordModalCancel,
    onFormFinish,
    handleValuesChange,
    selectedAsset,
    handleAssetChange,
    submittingPassword,
  };
}
