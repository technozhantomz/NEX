import { ChainTypes } from "peerplaysjs-lib";
import { useCallback } from "react";

import { usePeerplaysApiContext } from "../components/PeerplaysApiProvider";
import { useUserContext } from "../components/UserProvider";

import { useAccount } from "./account";
import { useAsset } from "./useAsset";
import { UseHistoryResult } from "./useHistory.types";

export function useHistory(): UseHistoryResult {
  const { historyApi, dbApi } = usePeerplaysApiContext();
  const { getAccountByName } = useAccount();
  const { formAssetBalanceById, getDefaultAsset, getAssetById } = useAsset();
  const { localStorageAccount } = useUserContext();

  const getHistoryById = useCallback(
    async (id: string) => {
      return await historyApi("get_account_history", [
        id,
        "1.11.0",
        100,
        "1.11.9999999999",
      ]).then((data: any) => data);
    },
    [historyApi]
  );

  const getOperationInfo = useCallback(async (user, operation) => {
    const operationsNames = Object.keys(ChainTypes.operations);
    const type = operationsNames[operation.op[0]].toLowerCase();
    const opData = operation.op[1];
    const opResult = operation.result[1];
    const infoString = await formAdditionalInfo[type](opData, opResult);
    return { type, infoString };
  }, []);

  const formAdditionalInfo = {
    account_create: async ({ registrar, name }) => {
      //const constauthor = await getUserName(registrar);
      const registrarName = await getUserName(registrar);
      const userName = await getUserName(name);
      return `${registrarName} registered the account ${userName}`;
    },
    account_upgrade: async ({ account_to_upgrade }) => {
      const user = await getUserName(account_to_upgrade);
      return `${user} upgraded account to lifetime member`;
    },
    worker_create: async ({ owner }) => {
      const user = await getUserName(owner);
      return `${user} created a worker proposal with daily pay of ${getDefaultAsset()}`;
    },
    account_update: async ({ account }) => {
      const user = await getUserName(account);
      return `${user} updated account data`;
    },
    transfer: async ({ from, to, amount }) => {
      const asset = await formAssetBalanceById(amount.asset_id, amount.amount);
      const sender =  await getUserName(from);
      const receiver = await getUserName(to);
      return `${sender} send ${asset.amount} ${asset.symbol} to ${receiver}`;
    },
    limit_order_cancel: async ({ fee_paying_account, order }) => {
      const id = order.split(".")[2];
      const user = await getUserName(fee_paying_account);
      return `${user} cancelled order #${id}`;
    },
    limit_order_create: async (
      { seller, min_to_receive, amount_to_sell },
      id
    ) => {
      const buyAsset = await formAssetBalanceById(
        min_to_receive.asset_id,
        min_to_receive.amount
      );
      const sellAsset = await formAssetBalanceById(
        amount_to_sell.asset_id,
        amount_to_sell.amount
      );
      const creator = await getUserName(seller);
      const orderId = id.split(".")[2];
      const buyAmount = `${buyAsset.amount} ${buyAsset.symbol}`;
      const sellAmount = `${sellAsset.amount} ${sellAsset.symbol}`;
      return `${creator} placed order #${orderId} to buy ${buyAmount} for ${sellAmount}`;
    },
    fill_order: async ({ receives, pays, order_id, account_id }) => {
      const buyAsset = await formAssetBalanceById(
        receives.asset_id,
        receives.amount
      );
      const sellAsset = await formAssetBalanceById(pays.asset_id, pays.amount);
      const id = order_id.split(".")[2];
      const user = await getUserName(account_id);
      const paysAmount = `${buyAsset.amount} ${buyAsset.symbol}`;
      const receivesAmmount = `${sellAsset.amount} ${sellAsset.symbol}`;
      return `%${user} bought ${paysAmount} for ${receivesAmmount} for order #${id}`;
    },
    asset_fund_fee_pool: async ({ from_account, asset_id, amount }) => {
      const asset = await formAssetBalanceById(asset_id, amount);
      const from = await getUserName(from_account);
      return `${from} funded ${asset.symbol} fee pool with ${asset.amount}`;
    },
    account_whitelist: async ({
      account_to_list,
      authorizing_account,
      new_listing,
    }) => {
      const statuses = {
        0: "unlisted",
        1: "whitelisted",
        2: "blacklisted",
      };
      const issuerName = await getUserName(account_to_list);
      const listed = await getUserName(authorizing_account);
      return `${issuerName} ${statuses[new_listing]} the account ${listed}`;
    },
    asset_create: async ({ symbol, issuer }) => {
      const issuerName = await getUserName(issuer);
      return `${issuerName} created the asset ${symbol}`;
    },
    asset_issue: async ({ asset_to_issue, issue_to_account, issuer }) => {
      const asset = await formAssetBalanceById(
        asset_to_issue.asset_id,
        asset_to_issue.amount
      );
      const issuerName = await getUserName(issuer);
      const receiver = await getUserName(issue_to_account);
      return `${issuerName} issued ${asset.amount} ${asset.symbol} to ${receiver}`;
    },
    asset_update: async ({ issuer, asset_to_update }) => {
      const issuerName = await getUserName(issuer);
      const asset = await getAssetById(asset_to_update);
      return `${issuerName} updated asset ${asset.symbol}`;
    },
    asset_claim_pool: async ({ amount_to_claim, asset_id, issuer }) => {
      const claimedAsset = await formAssetBalanceById(
        amount_to_claim.asset_id,
        amount_to_claim.amount
      );
      const issuerName = await getUserName(issuer);
      const asset = await getAssetById(asset_id);
      return `${issuerName} claimed ${claimedAsset.amount} ${claimedAsset.symbol} from ${asset.symbol} fee pool`;
    },
    asset_update_issuer: async ({ new_issuer, asset_to_update, issuer }) => {
      const issuerName = await getUserName(issuer);
      const asset = await getAssetById(asset_to_update);
      const newOwner = await getUserName(new_issuer);
      return `${issuerName} transferred rights for ${asset.symbol} to ${newOwner}`;
    },
    asset_update_feed_producers: async ({ asset_to_update, issuer }) => {
      const issuerName = await getUserName(issuer);
      const asset = await getAssetById(asset_to_update);
      return `${issuerName} updated the feed producers for the asset ${asset.symbol}`;
    },
  };

  const getUserName = async (id: string) => {
    const activeUser = await getAccountByName(localStorageAccount);
    if (activeUser?.id === id) return activeUser?.name;

    let userID = id;

    if (id.includes("1.6."))
      userID = await dbApi("get_witnesses", [[id]]).then(
        (acc: { witness_account: any }[]) => acc[0].witness_account
      );

    const userName = await dbApi("get_accounts", [[userID]]).then(
      (acc: { name: any }[]) => acc[0].name
    );
    return userName;
  };

  return {
    getHistoryById,
    getOperationInfo,
  };
}
