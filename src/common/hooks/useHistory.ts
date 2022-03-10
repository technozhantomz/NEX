import { ChainTypes } from "peerplaysjs-lib";
import { useCallback } from "react";

import { usePeerplaysApiContext } from "../components/PeerplaysApiProvider";

import { UseHistoryResult } from "./useHistory.types";

export function useHistory(): UseHistoryResult {
  const { historyApi, dbApi } = usePeerplaysApiContext();

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

  const getOperationType = useCallback((user, operation) => {
    const operationsNames = Object.keys(ChainTypes.operations);
    const opData = operation.op[1];
    let type = operationsNames[operation.op[0]].toLowerCase();

    if (!formAdditionalInfo[type]) return "";
    if (type === "transfer") type = opData.from === user ? "send" : "receive";
    return type;
  }, []);

  //   const formInfoColumn = useCallback(
  //     async (user: string, operation: { op: any[]; result: any[] }) => {
  //       const {type, data} = await formTrxInfo(user, operation);
  //       const { type } = await formTrxInfo(user, operation);
  //       const basicTag = `tableInfo.${type}`;
  //       return {
  //           type,
  //           info: <Translate content={`${basicTag}.description`} with={data} />
  //       };
  //       return type;
  //     },
  //     []
  //   );

  //   const formTrxInfo = async (
  //     user: string,
  //     operation: { op: any[]; result: any[] },
  //     notification = false
  //   ) => {
  //     const operationsNames = Object.keys(ChainTypes.operations);

  //     let type = operationsNames[operation.op[0]].toLowerCase();

  //     const opData = operation.op[1];
  //     const opResult = operation.result[1];

  //     if (!formAdditionalInfo[type]) return "";

  //     const data = await formAdditionalInfo[type](notification, opData, opResult);

  //     if (type === "transfer") type = opData.from === user ? "send" : "receive";

  //     return { type, data };
  //     return { type };
  //   };

  // "tableInfo": {
  //     "account_create": {
  //         "title": "Account Creation",
  //         "description": "%(registrar)s registered the account %(user)s",
  //     },
  //     "send": {
  //         "title": "Send",
  //         "description": "%(sender)s send %(quantity)s to %(receiver)s",
  //     },
  //     "receive": {
  //         "title": "Receive",
  //         "description": "%(receiver)s received %(quantity)s from %(sender)s",
  //     },
  //     "limit_order_create": {
  //         "title": "Create Order",
  //         "description": "%(creator)s placed order #%(id)s at %(marketLink)s to buy %(buy)s for %(sell)s",
  //     },
  //     "limit_order_cancel": {
  //         "title": "Cancel Order",
  //         "description": "%(user)s cancelled order #%(id)s",
  //     },
  //     "fill_order": {
  //         "title": "Order Filled",
  //         "description": "%(user)s bought %(pays)s for %(receives)s at %(marketLink)s for order #%(id)s",
  //     },
  //     "account_update": {
  //         "title": "Account Updated",
  //         "description": "%(user)s updated account data",
  //     },
  //     "account_upgrade": {
  //         "title": "Account Upgraded",
  //         "description": "%(user)s upgraded account to lifetime member",
  //     },
  //     "worker_create": {
  //         "title": "Worker Created",
  //         "description": "%(user)s created a worker proposal with daily pay of %(dailyPay)s",
  //     },
  //     "proposal_create": {
  //         "title": "Proposal Create",
  //         "description": ""
  //     },
  //     "balance_claim": {
  //         "title": "Balance claim",
  //         "description": ""
  //     },
  //     "transfer": {
  //         "title": "Transfer",
  //         "description": ""
  //     },
  //     "asset_fund_fee_pool": {
  //         "title": "Fund Asset Fee Pool",
  //         "description": "%(from)s funded %(symbol)s fee pool with %(amount)s"
  //     },
  //     "account_whitelist": {
  //         "title": "Account Whitelist",
  //         "description": "%(issuer)s %(status)s the account %(listed)s"
  //     },
  //     "asset_create": {
  //         "title": "Asset Create",
  //         "description": "%(issuer)s created the asset %(assetName)s"
  //     },
  //     "asset_issue": {
  //         "title": "Issue Asset",
  //         "description": "%(issuer)s issued %(assetAmount)s to %(receiver)s"
  //     },
  //     "asset_update": {
  //         "title": "Update Asset",
  //         "description": "%(issuer)s updated asset %(asset)s"
  //     },
  //     "asset_claim_pool": {
  //         "title": "Claim asset fee pool",
  //         "description": "%(issuer)s claimed %(claimed)s from %(asset)s fee pool"
  //     },
  //     "asset_update_issuer": {
  //         "title": "Update asset issuer",
  //         "description": "%(issuer)s transferred rights for %(asset)s to %(newOwner)s"
  //     },
  //     "asset_update_feed_producers": {
  //         "title": "Update asset feed producers",
  //         "description": "%(issuer)s updated the feed producers for the asset %(asset)s"
  //     }
  // },

  const formAdditionalInfo = {
    account_create: async (notification, { registrar, name }) => ({
      //   author: await getAuthor(registrar),
      //   registrar: await formUserLink(registrar, notification),
      //   user: await formUserLink(name, notification),
    }),
    account_upgrade: async (notification, { account_to_upgrade }) => ({
      //   user: await formUserLink(account_to_upgrade, notification),
    }),
    worker_create: async (notification, { owner, daily_pay }) => ({
      //   user: await formUserLink(owner, notification),
      //   dailyPay: getBasicAsset().toString(daily_pay),
    }),
    account_update: async (notification, { account }) => ({
      //   author: await getAuthor(account),
      //   user: await formUserLink(account, notification),
    }),
    transfer: async (notification, { from, to, amount }) => {
      //   const amountAsset = await formAssetData(amount);
      //   return {
      //     author: await getAuthor(from),
      //     sender: await formUserLink(from, notification),
      //     receiver: await formUserLink(to, notification),
      //     quantity: amountAsset.toString(),
      //   };
    },
    limit_order_cancel: async (
      notification,
      { fee_paying_account, order }
    ) => ({
      //   id: order.split(".")[2],
      //   author: await getAuthor(fee_paying_account),
      //   user: await formUserLink(fee_paying_account, notification),
    }),
    limit_order_create: async (
      notification,
      { seller, min_to_receive, amount_to_sell },
      id
    ) => {
      //   const buyAsset = await formAssetData(min_to_receive);
      //   const sellAsset = await formAssetData(amount_to_sell);
      //   return {
      //     id: id.split(".")[2],
      //     author: await getAuthor(seller),
      //     creator: await formUserLink(seller, notification),
      //     buy: buyAsset.toString(),
      //     sell: sellAsset.toString(),
      //     marketLink: formLink(
      //       "exchange",
      //       `market`,
      //       `${buyAsset.symbol}_${sellAsset.symbol}`
      //     ),
      //   };
    },
    fill_order: async (
      notification,
      { receives, pays, order_id, account_id }
    ) => {
      //   const buyAsset = await formAssetData(receives);
      //   const sellAsset = await formAssetData(pays);
      //   return {
      //     author: await getAuthor(account_id),
      //     id: order_id.split(".")[2],
      //     user: await formUserLink(account_id, notification),
      //     pays: buyAsset.toString(),
      //     receives: sellAsset.toString(),
      //     marketLink: notification
      //       ? "market"
      //       : formLink(
      //           "exchange",
      //           `market`,
      //           `${buyAsset.symbol}_${sellAsset.symbol}`
      //         ),
      //   };
    },
    asset_fund_fee_pool: async (
      notification,
      { from_account, asset_id, amount }
    ) => {
      //   const asset = await formAssetData({ asset_id, amount });
      //   return {
      //     from: await formUserLink(from_account, notification),
      //     symbol: asset.symbol,
      //     amount: asset.toString(),
      //   };
    },
    account_whitelist: async (
      notification,
      { account_to_list, authorizing_account, new_listing }
    ) => {
      //   const statuses = {
      //     0: "unlisted",
      //     1: "whitelisted",
      //     2: "blacklisted",
      //   };
      //   return {
      //     issuer: await formUserLink(account_to_list, notification),
      //     listed: await formUserLink(authorizing_account, notification),
      //     status: statuses[new_listing],
      //   };
    },
    asset_create: async (notification, { symbol, issuer }) => ({
      //   issuer: await formUserLink(issuer, notification),
      //   assetName: notification ? symbol : formLink("asset", symbol),
    }),
    asset_issue: async (
      notification,
      { asset_to_issue, issue_to_account, issuer }
    ) => {
      //   const asset = await formAssetData(asset_to_issue);
      //   return {
      //     issuer: await formUserLink(issuer, notification),
      //     receiver: await formUserLink(issue_to_account, notification),
      //     assetAmount: asset.toString(),
      //   };
    },
    asset_update: async (notification, { issuer, asset_to_update }) => ({
      //   issuer: await formUserLink(issuer, notification),
      //   asset: await formAssetLink(asset_to_update, notification),
    }),
    asset_claim_pool: async (
      notification,
      { amount_to_claim, asset_id, issuer }
    ) => {
      //   const claimedAsset = await formAssetData(amount_to_claim);
      //   return {
      //     issuer: await formUserLink(issuer, notification),
      //     asset: await formAssetLink(asset_id, notification),
      //     claimed: claimedAsset.toString(),
      //   };
    },
    asset_update_issuer: async (
      notification,
      { new_issuer, asset_to_update, issuer }
    ) => ({
      //   issuer: await formUserLink(issuer, notification),
      //   asset: await formAssetLink(asset_to_update, notification),
      //   newOwner: await formUserLink(new_issuer, notification),
    }),
    asset_update_feed_producers: async (
      notification,
      { asset_to_update, issuer }
    ) => ({
      //   issuer: await formUserLink(issuer, notification),
      //   asset: await formAssetLink(asset_to_update, notification),
    }),
  };

  // const getAuthor = userID => getUserName(userID);
  // const formLink = (url, text, linkID) => <Link to={`/${url}/${linkID || text}`}>{text}</Link>;
  // const formAssetLink = async (assetID, notification) => {
  //     const asset = await formAssetData({id: assetID});
  //     return notification ? asset.symbol : formLink('asset', asset.symbol);
  // };
  // const formUserLink = async (userID, notification) => {
  //     const userName = await getUserName(userID);
  //     return notification ? userName : formLink('user', userName);
  // };

  return {
    getHistoryById,
    getOperationType,
  };
}
