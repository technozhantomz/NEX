import { Asset } from "../../interfaces";

export interface IUser {
  accountData?: IAccountData;
  userSettings: IUserSettings;
  updateUserSettings?: (userSettings: IUserSettings) => void;
}

export interface IUserSettings {
  advancedSettings: boolean;
}

export interface IUserAsset {
  asset: Asset;
}

export interface IUserHistory {
  blockNum: number;
  id: string;
  op: any[];
  opInTrx: number;
  result: any[];
  trxInBlock: number;
  virtualOp: number;
}

export interface IUserKeys {
  active: any;
  memo: any;
  owner: any;
}

export interface IAccountData {
  id?: string;
  name?: string;
  assets?: IUserAsset[];
  history?: IUserHistory[];
  keys?: IUserKeys;
  limit_orders?: any[];
  call_orders?: any[];
  votes?: any[];
  membership?: any;
  sidechainAccounts?: any[];
}

export interface IFullAccount {
  account: any;
  assets: any[];
  balances: any[];
  call_orders: any[];
  lifetime_referrer_name: string;
  limit_orders: any[];
  pending_dividend_payments: any[];
  proposals: any[];
  referrer_name: string;
  registrar_name: string;
  settle_orders: any[];
  statistics: any[];
  vesting_balance: any[];
  votes: any[];
  withdraws: any[];
}
