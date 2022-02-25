import { Login, PrivateKey } from "peerplaysjs-lib";
import { useCallback } from "react";

import { defaultToken, faucetUrl } from "../../../api/params/networkparams";
import { useUser } from "../../../context";
import { usePeerplaysApi } from "../../../modules/peerplaysApi";
import {
  IAccountData,
  IFullAccount,
  ISignupFormData,
  IUserKeys,
} from "../../types";
import { useAsset } from "../useAsset";

import { UseAccountResult } from "./useAccount.type";

export function useAccount(): UseAccountResult {
  const { accountData } = useUser();
  const { dbApi, historyApi } = usePeerplaysApi();
  const { setPrecision, formAssetData } = useAsset();
  const roles = ["active", "owner", "memo"];

  const getFullAccount = useCallback(
    async (name: string, subscription: boolean) => {
      const fullAcc = await dbApi("get_full_accounts", [[name], subscription])
        .then((e: unknown[][]) => {
          return e[0][1] as IFullAccount;
        })
        .catch(() => false);
      return fullAcc;
    },
    []
  );

  const getAccountByName = useCallback(async (name: string) => {
    const account = await dbApi("get_account_by_name", [name])
      .then((e: IAccountData) => e)
      .catch(() => false);
    return account;
  }, []);

  const getSidechainAccounts = useCallback(async (accountId: string) => {
    const sidechainAccts = dbApi("get_sidechain_addresses_by_account", [
      accountId,
    ])
      .then((e: string | unknown[]) => (e.length ? e : undefined))
      .catch(() => false);
    return sidechainAccts;
  }, []);

  const getUserName = useCallback(async (id: string) => {
    let userID = id;

    if (id.includes("1.6."))
      userID = await dbApi("get_witnesses", [[id]]).then(
        (acc: unknown) => acc[0].witness_account
      );

    const userName = await dbApi("get_accounts", [[userID]]).then(
      (acc: unknown) => acc[0].name
    );

    return userName;
  }, []);

  const createAccount = useCallback(async (data: ISignupFormData) => {
    let user = undefined;
    const keys: IUserKeys = formKeys(data.username, data.password);
    const account = {
      name: data.username,
      active_key: keys?.active,
      memo_key: keys.memo,
      owner_key: keys.owner,
      refcode: null,
      referrer: data.referrer || null,
    };

    const newUserData = await fetch(faucetUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ account }),
    }).then((e) => e.json());

    if (newUserData.account) {
      const acc = await getFullAccount(newUserData.account.name, false);
      user = await formAccount(acc);
      return user;
    }
    return newUserData.error;
  }, []);

  const formAccount = useCallback(async (data: IFullAccount) => {
    const { account, balances, limit_orders, call_orders, votes } = data;
    const { id, name, active, owner, options } = account;
    const sidechainAccounts = await getSidechainAccounts(id);
    const assets = await Promise.all(balances.map(formAssetData));
    let contacts: unknown[] = [];
    if (account.blacklisted_accounts.length) {
      const blacklisted_accounts = await contactsInfo(
        account,
        "blacklisted_accounts",
        2
      ).then((e) => e);
      const whitelisted_accounts = await contactsInfo(
        account,
        "whitelisted_accounts",
        1
      ).then((e) => e);
      contacts = contacts.concat(blacklisted_accounts);
      contacts = contacts.concat(whitelisted_accounts);
    }
    const history = await getUserHistory(id);
    const keys = {
      active,
      owner,
      memo: { memo_key: options.memo_key },
    };

    let createdAssets: unknown[] = [];
    if (data.assets) {
      createdAssets = await dbApi("get_assets", [data.assets]).then(
        (assetsList: unknown[]) => {
          return Promise.all(
            assetsList.map(async (el) => {
              const dynamicData = await dbApi("get_objects", [
                [el.dynamic_asset_data_id],
              ]);
              const asset = await formAssetData({
                ...el,
                amount: dynamicData[0].current_supply,
              });
              const maxSupply = setPrecision(
                true,
                el.amount,
                el.options.max_supply
              );
              let assetType = "issued";
              let canBeIssued = true;

              if (el.bitasset_data_id) {
                canBeIssued = false;
                assetType = await dbApi("get_objects", [
                  [el.bitasset_data_id],
                ]).then((e: { is_prediction_market: unknown }[]) =>
                  e[0].is_prediction_market ? "prediction" : "smart"
                );
              }

              return {
                symbol: asset?.symbol,
                supply: setPrecision(true, asset?.amount, asset?.precision),
                assetType: assetType,
                maxSupply,
              };
            })
          );
        }
      );
    }

    const membership = await formMembershipData(data);

    return {
      id,
      name,
      assets,
      history,
      keys,
      limit_orders,
      call_orders,
      votes,
      membership,
      contacts,
      createdAssets,
      sidechainAccounts,
    };
  }, []);

  const formPrivateKey = useCallback(async (password: string, role: string) => {
    let fromWif = "";

    try {
      fromWif = PrivateKey.PrivateKey.fromWif(password);
    } catch (e) {
      console.error(e);
    }

    return fromWif
      ? fromWif
      : Login.generateKeys(accountData?.name, password, [role]).privKeys[role];
  }, []);

  // const validatePassword = async (
  //   _: unknown,
  //   password: string,
  //   username: string
  // ) => {
  //   const accData = await getAccountByName(username);
  //   let checkPassword = false;
  //   let fromWif = "";

  //   try {
  //     fromWif = PrivateKey.fromWif(password);
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   const keys = Login.generateKeys(username, password, roles);

  //   for (const role of roles) {
  //     const privKey = fromWif ? fromWif : keys.privKeys[role];
  //     const pubKey = privKey.toPublicKey().toString(defaultToken);
  //     const key =
  //       role !== "memo"
  //         ? accData[role as keyof IAccountData].key_auths[0][0]
  //         : accData.options.memo_key;

  //     if (key === pubKey) {
  //       checkPassword = true;
  //       break;
  //     }
  //   }
  //   if (!checkPassword) return Promise.reject(new Error("Password incorrect"));
  //   return Promise.resolve();
  // };

  const contactsInfo = async (
    account: IAccountData,
    listed: string,
    type: number
  ) => {
    const contacts: { id: string; type: unknown; name: string }[] = [];
    if (account[listed as keyof IAccountData].length) {
      account[listed as keyof IAccountData].map(async (id: string) => {
        contacts.push({
          id,
          type,
          name: await getUserName(id),
        });
      });
    }

    return contacts;
  };

  const getUserHistory = (userID: string) => {
    return historyApi("get_account_history", [
      userID,
      "1.11.0",
      100,
      "1.11.9999999999",
    ]).then((history: unknown[]) => history);
  };

  const formMembershipData = async (fullAcc: IFullAccount) => {
    const { account, lifetime_referrer_name, referrer_name, registrar_name } =
      fullAcc;

    const isLifetimeMember = lifetime_referrer_name === account.name;

    const networkFee = account.network_fee_percentage / 100;
    const lifetimeFee = account.lifetime_referrer_fee_percentage / 100;
    const referrerFee =
      ((100 - networkFee - lifetimeFee) * account.referrer_rewards_percentage) /
      10000;
    const registrarFee = 100 - referrerFee - networkFee - lifetimeFee;

    let date = account.membership_expiration_date;

    if (date === "1970-01-01T00:00:00") {
      date = "N/A";
    } else if (date === "1969-12-31T23:59:59") {
      date = "Never";
    }

    const allocation = {
      network: {
        percent: networkFee,
      },
      reviewer: {
        user: lifetime_referrer_name,
        percent: lifetimeFee,
      },
      registrar: {
        user: registrar_name,
        percent: registrarFee,
      },
      referrer: {
        user: referrer_name,
        percent: referrerFee,
      },
      expiration: { date },
    };

    return { isLifetimeMember, allocation };
  };

  const formKeys = (name: string, password: string): IUserKeys => {
    const keys: IUserKeys = { active: "", memo: "", owner: "" };
    const generatedKeys = Login.generateKeys(
      name,
      password,
      roles,
      defaultToken
    );

    for (const role of roles) {
      keys[role as keyof IUserKeys] = generatedKeys.pubKeys[role].toString();
    }
    return keys;
  };

  return {
    getFullAccount,
    getAccountByName,
    getSidechainAccounts,
    formAccount,
    formPrivateKey,
    getUserName,
    createAccount,
  };
}
