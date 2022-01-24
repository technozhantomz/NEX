import { config as Config } from "./config";

export const testnetCheck =
  typeof window !== "undefined" && window.location.origin !== Config.dexUrl;

export const defaultToken = Config.defaultToken;
export const defaultNetwork = "Peerplays";
export const defaultQuote = Config.defaultQuote;
export const faucetUrl = Config.faucetUrl;
export const defaultChainId = Config.defaultChainID;
export const Sidechains = ["Bitcoin"];

export const defaultChainParams = {
  core_asset: defaultToken,
  chain_id: defaultChainId,
  address_prefix: defaultToken,
};
