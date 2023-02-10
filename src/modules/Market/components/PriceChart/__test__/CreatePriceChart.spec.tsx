import { cleanup, render } from "@testing-library/react";
import React from "react";

import CreatePriceChart from "../CreatePriceChart";

jest.mock("../hooks/useCreatePriceChart.ts", () => ({
  useCreatePriceChart: jest.fn().mockReturnValue({
    chartContainerRef: React.createRef(),
  }),
}));

describe("CreatePriceChart component", () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it("should render the component correctly", () => {
    const { container, asFragment } = render(<CreatePriceChart />);

    expect(asFragment()).toMatchSnapshot();
    expect(container.firstChild).toBeDefined();
  });
});
