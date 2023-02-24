import { fireEvent, render } from "@testing-library/react";
import { useRouter } from "next/router";
import React from "react";

import { useUpdateExchanges } from "../../../hooks";
import { TradingPairCard } from "../TradingPairCard";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock("../../../../common/hooks", () => ({
  useUpdateExchanges: jest.fn().mockReturnValue({
    updateExchanges: jest.fn(),
  }),
}));

describe("TradingPairCard", () => {
  const tradingPair = "TEST/BTC";
  const price = "10,000";
  const percentChange = "10";
  const volume = "100,000";

  it("should renders the TradingPairCard component correctly", () => {
    const { getByText, asFragment } = render(
      <TradingPairCard
        tradingPair={tradingPair}
        price={price}
        percentChange={percentChange}
        volume={volume}
      />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(tradingPair)).toBeInTheDocument();
    expect(getByText(price)).toBeInTheDocument();
  });

  it("should trigger the correct actions when clicking on the div element", () => {
    const router = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(router);
    const { getByText } = render(
      <TradingPairCard
        tradingPair={tradingPair}
        price={price}
        percentChange={percentChange}
        volume={volume}
      />
    );

    const divElement = getByText(tradingPair);
    fireEvent.click(divElement);

    expect(useUpdateExchanges().updateExchanges).toHaveBeenCalledWith(
      "TEST_BTC"
    );
    expect(useRouter().push).toHaveBeenCalledWith(`/market/TEST_BTC`);
  });
});
