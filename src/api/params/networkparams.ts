import { config as Config } from "./config";

export const testnetCheck =
  typeof window !== "undefined" && window.location.origin !== Config.dexUrl;

export const defaultToken = Config.defaultToken;
export const defaultNetwork = "Peerplays";
export const defaultQuote = Config.defaultQuote;
export const faucetUrl = Config.faucetUrl;
export const Sidechains = ["Bitcoin"];
export const DEFAULT_PROXY_ID = "1.2.5";
export const defaultChainParams = {
  core_asset: defaultToken,
  address_prefix: defaultToken,
};
