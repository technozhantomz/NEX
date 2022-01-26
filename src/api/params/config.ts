const isDev = process.env.NODE_ENV === "development";
const DEFAULT_TOKEN = process.env.NEXT_PUBLIC_DEFAULT_TOKEN;
const DEFAULT_QUOTE = process.env.NEXT_PUBLIC_DEFAULT_QUOTE;
const FAUCET_URL = process.env.NEXT_PUBLIC_FAUCET_URL;
const DEX_URL = process.env.NEXT_PUBLIC_DEX_URL;
const DEFAULT_CHAIN_ID = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID;
const BLOCKCHAIN_ENDPOINTS = process.env.NEXT_PUBLIC_BLOCKCHAIN_ENDPOINTS;

/**
 * @namespace Config
 */
export const config = {
  /**
   * @type {boolean}
   * @memberof Config
   */
  isDev,

  /**
   * If set to true the app will use a set of dummy data. Use this when APIs are not working.
   *
   * @type {boolean}
   */
  useDummy: false,

  /**
   * The default token - PPY/TEST.
   *
   * @type {string}
   * @memberof Config
   */
  defaultToken: DEFAULT_TOKEN,

  /**
   * The default quote token.
   *
   * @type {string}
   * @memberof Config
   */
  defaultQuote: DEFAULT_QUOTE,

  /**
   * The default chain ID.
   *
   * @type {string}
   * @memberof Config
   */
  defaultChainID: DEFAULT_CHAIN_ID,

  /**
   * Endpoints for connecting to blockchain. Used for Peerplays login and transactions.
   *
   * @type {string[]}
   * @memberof Config
   */
  blockchainEndpoints: BLOCKCHAIN_ENDPOINTS?.replace(" ", "").split(",") ?? [],

  /**
   * Represents the faucet url.
   *
   * @type {string}
   * @memberof Config
   */
  faucetUrl: FAUCET_URL,

  /**
   * Represents the dex url.
   *
   * @type {string}
   * @memberof Config
   */
  dexUrl: DEX_URL,
};
