import { fireEvent, render } from "@testing-library/react";
import counterpart from "counterpart";
import React from "react";

import { UserOrdersTable } from "../../UserOrdersTable";
import { UsersOrdersTabs } from "../index";

jest.mock("counterpart", () => ({
  translate: jest.fn().mockReturnValue("translated string"),
}));

jest.mock("../../UserOrdersTable", () => ({
  UserOrdersTable: jest.fn().mockReturnValue(<div>UserOrdersTable</div>),
}));

describe("UsersOrdersTabs", () => {
  it("should render tabs with translated labels and UserOrdersTable", () => {
    const { getByText } = render(<UsersOrdersTabs />);
    const openOrdersTab = getByText("Open Orders");
    const historyTab = getByText("History");

    expect(openOrdersTab).toBeInTheDocument();
    expect(historyTab).toBeInTheDocument();

    fireEvent.click(historyTab);

    const activeTab = getByText("History", { exact: false });
    expect(activeTab).toHaveAttribute("aria-selected", "true");

    expect(counterpart.translate).toHaveBeenCalledWith(
      `pages.market.my_open_orders`
    );
    expect(getByText("translated string")).toBeInTheDocument();
    expect(UserOrdersTable).toHaveBeenCalledWith({ isOpen: true });

    expect(counterpart.translate).toHaveBeenCalledWith(
      `pages.market.my_order_history`
    );
    expect(getByText("translated string")).toBeInTheDocument();
    expect(UserOrdersTable).toHaveBeenCalledWith({});
  });
});
