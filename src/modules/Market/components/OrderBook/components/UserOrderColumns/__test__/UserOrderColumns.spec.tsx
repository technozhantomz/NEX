import { OrderColumn } from "../../../../../../Market/types";
import { showUserOrderColumns } from "../UserOrderColumns";

describe("UserOrderColumns", () => {
  let userOrderColumns: OrderColumn[];
  const handleClick = jest.fn();

  beforeEach(() => {
    userOrderColumns = showUserOrderColumns("TEST", "BTC", handleClick);
  });

  it("should return an array with the correct number of columns", () => {
    expect(userOrderColumns).toHaveLength(5);
  });

  // it("should return a column with a cancel icon that calls the handleClick function when clicked", () => {
  //   const cancelColumn = userOrderColumns[4];
  //   const mockEvent = { stopPropagation: jest.fn(), preventDefault: jest.fn() };
  //   cancelColumn.render("value", { key: "123" }).props.onClick(mockEvent);
  //   expect(mockEvent.stopPropagation).toHaveBeenCalled();
  //   expect(mockEvent.preventDefault).toHaveBeenCalled();
  //   expect(handleClick).toHaveBeenCalledWith("123");
  // });
});
