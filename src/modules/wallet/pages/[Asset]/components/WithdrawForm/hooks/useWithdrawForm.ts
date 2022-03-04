import { Form } from "antd";
import { Aes, TransactionHelper } from "peerplaysjs-lib";
import { FormFinishInfo } from "rc-field-form";
import { useEffect, useState } from "react";

import { usePeerplaysApiContext } from "../../../../../../../common/components/PeerplaysApiProvider";
import { useUserContext } from "../../../../../../../common/components/UserProvider";
import {
  useAccount,
  useFees,
  useTransactionBuilder,
} from "../../../../../../../common/hooks";
import { TransactionFee } from "../../../../../../../common/hooks/useFees.types";
import { SidechainAcccount } from "../../../../../../../common/types";

import { WithdrawForm } from "./useWithdrawForm.types";

export function useWithdrawForm(): WithdrawForm {
  const [status, upStatus] = useState<string>("");
  const [bitcoinAccount, setBitcoinsAccount] = useState<SidechainAcccount>();
  const [visible, setVisible] = useState<boolean>(false);
  const [feeData, setFeeData] = useState<TransactionFee>();
  const { getAccountByName, getPrivateKey, formAccountBalancesByName } =
    useAccount();
  const { trxBuilder } = useTransactionBuilder();
  const { localStorageAccount, assets, sidechainAcccounts } = useUserContext();
  const { getFees } = useFees();
  const [withdrawForm] = Form.useForm();
  const { dbApi } = usePeerplaysApiContext();

  useEffect(() => {
    if (localStorageAccount !== null) {
      getFeeData();
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
  }, [localStorageAccount, assets, sidechainAcccounts]);

  const onCancel = () => {
    setVisible(false);
  };

  const confirm = () => {
    withdrawForm.validateFields().then(() => {
      setVisible(true);
    });
  };

  const onFormFinish = (name: string, info: FormFinishInfo) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        handleWithdraw(values.password);
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

  const handleWithdraw = async (password: string) => {
    const values = withdrawForm.getFieldsValue();
    const from = await getAccountByName(localStorageAccount);
    const to = await getAccountByName("son-account");
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
          asset_id: "1.3.0",
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
      upStatus(`Successfully withdrew ${values.amount}`);
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

  const getSonNetworkStatus = async () => {
    let result = {};
    const status = [];
    let activeSons = 0;
    const emptyResult = { status: [], isSonNetworkOk: false };
    try {
      const gpo = await dbApi("get_global_properties");
      if (!gpo.active_sons || gpo.active_sons.length == 0) {
        return emptyResult;
      }
      const sonIds = gpo.active_sons.map((active_son) => active_son.son_id);
      const sons = await dbApi("get_sons", [sonIds]);
      for (const son of sons) {
        if (son) {
          const sonStatisticsObject = await dbApi("get_objects", [
            [son.statistics],
          ]).then((e) => e[0]);
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
            status.push([son.id, "OK, regular SON heartbeat"]);
            activeSons = activeSons + 1;
          } else {
            if (
              new Date(sonStatisticsObject.last_active_timestamp).getTime() +
                gpo.parameters.extensions.son_down_time * 1000 >
              utcNowMS
            ) {
              status.push([
                son.id,
                "OK, irregular SON heartbeat, but not triggering SON down proposal",
              ]);
            } else {
              status.push([
                son.id,
                "NOT OK, irregular SON heartbeat, triggering SON down proposal",
              ]);
            }
          }
        } else {
          status.push([son.id, "NOT OK, invalid SON id"]);
        }
      }
      result = {
        status: status,
        isSonNetworkOk:
          activeSons / gpo.parameters.extensions.maximum_son_count > 2 / 3
            ? true
            : false,
      };
      return result;
    } catch (e) {
      console.log(e);
      return emptyResult;
    }
  };

  return {
    status,
    visible,
    feeData,
    withdrawForm,
    formValdation,
    confirm,
    onCancel,
    onFormFinish,
  };
}
