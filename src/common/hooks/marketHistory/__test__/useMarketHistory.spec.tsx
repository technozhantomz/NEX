import { act, renderHook } from "@testing-library/react";

import { usePeerplaysApiContext } from "../../../providers";
import { Asset } from "../../../types";
import { useMarketHistory } from "../useMarketHistory";

jest.mock("../../../providers", () => ({
  usePeerplaysApiContext: jest.fn(() => ({
    historyApi: jest.fn(),
  })),
}));

describe("useMarketHistory", () => {
  const base = { id: "1.3.0", symbol: "TEST", precision: 5 };
  const quote = { id: "1.3.1", symbol: "BTC", precision: 8 };
  it("should return the expected shape of the result", () => {
    const { result } = renderHook(() => useMarketHistory());
    expect(result.current).toEqual({
      getFillOrderHistory: expect.any(Function),
    });
  });

  it("should call the historyApi with the correct parameters", async () => {
    const mockHistoryApi = jest.fn().mockResolvedValue([]);
    (usePeerplaysApiContext as jest.Mock).mockReturnValue({
      historyApi: mockHistoryApi,
    });

    const { result } = renderHook(() => useMarketHistory());
    await act(async () => {
      await result.current.getFillOrderHistory(base as Asset, quote as Asset);
    });

    expect(mockHistoryApi).toHaveBeenCalledWith("get_fill_order_history", [
      base.id,
      quote.id,
      100,
    ]);
  });

  it("should return the histories from the historyApi call", async () => {
    const mockHistories = [
      { id: "0.0.389", key: { base: "1.3.0", quote: "1.3.1", sequence: -233 } },
      { id: "0.0.388", key: { base: "1.3.0", quote: "1.3.1", sequence: -232 } },
    ];
    (usePeerplaysApiContext as jest.Mock).mockReturnValue({
      historyApi: jest.fn().mockResolvedValue(mockHistories),
    });

    const { result } = renderHook(() => useMarketHistory());
    const histories = await act(async () => {
      return result.current.getFillOrderHistory(base as Asset, quote as Asset);
    });
    expect(histories).toEqual(mockHistories);
  });

  it("should handle the error if any", async () => {
    const expectedError = new Error("something went wrong");
    (usePeerplaysApiContext as jest.Mock).mockReturnValue({
      historyApi: jest.fn().mockRejectedValue(expectedError),
    });

    const { result } = renderHook(() => useMarketHistory());
    let error;
    await act(async () => {
      try {
        await result.current.getFillOrderHistory(base as Asset, quote as Asset);
      } catch (e) {
        error = e;
      }
    });
    expect(error).toBe(expectedError);
  });
});
