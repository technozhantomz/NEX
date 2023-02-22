import { renderHook } from "@testing-library/react";

import { useArrayLimiter } from "../useArrayLimiter";

describe("useArrayLimiter", () => {
  it("should return an updateArrayWithLimit function", () => {
    const { result } = renderHook(() => useArrayLimiter());
    expect(result.current.updateArrayWithLimit).toBeDefined();
  });

  it("should limit array length to provided limit", () => {
    const { result } = renderHook(() => useArrayLimiter());
    const arr = ["item1", "item2", "item3"];
    const updatedArr = result.current.updateArrayWithLimit(arr, "new item", 3);
    expect(updatedArr).toHaveLength(3);
  });

  it("should shift first item from array when exceeding limit", () => {
    const { result } = renderHook(() => useArrayLimiter());
    const arr = ["item1", "item2", "item3"];
    const updatedArr = result.current.updateArrayWithLimit(arr, "new item", 3);
    expect(updatedArr[0]).toEqual("item2");
  });

  it("should add new item to end of array when within limit", () => {
    const { result } = renderHook(() => useArrayLimiter());
    const arr = ["item1", "item2"];
    const updatedArr = result.current.updateArrayWithLimit(arr, "new item", 3);
    expect(updatedArr[updatedArr.length - 1]).toEqual("new item");
  });
});
