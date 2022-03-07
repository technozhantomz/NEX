import { FormInstance } from "antd/lib/form";
import { Aes, TransactionHelper } from "peerplaysjs-lib";

import { usePeerplaysApiContext } from "../components/PeerplaysApiProvider";
import { useUserContext } from "../components/UserProvider";
import { Account } from "../types";

import { useAccount } from "./account";
import { useTransactionBuilder } from "./useTransactionBuilder";
import { SonNetworkStatus, Transfer } from "./useTransfer.types";

export function useTransfer(): Transfer {
  const { localStorageAccount, assets } = useUserContext();
  const { getAccountByName, getPrivateKey } = useAccount();
  const { dbApi } = usePeerplaysApiContext();
  const { trxBuilder } = useTransactionBuilder();

  const handleTransfer = async (
    form: FormInstance<any>,
    password: string,
    type?: string
  ) => {
    const values = form.getFieldsValue();
    let from, to, asset;
    switch (type) {
      case "btc-withdraw":
        from = await getAccountByName(localStorageAccount);
        to = await getAccountByName("son-account");
        await checkSonAccount(to.id);
        asset = assets.filter((asset) => asset.symbol === "BTC")[0];
        break;
      default:
        from = await getAccountByName(values.from);
        to = await getAccountByName(values.to);
        asset = assets.filter((asset) => asset.symbol === values.coin)[0];
        break;
    }

    const activeKey = getPrivateKey(password, "active");
    const memoObject = getMemoOpject(values.memo, from, to, password);
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
    return trxResult;
  };

  const getMemoOpject = (
    memo: string,
    from: Account,
    to: Account,
    password: string
  ) => {
    let memoObject;
    let memoFromPrivkey;
    let memoFromPublic, memoToPublic;
    if (memo) {
      memoFromPublic = from.options.memo_key;
      memoToPublic = to.options.memo_key;

      if (memoFromPublic === from.active.key_auths[0][0]) {
        memoFromPrivkey = getPrivateKey(password, "active");
      } else {
        memoFromPrivkey = getPrivateKey(password, "memo");
      }
      if (!memoFromPrivkey) {
        throw new Error("Missing private memo key for sender: " + from.name);
      }
      if (memoFromPublic && memoToPublic) {
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
                  Buffer.from(memo.toString("utf-8"), "utf-8"),
                ]),
          };
        }
      }
      return memoObject;
    }
    return undefined;
  };

  const checkSonAccount = async (toID: string) => {
    const gpo = await dbApi("get_global_properties");
    const son_account = gpo.parameters.extensions.son_account;
    if (toID === son_account) {
      const sonNetworkStatus = await getSonNetworkStatus();
      if (!sonNetworkStatus.isSonNetworkOk) {
        throw new Error("son network not available");
      }
    }
  };

  const getSonNetworkStatus = async (): Promise<SonNetworkStatus> => {
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
      return {
        status: status,
        isSonNetworkOk:
          activeSons / gpo.parameters.extensions.maximum_son_count > 2 / 3
            ? true
            : false,
      };
    } catch (e) {
      console.log(e);
      return emptyResult;
    }
  };

  return { handleTransfer };
}
