import { renderHook } from "@testing-library/react";

import { useMarketContext } from "../../../../../common/providers";
import { useDepthChart } from "../hooks/useDepthChart";

jest.mock("../../../../../common/providers", () => ({
  useMarketContext: jest.fn(),
}));

describe("useDepthChart", () => {
  const asks = [
    { quote: "100", base: "10" },
    { quote: "200", base: "20" },
  ];
  const bids = [
    { quote: "50", base: "5" },
    { quote: "25", base: "2.5" },
  ];

  it("should return depth chart data", () => {
    (useMarketContext as jest.Mock).mockReturnValue({ asks, bids });

    const { result } = renderHook(() => useDepthChart());
    // console.log(result.current.depthChartData);
    expect(result.current.depthChartData).toEqual({
      asks: [
        [100, 10],
        [200, 20],
      ],
      bids: [
        [25, 2.5],
        [50, 5],
      ],
    });
  });
});
