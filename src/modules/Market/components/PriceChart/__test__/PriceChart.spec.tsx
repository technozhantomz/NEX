import { cleanup, render } from "@testing-library/react";
import React from "react";

import { PriceChart } from "../PriceChart";

describe("PriceChart component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render the component correctly", () => {
    const { container } = render(<PriceChart />);
    expect(container.firstChild).toBeDefined();
  });
});
