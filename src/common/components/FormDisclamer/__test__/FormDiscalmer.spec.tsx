import { render } from "@testing-library/react";
import counterpart from "counterpart";
import Link from "next/link";
import React from "react";

import { FormDisclamer } from "../FormDisclamer";

describe("FormDisclamer component", () => {
  it("renders FormDiscalmet correctly in login page", () => {
    const dummyComponentProps = {
      children: (
        <>
          <span>{counterpart.translate(`pages.login.dont_have_account`)}</span>
          <Link href="/signup">
            {counterpart.translate(`links.create_account`)}
          </Link>
        </>
      ),
    };
    const { asFragment } = render(<FormDisclamer {...dummyComponentProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders FormDiscalmet correctly in sign up page", () => {
    const dummyComponentProps = {
      children: (
        <>
          <span>
            {counterpart.translate(`pages.signUp.already_have_account`)}
          </span>
          <Link href="/login">{counterpart.translate(`buttons.login`)}</Link>
        </>
      ),
    };
    const { asFragment } = render(<FormDisclamer {...dummyComponentProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
