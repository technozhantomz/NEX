import { getPassedTime, utils } from "../../utils";
import { config as Config } from "../config";
import {
  defaultApiLatencies,
  defaultApiSettings,
  defaultLatencyPreferences,
} from "../defaultApiSettings";
import { defaultExchanges } from "../defaultExchanges";
import { defaultLocales } from "../defaultLocales";
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
  faucetUrl,
  HBD_ASSET_SYMBOL,
  HIVE_ASSET_SYMBOL,
  HIVE_NETWORK,
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
    expect(HIVE_NETWORK).toEqual("Hive");
    expect(HIVE_ASSET_SYMBOL).toEqual("HIVE");
    expect(HBD_ASSET_SYMBOL).toEqual("HBD");
    expect(SON_ACCOUNT_NAME).toEqual("son-account");
  });
});

describe("defaultExchanges", () => {
  it("should have the correct default values", () => {
    expect(defaultExchanges).toEqual({
      active: `${defaultQuote}_${defaultToken}`,
      list: [`${defaultQuote}/${defaultToken}`],
      swapPair: `${defaultQuote}_${defaultToken}`,
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

  it("should be defined and be an object", () => {
    expect(defaultApiLatencies).toBeDefined();
    expect(typeof defaultApiLatencies).toBe("object");
  });

  it("should be defined and be an object", () => {
    expect(defaultLatencyPreferences).toBeDefined();
    expect(typeof defaultLatencyPreferences).toBe("object");
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

describe("defaultLocales", () => {
  it("should be defined and be an array", () => {
    expect(defaultLocales).toBeDefined();
    expect(Array.isArray(defaultLocales)).toBe(true);
  });

  it("should have two elements", () => {
    expect(defaultLocales.length).toBe(2);
  });

  it("first element should have correct properties and values", () => {
    const firstLocale = defaultLocales[0];
    expect(firstLocale).toBeDefined();
    expect(firstLocale.title).toBe("English");
    expect(firstLocale.type).toBe("en");
  });

  it("second element should have correct properties and values", () => {
    const secondLocale = defaultLocales[1];
    expect(secondLocale).toBeDefined();
    expect(secondLocale.title).toBe("Russian");
    expect(secondLocale.type).toBe("ru");
  });
});

describe("getPassedTime", () => {
  it("should correctly calculate the passed time", () => {
    const start = new Date();
    const passedTime = getPassedTime(start);
    const expectedPassedTime = new Date().valueOf() - start.valueOf();

    expect(passedTime).toEqual(expectedPassedTime);
  });
});

describe("utils", () => {
  it("should correctly sort object IDs", () => {
    const a = "1.2.3";
    const b = "1.2.4";
    const c = "1.2.5";
    const num = 123.4567;
    const validObjectID = "1.2.3";
    const invalidObjectID1 = "1.2";
    const invalidObjectID2 = "1.2.3.4";
    const invalidObjectID3 = "hello";
    const numString1 = "123";
    const numString2 = "123.456";
    const numString3 = "hello";
    const numString4 = "";

    expect(utils.sortID(a, b)).toEqual(-1);
    expect(utils.sortID(b, a)).toEqual(1);
    expect(utils.sortID(b, c)).toEqual(-1);
    expect(utils.sortID(a, c)).toEqual(-2);

    expect(utils.sortID(a, b, true)).toEqual(1);
    expect(utils.sortID(b, a, true)).toEqual(-1);
    expect(utils.sortID(b, c, true)).toEqual(1);
    expect(utils.sortID(a, c, true)).toEqual(2);

    expect(utils.trimNum(num, 2)).toEqual(123.45);
    expect(utils.trimNum(num, 3)).toEqual(123.456);
    expect(utils.trimNum(num, 4)).toEqual(123.4567);

    expect(utils.trimNum(NaN, 2)).toEqual(0);
    expect(utils.is_object_id(validObjectID)).toBe(true);
    expect(utils.is_object_id(invalidObjectID1)).toBe(false);
    expect(utils.is_object_id(validObjectID)).toBe(true);
    expect(utils.is_object_id(invalidObjectID1)).toBe(false);
    expect(utils.is_object_id(invalidObjectID2)).toBe(false);
    expect(utils.is_object_id(invalidObjectID3)).toBe(false);
    expect(utils.isNumber(numString1)).toBe(true);
    expect(utils.isNumber(numString2)).toBe(false);
    expect(utils.isNumber(numString3)).toBe(false);
    expect(utils.isNumber(numString4)).toBe(true);
  });

  it("should correctly check if a string is a valid object ID", () => {
    const validObjectID = "1.2.3";
    const invalidObjectID1 = "1.2";
    const invalidObjectID2 = "1.2.3.4";
    const invalidObjectID3 = "hello";

    expect(utils.is_object_id(validObjectID)).toBe(true);
    expect(utils.is_object_id(invalidObjectID1)).toBe(false);
    expect(utils.is_object_id(invalidObjectID2)).toBe(false);
    expect(utils.is_object_id(invalidObjectID3)).toBe(false);
  });

  it("should correctly trim a number to the specified number of digits", () => {
    const num = 123.4567;

    expect(utils.trimNum(num, 2)).toEqual(123.45);
    expect(utils.trimNum(num, 3)).toEqual(123.456);
  });
});
