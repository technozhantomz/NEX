import { utils } from "../";
import { isArrayEqual } from "../isArrayEqual";

//Test: isArrayEqual
describe("isArrayEqual", () => {
  it("[3,2,1] is equal to [5,1] => 3+2+1=6 == 5+1=6", () => {
    expect(isArrayEqual([3, 2, 1], [3, 2, 1])).toBe(true);
  });
  it("[3,2,1] is equal to [1,2,3] => 3 + 2 + 1 = 6 == 1+2+3 = 6", () => {
    expect(isArrayEqual([3, 2, 1], [1, 2, 3])).toBe(true);
  });
  it("[3,2,1] is not equal to [5,1,4] => 3 + 2 + 1 = 6 == 5+1+4 = 10", () => {
    expect(isArrayEqual([3, 2, 1], [5, 1, 4])).toBe(false);
  });

  it("[] is equal to []", () => {
    expect(isArrayEqual([], [])).toBe(true);
  });
  it("null is equal to null", () => {
    expect(isArrayEqual(null, null)).toBe(true);
  });
  it("undefined is equal to undefined", () => {
    expect(isArrayEqual(undefined, undefined)).toBe(true);
  });
});

//Test: utils.isNumber
describe("isNumber", () => {
  it("1 expects true", () => {
    expect(utils.isNumber(1)).toBe(true);
  });
  it('"1" expects true"', () => {
    expect(utils.isNumber("1")).toBe(true);
  });
  it('"one" expects false', () => {
    expect(utils.isNumber("one")).toBe(false);
  });
});

//Test: utils.isUrlsEqual
describe("isUrlsEqual", () => {
  it('"www.google.com" && "www.google.com" are the same', () => {
    expect(utils.isUrlsEqual("www.google.com", "www.google.com")).toBe(true);
  });
  it('"www.google.com" && "www.google.ca" are not the same', () => {
    expect(utils.isUrlsEqual("www.google.com", "www.google.ca")).toBe(false);
  });
  it('"" && "" are the same', () => {
    expect(utils.isUrlsEqual("", "")).toBe(true);
  });
});

//Test: utils.getBlockchainFromSymbol
describe("trimNum", () => {
  it('the blockchain for "HIVE" is Hive', () => {
    expect(utils.getBlockchainFromSymbol("HIVE")).toBe("Hive");
  });
  it('the blockchain for "Hive" is Hive', () => {
    expect(utils.getBlockchainFromSymbol("Hive")).toBe("Hive");
  });
  it('the blockchain for the symbol "ETH" is Ethereum', () => {
    expect(utils.getBlockchainFromSymbol("ETH")).toBe("Ethereum");
  });
  it('the blockchain for the symbol "eth" is Ethereum', () => {
    expect(utils.getBlockchainFromSymbol("eth")).toBe("Ethereum");
  });
  it('the blockchain for the symbol "BTC" is Bitcoin', () => {
    expect(utils.getBlockchainFromSymbol("BTC")).toBe("Bitcoin");
  });
  it('the blockchain for the symbol "btc" is Bitcoin', () => {
    expect(utils.getBlockchainFromSymbol("btc")).toBe("Bitcoin");
  });
});

//Test: utils.trimNum
describe("trimNum", () => {
  it("1 => 1", () => {
    expect(utils.trimNum(1)).toBe(1);
  });
  it("1.0 => 1", () => {
    expect(utils.trimNum(1.0)).toBe(1);
  });
  it("1000.0 expects 1000", () => {
    expect(utils.trimNum(1000.0)).toBe(1000);
  });
});
