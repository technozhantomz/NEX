import { createOrdersColumns, OrderColumnType } from "../OrdersColumns";

describe("OrdersColumns", () => {
  let ordersColumns: OrderColumnType[];
  const handleClick = jest.fn();

  beforeEach(() => {
    ordersColumns = createOrdersColumns(false, handleClick);
  });

  it("should return an array with the correct number of columns", () => {
    expect(ordersColumns).toHaveLength(9);
  });

  it("should return a column with a cancel icon that calls the handleClick function when clicked", () => {
    const orderlColumn = ordersColumns[8];
    const mockEvent = { stopPropagation: jest.fn(), preventDefault: jest.fn() };
    orderlColumn.render("value", { key: "123" }).props.onClick(mockEvent);
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledWith("123");
  });
});
