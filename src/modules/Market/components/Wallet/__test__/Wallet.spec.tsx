import { cleanup, render } from "@testing-library/react";
import React from "react";

import { Wallet } from "../index";

jest.mock("next/router", () => require("next-router-mock"));

jest.mock("../hooks", () => ({
  useWallet: jest.fn(() => ({
    balances: {
      baseAmount: "10.00",
      quoteAmount: "20.00",
    },
  })),
}));

describe("Wallet component", () => {
  afterEach(cleanup);

  it("renders component correctly with props", () => {
    const { asFragment } = render(<Wallet currentPair="BTC_ACB" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders component with correct balance values", () => {
    const { getByText } = render(<Wallet currentPair="BTC_ACB" />);

    expect(getByText("10.00")).toBeDefined();
    expect(getByText("20.00")).toBeDefined();
  });
});
