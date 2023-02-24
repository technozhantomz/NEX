import { render } from "@testing-library/react";
import counterpart from "counterpart";
import React from "react";

import { UsersOrdersTabs } from "../UserOrdersTabs";

jest.mock("counterpart", () => ({
  translate: jest.fn().mockImplementation((value) => {
    if (value === "pages.market.my_open_orders") {
      return "pages.market.my_open_orders";
    } else if (value === "pages.market.my_order_history") {
      return "pages.market.my_order_history";
    }
  }),
}));

jest.mock("../../UserOrdersTable", () => ({
  UserOrdersTable: jest.fn().mockReturnValue(<div>UserOrdersTable</div>),
}));

describe("UsersOrdersTabs component", () => {
  it("should render tabs with translated labels and UserOrdersTable", () => {
    const { getByText, asFragment } = render(<UsersOrdersTabs />);

    expect(asFragment()).toMatchSnapshot();

    const openOrdersTab = getByText("pages.market.my_open_orders");
    expect(openOrdersTab).toBeInTheDocument();

    const orderHistoryTab = getByText("pages.market.my_order_history");
    expect(orderHistoryTab).toBeInTheDocument();

    expect(counterpart.translate).toHaveBeenCalledWith(
      `pages.market.my_open_orders`
    );
    expect(counterpart.translate).toHaveBeenCalledWith(
      `pages.market.my_order_history`
    );
  });
});
