import { render } from "@testing-library/react";
import React from "react";

import { ActivityAndNotificationTag } from "../ActivityAndNotificationTag";

describe("Activity Tag", () => {
  it("renders correctly for account creation", () => {
    const dummyComponentProps = {
      type: "account_create",
    };
    const { asFragment } = render(
      <ActivityAndNotificationTag {...dummyComponentProps} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly for account update", () => {
    const dummyComponentProps = {
      type: "account_update",
    };
    const { asFragment } = render(
      <ActivityAndNotificationTag {...dummyComponentProps} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
