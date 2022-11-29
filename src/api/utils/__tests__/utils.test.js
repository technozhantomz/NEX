import { utils } from "../";
import { isArrayEqual } from "../isArrayEqual";

//Test: isArrayEqual
//test1
//input: two equal arrays
//output (expected): true
test("[3,2,1] is equal to [5,1] => 3+2+1=6 == 5+1=6", () => {
  expect(isArrayEqual([3, 2, 1], [3, 2, 1])).toBe(true);
});
//test2
//input: two equal arrays (different order)
//output (expected): true
test("[3,2,1] is equal to [1,2,3] => 3 + 2 + 1 = 6 == 1+2+3 = 6", () => {
  expect(isArrayEqual([3, 2, 1], [1, 2, 3])).toBe(true);
});
//test3
//input: two unequal arrays
//output (expected): true
test("[3,2,1] is not equal to [5,1,4] => 3 + 2 + 1 = 6 == 5+1+4 = 10", () => {
  expect(isArrayEqual([3, 2, 1], [5, 1, 4])).toBe(false);
});
//test4
//input: two empty arrays
//output (expected): true
test("[] is equal to []", () => {
  expect(isArrayEqual([], [])).toBe(true);
});
//test5
//input: two null arrays
//output (expected): true
test("null is equal to null", () => {
  expect(isArrayEqual(null, null)).toBe(true);
});
//test6
//input: two undefined arrays
//output (expected): true
test("null is equal to null", () => {
  expect(isArrayEqual(null, null)).toBe(true);
});

//Test: utils.isNumber
//test1
test('"block" writes to => "block"', () => {
  expect(utils.isNumber("1")).toBe(true);
});
//test1
test('"one" => false', () => {
  expect(utils.isNumber("one")).toBe(false);
});
//test1
test("1 => true", () => {
  expect(utils.isNumber(1)).toBe(true);
});

//Test: utils.isUrlsEqual
//test1
test('"www.google.com" && "www.google.com" are the same', () => {
  expect(utils.isUrlsEqual("www.google.com", "www.google.com")).toBe(true);
});
//test2
test('"www.google.com" && "www.google.ca" are not the same', () => {
  expect(utils.isUrlsEqual("www.google.com", "www.google.ca")).toBe(false);
});
//test3
test('"" && "" are the same', () => {
  expect(utils.isUrlsEqual("", "")).toBe(true);
});

//Test: utils.getBlockchainFromSymbol
//test1
test('"www.google.com" && "www.google.com" are the same', () => {
  expect(utils.getBlockchainFromSymbol("HIVE")).toBe("Hive");
});

//test2
test('the blockchain for the symbol "ETH" is Ethereum', () => {
  expect(utils.getBlockchainFromSymbol("ETH")).toBe("Ethereum");
});

//test3
test('the blockchain for the symbol "eth" is Ethereum', () => {
  expect(utils.getBlockchainFromSymbol("eth")).toBe("Ethereum");
});

//test4
test('the blockchain for the symbol "BTC" is Bitcoin', () => {
  expect(utils.getBlockchainFromSymbol("BTC")).toBe("Bitcoin");
});

//test5
test('the blockchain for the symbol "btc" is Bitcoin', () => {
  expect(utils.getBlockchainFromSymbol("btc")).toBe("Bitcoin");
});

//Test: utils.ensureInputNumberValidity
//test1: how to provide event
// test('1 is not a valid number', () => {
//     expect(utils.ensureInputNumberValidity(1)).toBe(false);
// });

//Test: utils.trimNum
//test1
test("1 => 1", () => {
  expect(utils.trimNum(1)).toBe(1);
});
//test1
test("1.0 => 1", () => {
  expect(utils.trimNum(1.0)).toBe(1);
});
//test1
test("1000.000 => 1000", () => {
  expect(utils.trimNum(1000.0)).toBe(1000);
});
