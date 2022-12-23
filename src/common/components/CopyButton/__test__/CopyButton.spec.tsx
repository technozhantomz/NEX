import { render } from "@testing-library/react";
import React from "react";

import { CopyButton } from "../CopyButton";

describe("CopyButton", () => {
  it("should render with button text", () => {
    const { asFragment } = render(
      <CopyButton buttonText="Copy" copyValue="test value" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
