import { config as Config } from "./config";

const MAIN_NET_CHAIN_ID =
  "9dd7d963d226b6991b0001688df0716f1c25a9f2ea39d6d71b82d97212c6ab8f";

export const testnetCheck = MAIN_NET_CHAIN_ID !== Config.defaultChainID;

export const defaultToken = Config.defaultToken;
export const defaultNetwork = "Peerplays";
export const defaultQuote = Config.defaultQuote;
export const faucetUrl = Config.faucetUrl;
export const defaultChainId = Config.defaultChainID;
export const Sidechains = ["Bitcoin"];
export const DEFAULT_PROXY_ID = "1.2.5";
export const defaultChainParams = {
  core_asset: defaultToken,
  chain_id: defaultChainId,
  address_prefix: defaultToken,
};

export const BITCOIN_NETWORK = "Bitcoin";
export const BITCOIN_ASSET_SYMBOL = "USD";
export const ETHEREUM_NETWORK = "Ethereum";
export const ETHEREUM_ASSET_SYMBOL = "ETH";
export const HIVE_NETWORK = "Hive";
export const HIVE_ASSET_SYMBOL = "CNY";
export const HBD_ASSET_SYMBOL = "GOLD";
export const SON_ACCOUNT_NAME = "son-account";
