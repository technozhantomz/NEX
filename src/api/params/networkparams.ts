import { config as Config } from "./config";

const MAIN_NET_CHAIN_ID =
  "6b6b5f0ce7a36d323768e534f3edb41c6d6332a541a95725b98e28d140850134";

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
export const BITCOIN_ASSET_SYMBOL = "BTC";
export const ETHEREUM_NETWORK = "Ethereum";
export const ETHEREUM_ASSET_SYMBOL = "ETH";
export const HIVE_NETWORK = "Hive";
export const HIVE_ASSET_SYMBOL = "HIVE";
export const HBD_ASSET_SYMBOL = "HBD";
export const SON_ACCOUNT_NAME = "son-account";
