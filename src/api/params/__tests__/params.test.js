import { config as Config } from "../config";
import { defaultApiSettings } from "../defaultApiSettings";
import { defaultExchanges } from "../defaultExchanges";
import { defaultNotifications } from "../defaultNotifications";
import { defaultSettings } from "../defaultSettings";
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
  MAIN_NET_CHAIN_ID,
  Sidechains,
  SON_ACCOUNT_NAME,
  testnetCheck,
} from "../networkparams";
import {
  automaticSelection,
  defaultNodesList,
  nodeRegions,
  prodNodes,
  testnetNodes,
} from "../nodesList";
import { symbolsToBeExcepted } from "../symbolsToBeExcepted";

describe("config", () => {
  it("should have the correct default values", () => {
    expect(defaultToken).toEqual(Config.defaultToken);
    expect(defaultNetwork).toEqual("Peerplays");
    expect(defaultQuote).toEqual(Config.defaultQuote);
    expect(faucetUrl).toEqual(Config.faucetUrl);
    expect(defaultChainId).toEqual(Config.defaultChainID);
    expect(Sidechains).toEqual(["Bitcoin"]);
    expect(DEFAULT_PROXY_ID).toEqual("1.2.5");
    expect(defaultChainParams).toEqual({
      core_asset: defaultToken,
      chain_id: defaultChainId,
      address_prefix: defaultToken,
    });
    expect(BITCOIN_NETWORK).toEqual("Bitcoin");
    expect(BITCOIN_ASSET_SYMBOL).toEqual("BTC");
    expect(ETHEREUM_NETWORK).toEqual("Ethereum");
    expect(ETHEREUM_ASSET_SYMBOL).toEqual("ETH");
    expect(HIVE_NETWORK).toEqual("Hive");
    expect(HIVE_ASSET_SYMBOL).toEqual("HIVE");
    expect(HBD_ASSET_SYMBOL).toEqual("HBD");
    expect(SON_ACCOUNT_NAME).toEqual("son-account");
    expect(testnetCheck).toBe(MAIN_NET_CHAIN_ID !== Config.defaultChainID);
  });
});

describe("defaultExchanges", () => {
  it("should have the correct default values", () => {
    expect(defaultExchanges).toEqual({
      active: `${defaultQuote}_${defaultToken}`,
      list: [`${defaultQuote}/${defaultQuote}`],
      swapPair: `${defaultQuote}_${defaultQuote}`,
    });
  });
});

describe("defaultApiSettings", () => {
  it("should have the correct default values", () => {
    const defaultSettings = defaultApiSettings;

    expect(defaultSettings.selectedNode).toEqual(defaultNodesList[0].url);
    expect(defaultSettings.filteredApiServers).toEqual([]);

    expect(defaultSettings.apiServers).toEqual(
      defaultNodesList.map((node) => {
        return {
          node,
          hidden: false,
        };
      })
    );
  });
});

describe("defaultNotifications", () => {
  it("should be an empty array", () => {
    const notifications = defaultNotifications;
    expect(notifications).toEqual([]);
  });
});

describe("defaultSettings", () => {
  it("should have the correct default values", () => {
    expect(defaultSettings).toEqual({
      language: "en",
      darkTheme: false,
      advancedMode: true,
      nodeAutoselect: true,
      defaultAsset: defaultQuote,
      notifications: {
        allow: false,
        selectedNotifications: [],
      },
      walletLock: 0,
    });
  });
});
describe("symbolsToBeExcepted", () => {
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

//Test 7: Node List
describe("nodeList", () => {
  it("nodeRegions should have the correct default values", () => {
    expect(nodeRegions).toEqual([
      "Northern Europe",
      "Western Europe",
      "Southern Europe",
      "Eastern Europe",
      "Northern Asia",
      "Western Asia",
      "Southern Asia",
      "Eastern Asia",
      "Central Asia",
      "Southeastern Asia",
      "Australia and New Zealand",
      "Melanesia",
      "Polynesia",
      "Micronesia",
      "Northern Africa",
      "Western Africa",
      "Middle Africa",
      "Eastern Africa",
      "Southern Africa",
      "Northern America",
      "Central America",
      "Caribbean",
      "South America",
    ]);
  });

  it("defaultNodesList should have the correct default values", () => {
    expect(automaticSelection).toEqual("wss://fake.automatic-selection.com");
  });

  it("defaultNodesList should have the correct default values", () => {
    expect(defaultNodesList).toBe(testnetCheck ? testnetNodes : prodNodes);
  });
});
