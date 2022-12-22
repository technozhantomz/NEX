import { render } from "@testing-library/react";
import counterpart from "counterpart";
import React from "react";

import { UserLinkExtractor } from "../UserLinkExtractor";

describe("UserLinkExtractor component", () => {
  describe("UserLinkExtractor component in settings page - membership tab", () => {
    it("renders membership info correctly with correct link", () => {
      const dummyComponentProps = {
        infoString: counterpart.translate(
          `pages.settings.membership.pending_fee_description`,
          {
            name: "[userlink = test-account1]",
            maintenanceInterval: "3600",
            nextMaintenanceTime: "Dec 12 2022 18:30:00",
          }
        ),
      };
      const { asFragment } = render(
        <UserLinkExtractor {...dummyComponentProps} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("UserLinkExtractor component in wallet page - Receive tab", () => {
    it("renders receive instruction correctly with correct link", () => {
      const dummyComponentProps = {
        infoString: counterpart.translate(
          `pages.wallet.receive_selected_asset_instruction`,
          {
            assetSymbol: "TEST",
            account: `[userlink = test-account1]`,
          }
        ),
      };
      const { asFragment } = render(
        <UserLinkExtractor {...dummyComponentProps} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
