import { useCallback } from "react";

import { usePeerplaysApi } from "../../../modules/peerplaysApi";
import { Asset, Cache, IAccountData, IFormAssetData, IFullAccount } from "../../types";
import { useAsset } from "../useAsset";
import { useLocalStorage } from "../useLocalStorage";

import { UseAccountResult } from "./useAccount.type";

export function useAccount(): UseAccountResult {
  const { dbApi, historyApi } = usePeerplaysApi();
  const { setPrecision, getAssetById, getAssetBySymbol } = useAsset();
  const [jsonCache, setJsonCache] = useLocalStorage("cache");

  const getFullAccount = useCallback(
    async (name: string, subscription: boolean) => {
      const fullAcc = await dbApi("get_full_accounts", [[name], subscription])
        .then((e: unknown[][]) => (e ? e[0][1] : undefined))
        .catch(() => false);
      return fullAcc;
    },
    []
  );

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

    let createdAssets: never[] = [];
    if (data.assets) {
      createdAssets = await dbApi("get_assets", [data.assets]).then(
        (assetsList: any[]) => {
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
                ]).then((e) =>
                  e[0].is_prediction_market ? "prediction" : "smart"
                );
              }

              return {
                symbol: el.symbol,
                supply: setPrecision(true, el.amount, el.precision),
                assetType: assetType,
                maxSupply,
                actions,
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

  const formAssetData = async (data: IFormAssetData) => {
    const id = data.asset_type || data.asset_id || data.id;
    const symbol = data.symbol;
    const amount = data.balance || data.amount || 0;
    const precision = data.precision;

    if (id && symbol && precision) return { id, amount, precision, symbol };
    if (id) return await getAssetById(id);
    if (symbol) return getAssetBySymbol(symbol);

    return { id, amount, precision, symbol };
  };

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

  return {
    getFullAccount,
    getSidechainAccounts,
    formAccount,
    getUserName,
  };
}
