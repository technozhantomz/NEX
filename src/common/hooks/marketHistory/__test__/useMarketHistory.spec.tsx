import { act, render } from "@testing-library/react";
import React from "react";

import { usePeerplaysApiContext } from "../../../providers";
import { Asset } from "../../../types";
import { useMarketHistory } from "../useMarketHistory";

jest.mock("../../../providers", () => ({
  usePeerplaysApiContext: jest.fn(),
}));

const historyApiMock = jest.fn();
(usePeerplaysApiContext as jest.Mock).mockReturnValue({
  historyApi: historyApiMock,
});

const base = { id: "1.3.0" };
const quote = { id: "1.3.1" };
const histories = [{ id: "1.7.123" }];
historyApiMock.mockResolvedValue(histories);

describe("useMarketHistory", () => {
  test("getFillOrderHistory returns the expected value", async () => {
    const DummyComponent: React.FC = () => {
      const { getFillOrderHistory } = useMarketHistory();
      const orderHistory = getFillOrderHistory(base as Asset, quote as Asset);
      return <div>{JSON.stringify(orderHistory)}</div>;
    };

    render(<DummyComponent />);

    await act(async () => {
      expect(historyApiMock).toHaveBeenCalledWith("get_fill_order_history", [
        base.id,
        quote.id,
        100,
      ]);
    });
  });
});
