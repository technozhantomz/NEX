import { render } from "@testing-library/react";
import React from "react";

import { TableHeading } from "../index";

describe("TableHeading component", () => {
  describe("TableHeading in vote table", () => {
    it("renders correctly for Vote table rank column", () => {
      const dummyComponentProps = {
        heading: "rank",
      };
      const { asFragment } = render(<TableHeading {...dummyComponentProps} />);
      expect(asFragment()).toMatchSnapshot();
    });

    it("renders correctly for Vote table Name column", () => {
      const dummyComponentProps = {
        heading: "name",
      };
      const { asFragment } = render(<TableHeading {...dummyComponentProps} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
