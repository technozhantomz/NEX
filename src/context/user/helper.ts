import { Asset } from "../../modules/Asset/asset";
import { usePeerplaysApi } from "../../modules/peerplaysApi";

import { IAccountData, IFullAccount } from "./userTypes";

const { dbApi } = usePeerplaysApi();

export const getFullAccount = (
  name: string,
  subscription: boolean
): Promise<IFullAccount | undefined> =>
  dbApi("get_full_accounts", [[name], subscription])
    .then((e: IFullAccount) => (e ? e : undefined))
    .catch(() => false);

export const getSidechainAccounts = (
  accountId: string
): Promise<unknown[] | undefined> =>
  dbApi("get_sidechain_addresses_by_account", [accountId])
    .then((e: string | unknown[]) => (e.length ? e : undefined))
    .catch(() => false);

export const getAccount = async (
  data: IFullAccount
): Promise<IAccountData | undefined> => {
  const { account, balances, limit_orders, call_orders, votes } = data;
  const { id, name, active, owner, options } = account;
  const sidechainAccounts = await getSidechainAccounts(id);
  const assets = await Promise.all(balances.map(formAssetData));
  const history = await getUserHistory(id);
  const keys = {
    active,
    owner,
    memo: { memo_key: options.memo_key },
  };

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
    sidechainAccounts,
  };
};

const formAssetData = async (data: {
  id?: string;
  symbol?: string;
  balance?: number;
  amount?: number;
  precision?: number;
}) => {
  const id = data.id;
  const symbol = data.symbol;
  const amount = data.balance || data.amount || 0;

  if (id && symbol && data.precision) return new Asset(data);
  if (id) return new Asset({ id, amount }).getAssetById();
  if (symbol) return new Asset({ symbol, amount }).getAssetBySymbol();

  return new Asset(data);
};

const getUserHistory = (userID: any): any => {
  return dbApi("get_account_history", [
    userID,
    "1.11.0",
    100,
    "1.11.9999999999",
  ]).then((history: any[]) => history);
};

const formMembershipData = async (fullAcc: {
  account: any;
  lifetime_referrer_name: any;
  referrer_name: any;
  registrar_name: any;
}) => {
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
