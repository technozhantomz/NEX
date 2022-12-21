import { render } from "@testing-library/react";

import { HIVEAndHBDDepositInfo } from "../HIVEAndHBDDepositInfo";

test("component renders correct number of text elements", () => {
  const infoString =
    "[userlink = supertest1], send 1 TEST to , [userlink = newdemo1]";
  const { getAllByRole } = render(
    <HIVEAndHBDDepositInfo infoString={infoString} />
  );
  const textElements = getAllByRole("link");
  expect(textElements).toHaveLength(2);
});
