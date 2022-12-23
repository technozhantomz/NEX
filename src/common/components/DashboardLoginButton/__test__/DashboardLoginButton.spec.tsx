import { render } from "@testing-library/react";
import counterpart from "counterpart";
import React from "react";

import { DashboardLoginButton } from "../DashboardLoginButton";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Dashboard login button", () => {
  describe("Deposit tab", () => {
    it("renders correctly for not logged in user dashboard deposit tab(BTC)", () => {
      const dummyComponentProps = {
        buttonText: counterpart.translate(
          `buttons.login_and_generate_bitcoin_address`
        ),
      };
      const { asFragment } = render(
        <DashboardLoginButton {...dummyComponentProps} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it("renders correctly for not logged in user dashboard deposit tab(HIVE)", () => {
      const dummyComponentProps = {
        buttonText: counterpart.translate(`buttons.log_in_deposit_hbd_hive`, {
          assetSymbol: "HIVE",
        }),
      };
      const { asFragment } = render(
        <DashboardLoginButton {...dummyComponentProps} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
