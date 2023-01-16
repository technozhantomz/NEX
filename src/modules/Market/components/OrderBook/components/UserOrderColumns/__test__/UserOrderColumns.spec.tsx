import { OrderColumn } from "../../../../../../Market/types";
import { showUserOrderColumns } from "../UserOrderColumns";

describe("UserOrderColumns", () => {
  let userOrderColumns: OrderColumn[];
  const handleClick = jest.fn();

  beforeEach(() => {
    userOrderColumns = showUserOrderColumns("TEST", "BTC", handleClick);
  });

  it("should return an array with the correct number of columns", () => {
    expect(userOrderColumns).toHaveLength(6);
  });
});
