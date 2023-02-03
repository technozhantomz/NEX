import { act, renderHook } from "@testing-library/react";

import { useUserContext } from "../../../../../common/providers";
import { useWallet } from "../hooks";

jest.mock("../../../../../common/providers", () => ({
  useUserContext: jest.fn(),
}));

describe("useWallet hook", () => {
  const mockAssets = [
    { symbol: "BTC", amount: 0.5 },
    { symbol: "PPY", amount: 100 },
  ];
  const currentPair = "BTC_PPY";

  beforeEach(() => {
    (useUserContext as jest.Mock).mockReturnValue({
      assets: mockAssets,
    });
  });

  it("should return balances of the specified currentPair", () => {
    const { result } = renderHook(() => useWallet({ currentPair }));
    expect(result.current.balances).toEqual({
      baseAmount: 0.5,
      quoteAmount: 100,
    });
  });

  it("should return zero for balances if assets are not found", () => {
    (useUserContext as jest.Mock).mockReturnValue({ assets: [] });
    const { result } = renderHook(() => useWallet({ currentPair }));
    expect(result.current.balances).toEqual({
      baseAmount: 0,
      quoteAmount: 0,
    });
  });

  it("should re-calculate balances when assets or currentPair changes", () => {
    const { result, rerender } = renderHook(
      ({ currentPair }) => useWallet({ currentPair }),
      {
        initialProps: { currentPair },
      }
    );
    expect(result.current.balances).toEqual({
      baseAmount: 0.5,
      quoteAmount: 100,
    });
    act(() => {
      rerender({ currentPair: "PPY_BTC" });
    });
    expect(result.current.balances).toEqual({
      baseAmount: 100,
      quoteAmount: 0.5,
    });
  });
});
