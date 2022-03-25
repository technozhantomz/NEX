import { Form } from "antd";
import { Aes, TransactionHelper } from "peerplaysjs-lib";
import { useEffect, useState } from "react";

import {
  useAccount,
  useAsset,
  useFees,
  useTransactionBuilder,
} from "../../../hooks";
import { Account, SidechainAcccount } from "../../../types";
import { usePeerplaysApiContext } from "../../PeerplaysApiProvider";
import { useUserContext } from "../../UserProvider";

import { SonNetworkStatus, UseWithdrawForm } from "./useWithdrawForm.types";

export function useWithdrawForm(): UseWithdrawForm {
  const [status, setStatus] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [bitcoinAccount, setBitcoinsAccount] = useState<SidechainAcccount>();
  const { getAccountByName, getPrivateKey, formAccountBalancesByName } =
    useAccount();
  const { defaultAsset } = useAsset();
  const { localStorageAccount, assets, sidechainAcccounts } = useUserContext();
  const { trxBuilder } = useTransactionBuilder();
  const { calculteTransferFee } = useFees();
  const [withdrawForm] = Form.useForm();
  const { dbApi } = usePeerplaysApiContext();

  useEffect(() => {
    const withdrawFee = calculteTransferFee("");
    if (withdrawFee) {
      setFeeAmount(withdrawFee);
    }
    if (localStorageAccount !== null) {
      withdrawForm.setFieldsValue({ from: localStorageAccount });
      if (sidechainAcccounts && sidechainAcccounts.length > 0) {
        const bitcoinAccount = sidechainAcccounts.find(
          (act) => act.sidechain === "bitcoin"
        );
        setBitcoinsAccount(bitcoinAccount);
        withdrawForm.setFieldsValue({
          withdrawAddress: bitcoinAccount?.withdraw_address,
        });
      }
    }
  }, [localStorageAccount, assets, sidechainAcccounts, calculteTransferFee]);

  const onCancel = () => {
    setVisible(false);
  };

  const confirm = () => {
    withdrawForm.validateFields().then(() => {
      setVisible(true);
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

  const handleWithdraw = async (password: string) => {
    const values = withdrawForm.getFieldsValue();
    const from = (await getAccountByName(localStorageAccount)) as Account;
    const to = (await getAccountByName("son-account")) as Account;
    const gpo = await dbApi("get_global_properties");
    const son_account = gpo.parameters.extensions.son_account;
    if (to.id === son_account) {
      const sonNetworkStatus = await getSonNetworkStatus();
      if (!sonNetworkStatus.isSonNetworkOk) {
        throw new Error("son network not available");
      }
    }
    const asset = assets.filter((asset) => asset.symbol === "BTC")[0];
    const activeKey = getPrivateKey(password, "active");
    let memoFromPublic, memoToPublic;
    if (values.memo) {
      memoFromPublic = from.options.memo_key;
      memoToPublic = to.options.memo_key;
    }
    let memoFromPrivkey;
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
      amount: values.amount * 10 ** Number(asset?.precision),
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
      setStatus(`Successfully withdrew ${values.amount}`);
    } else {
      setVisible(false);
      setStatus("Server error, please try again later.");
    }
  };

  const validateAmount = async (_: unknown, value: number) => {
    const accountAsset = assets.find((asset) => asset.symbol === "BTC");
    if (accountAsset !== undefined && accountAsset.amount > Number(value))
      return Promise.resolve();
    return Promise.reject(
      new Error(`Must be less then ${accountAsset ? accountAsset.amount : ""}`)
    );
  };

  const validateWithdrawAddress = async (_: unknown, value: string) => {
    const withdrawAddress = bitcoinAccount?.withdraw_address;
    if (withdrawAddress === value) return Promise.resolve();
    return Promise.reject(
      new Error(`Current withdraw address is ${withdrawAddress}`)
    );
  };

  const formValdation = {
    amount: [
      { required: true, message: "Quantity is required" },
      { validator: validateAmount },
    ],
    withdrawAddress: [
      { required: true, message: "" },
      { validator: validateWithdrawAddress },
    ],
  };

  const getSonNetworkStatus = async (): Promise<SonNetworkStatus> => {
    const result = { status: [], isSonNetworkOk: false } as SonNetworkStatus;
    let activeSons = 0;
    try {
      const gpo = await dbApi("get_global_properties");
      if (!gpo.active_sons || gpo.active_sons.length == 0) {
        return result;
      }
      const sonIds = gpo.active_sons.map(
        (active_son: { son_id: any }) => active_son.son_id
      );
      const sons = await dbApi("get_sons", [sonIds]);
      for (const son of sons) {
        if (son) {
          const sonStatisticsObject = await dbApi("get_objects", [
            [son.statistics],
          ]).then((e: any[]) => e[0]);
          const now = new Date();
          const utcNowMS = new Date(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            now.getUTCHours(),
            now.getUTCMinutes(),
            now.getUTCSeconds(),
            now.getUTCMilliseconds()
          ).getTime();
          if (
            new Date(sonStatisticsObject.last_active_timestamp).getTime() +
              gpo.parameters.extensions.son_heartbeat_frequency * 1000 >
            utcNowMS
          ) {
            result.status.push([son.id, "OK, regular SON heartbeat"]);
            activeSons = activeSons + 1;
          } else {
            if (
              new Date(sonStatisticsObject.last_active_timestamp).getTime() +
                gpo.parameters.extensions.son_down_time * 1000 >
              utcNowMS
            ) {
              result.status.push([
                son.id,
                "OK, irregular SON heartbeat, but not triggering SON down proposal",
              ]);
            } else {
              result.status.push([
                son.id,
                "NOT OK, irregular SON heartbeat, triggering SON down proposal",
              ]);
            }
          }
        } else {
          result.status.push([son.id, "NOT OK, invalid SON id"]);
        }
      }
      result.isSonNetworkOk =
        activeSons / gpo.parameters.extensions.maximum_son_count > 2 / 3
          ? true
          : false;
      return result;
    } catch (e) {
      console.log(e);
      return result;
    }
  };

  return {
    status,
    visible,
    feeAmount,
    withdrawForm,
    formValdation,
    confirm,
    onCancel,
    onFormFinish,
  };
}
