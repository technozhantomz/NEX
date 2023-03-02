import { renderHook, waitFor } from "@testing-library/react";

// import { useMarketPairStats } from "../../../../../common/hooks";
import { useMarketStats } from "../hooks/useMarketStats";

describe("useMarketStats", () => {
  it("should return default values when selectedPair and ticker are not defined", async () => {
    const { result } = renderHook(() => useMarketStats());

    // Wait for the hook to fetch the market stats data
    await waitFor(() => result.current.marketPairStats);
    expect(result.current.marketPairStats).toEqual({
      latest: "0",
      percentChange: "0",
      volume: "0",
      highestBid: "0",
      lowestAsk: "0",
      dailyHigh: "0",
      dailyLow: "0",
    });
    expect(result.current.lastTradeHistory).toBeUndefined();
    expect(result.current.selectedPair).toBeUndefined();
  });

  it("returns market stats data", async () => {
    const { result } = renderHook(() => useMarketStats());

    // Wait for the hook to fetch the market stats data
    await waitFor(() => result.current.marketPairStats);
    // Assert that the market stats data is present
    expect(result.current.marketPairStats).toBeDefined();
  });

  it("should return market stats data", async () => {
    const mockedData = {
      latest: "100",
      percentChange: "200",
      volume: "1000",
      lowestAsk: "10",
      highestBid: "15",
      dailyHigh: "16",
      dailyLow: "9",
    };
    (useMarketStats as jest.Mock).mockResolvedValueOnce(mockedData);

    const { result } = renderHook(() => useMarketStats());

    await waitFor(() => result.current.marketPairStats);

    // Verify initial state
    expect(result.current.marketPairStats).toEqual(mockedData);
  });
});
