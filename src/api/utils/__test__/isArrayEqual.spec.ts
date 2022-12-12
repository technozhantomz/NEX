import { isArrayEqual } from "../isArrayEqual";

describe("Testing isArrayEqual function", () => {
  it("[3,2,1] is equal to [3,2,1]", () => {
    expect(isArrayEqual([3, 2, 1], [3, 2, 1])).toBe(true);
  });
  it("[3,2,1] is  equal to [1,2,3]", () => {
    expect(isArrayEqual([3, 2, 1], [1, 2, 3])).toBe(true);
  });
  it("[3,2,1] is not equal to [5,1,4]", () => {
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
  it("[{network: 'Peerplays'}] is equal to [{network: 'Peerplays'}]", () => {
    expect(
      isArrayEqual([{ network: "Peerplays" }], [{ network: "Peerplays" }])
    ).toBe(true);
  });
});
