import { render } from "@testing-library/react";
import React from "react";

import { ChoiceModal } from "../ChoiceModal";

describe("ChoiceModal", () => {
  it("should render the correct content", () => {
    const mockCallback = jest.fn();
    const content = <p>dummy content</p>;
    const choices = [
      { translationKey: "dummy choice", callback: mockCallback },
    ];
    const mockHideModal = jest.fn();
    const { getByText } = render(
      <ChoiceModal
        content={content}
        visible={true}
        choices={choices}
        hideModal={mockHideModal}
      />
    );
    expect(getByText("dummy content")).toBeInTheDocument();
  });
});
