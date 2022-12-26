import {
  BITCOIN_ASSET_SYMBOL,
  BITCOIN_NETWORK,
  DEFAULT_PROXY_ID,
  defaultChainId,
  defaultChainParams,
  defaultNetwork,
  defaultQuote,
  defaultToken,
  ETHEREUM_ASSET_SYMBOL,
  ETHEREUM_NETWORK,
  faucetUrl,
  HBD_ASSET_SYMBOL,
  HIVE_ASSET_SYMBOL,
  HIVE_NETWORK,
  Sidechains,
  SON_ACCOUNT_NAME,
  symbolsToBeExcepted,
} from "..";
import { en } from "../../../translations/en";
import { ru } from "../../../translations/ru";
import { defaultExchanges } from "../defaultExchanges";
import { defaultLocales } from "../defaultLocales";
import { defaultNotifications } from "../defaultNotifications";
import { defaultSettings } from "../defaultSettings";

describe("Default Exchanges values", () => {
  it("should have the correct default values", () => {
    expect(defaultExchanges.active).toMatch(/(BTC_TEST|BTC_PPY)/);
    expect(defaultExchanges.swapPair).toMatch(/(BTC_TEST|BTC_PPY)/);
    expect(defaultExchanges.list[0]).toMatch(/(BTC\/TEST|BTC\/PPY)/);
  });
});

describe("Default locale values", () => {
  it("should have the correct default values", () => {
    expect(defaultLocales).toEqual([
      { title: "English", type: "en", json: en },
      { title: "Russian", type: "ru", json: ru },
    ]);
  });
});

describe("Default notifications values", () => {
  it("should have the correct default values", () => {
    expect(defaultNotifications).toEqual([]);
  });
});

describe("Default settings values", () => {
  it("should have the correct default values", () => {
    expect(defaultSettings.language).toEqual("en");
    expect(defaultSettings.darkTheme).toEqual(false);
    expect(defaultSettings.advancedMode).toEqual(true);
    expect(defaultSettings.nodeAutoselect).toEqual(true);
    expect(defaultSettings.defaultAsset).toEqual("BTC");
    expect(defaultSettings.notifications).toEqual({
      allow: false,
      selectedNotifications: [],
    });
    expect(defaultSettings.walletLock).toEqual(0);
  });
});

describe("Testing network parameters", () => {
  const FAUCET_URL = process.env.NEXT_PUBLIC_FAUCET_URL;
  const DEFAULT_CHAIN_ID = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID;

  it("should have the correct default values", () => {
    expect(defaultToken).toMatch(/(TEST|PPY)/);
    expect(defaultNetwork).toEqual("Peerplays");
    expect(defaultQuote).toEqual("BTC");
    expect(Sidechains).toEqual(["Bitcoin"]);
    expect(DEFAULT_PROXY_ID).toEqual("1.2.5");
    expect(BITCOIN_NETWORK).toEqual("Bitcoin");
    expect(BITCOIN_ASSET_SYMBOL).toEqual("BTC");
    expect(HIVE_NETWORK).toEqual("Hive");
    expect(HIVE_ASSET_SYMBOL).toEqual("HIVE");
    expect(HBD_ASSET_SYMBOL).toEqual("HBD");
    expect(SON_ACCOUNT_NAME).toEqual("son-account");
    expect(ETHEREUM_NETWORK).toEqual("Ethereum");
    expect(ETHEREUM_ASSET_SYMBOL).toEqual("ETH");
    expect(faucetUrl).toEqual(FAUCET_URL);
    expect(defaultChainId).toEqual(DEFAULT_CHAIN_ID);
    expect(defaultChainParams).toEqual({
      core_asset: defaultToken,
      chain_id: DEFAULT_CHAIN_ID,
      address_prefix: defaultToken,
    });
  });
});

describe("symbols To Be Excepted", () => {
  it("should have the correct default values", () => {
    expect(symbolsToBeExcepted).toEqual([
      "AQSQFHZAJVZDTVAC",
      "AXFMUJYATHGJSOIV",
      "BSEBEIBGLWDPKMDB",
      "CFQBVAIKFFJEEOOJ",
      "DOQIBMVBUJYYDXXF",
      "MCLUSD",
      "BTFUN",
      "SEUSD",
      "FKGANJJRLRRSUNTR",
      "HVVTNQNBHEFYPSJP",
      "LTQCNISQAEWLEJVS",
      "NGJZSUSFKIJBXKWJ",
      "OPNQEXZYKBPOZAUP",
      "RCDQHTNAHQNDHJXE",
      "RYVCIRCYJSVAUESQ",
      "TSKXLOICQJTCFPYY",
      "UGQZISWHZJKNGVRC",
      "UUCSGNDAXHJNRJUF",
      "WGKGQTICUIYEYTWV",
      "WNIPJIXZAFZGHGIC",
      "WTFUN",
    ]);
  });
});
