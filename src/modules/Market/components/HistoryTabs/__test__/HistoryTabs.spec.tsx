import { render } from "@testing-library/react";
import counterpart from "counterpart";
import React from "react";

import { HistoryTabs } from "../HistoryTabs";

jest.mock("counterpart", () => ({
  translate: jest.fn().mockImplementation((value) => {
    if (value === "pages.market.tabs.history.all") {
      return "All History";
    } else if (value === "pages.market.tabs.history.user") {
      return "User History";
    }
  }),
}));

jest.mock("../../HistoryTable", () => ({
  HistoryTable: jest.fn().mockReturnValue(<div>HistoryTable</div>),
}));

describe("HistoryTabs component", () => {
  it("should render tabs with translated labels and HistoryTable", () => {
    const { getByText } = render(<HistoryTabs />);

    const allHistoryTab = getByText("All History");
    expect(allHistoryTab).toBeInTheDocument();

    const userHistoryTab = getByText("User History");
    expect(userHistoryTab).toBeInTheDocument();

    expect(counterpart.translate).toHaveBeenCalledWith(
      `pages.market.tabs.history.all`
    );
    expect(counterpart.translate).toHaveBeenCalledWith(
      `pages.market.tabs.history.user`
    );
  });
});
