import { OrderTableRow } from "../../../types";
import { createOrdersColumns, OrderColumnType } from "../OrdersColumns";

describe("OrdersColumns", () => {
  let ordersColumns: OrderColumnType[];
  let historyColumns: OrderColumnType[];
  let ordersRow1: OrderTableRow;
  let ordersRow2: OrderTableRow;
  let historyRow1: OrderTableRow;
  const handleClick = jest.fn();

  beforeEach(() => {
    ordersColumns = createOrdersColumns(false, handleClick);
    historyColumns = createOrdersColumns(true, handleClick);

    ordersRow1 = {
      amount: "1 HIVE",
      date: "29 Aug 2023 13:19:44",
      filled: "0.0%",
      key: "1.7.500",
      pair: "HIVE_TEST",
      price: "1 TEST",
      side: "Buy",
      total: "1 TEST",
      type: "Limit",
    };

    ordersRow2 = {
      amount: "1 PBTC",
      date: "13 Sep 2023 11:24:57",
      filled: "0.0%",
      key: "1.7.640",
      pair: "PBTC_TEST",
      price: "1 TEST",
      side: "Buy",
      total: "1 TEST",
      type: "Limit",
    };

    historyRow1 = {
      amount: "1 BTC",
      date: "03 Dec 2022 17,:20:51",
      filled: "100%",
      key: "1.11.2996347",
      pair: "BTC_TEST",
      price: "86 TEST",
      side: "Sell",
      statusActions: "Complete",
      total: "86 TEST",
      type: "Limit",
    };
  });

  it("should return an array with the correct number of ordersColumns", () => {
    expect(ordersColumns).toHaveLength(9);
  });

  it("should return an array with the correct number of historyColumns", () => {
    expect(historyColumns).toHaveLength(9);
  });

  it("should return a column with a cancel icon that calls the handleClick function when clicked", () => {
    const orderlColumn = ordersColumns[8];
    const mockEvent = { stopPropagation: jest.fn(), preventDefault: jest.fn() };
    orderlColumn.render("value", { key: "123" }).props.onClick(mockEvent);
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledWith("123");
  });

  it("should return the correct onFilter function for the pair column", () => {
    const pairColumn = ordersColumns[1];
    expect(pairColumn).toHaveProperty("onFilter", expect.any(Function));

    const filterFn = pairColumn.onFilter as (
      value: string,
      record: OrderTableRow
    ) => boolean;
    expect(filterFn("HIVE_TEST", ordersRow1)).toBe(true);
  });

  it("should return the correct onFilter function for the type column", () => {
    const typeColumn = ordersColumns[2];
    expect(typeColumn).toHaveProperty("onFilter", expect.any(Function));

    const filterFn = typeColumn.onFilter as (
      value: string,
      record: OrderTableRow
    ) => boolean;
    expect(filterFn("Limit", ordersRow1)).toBe(true);
  });

  it("should return the correct onFilter function for the side column", () => {
    const sideColumn = ordersColumns[3];
    expect(sideColumn).toHaveProperty("onFilter", expect.any(Function));

    const filterFn = sideColumn.onFilter as (
      value: string,
      record: OrderTableRow
    ) => boolean;
    expect(filterFn("Buy", ordersRow1)).toBe(true);
  });

  it("should return the correct sorter function for the price column", () => {
    const priceColumn = ordersColumns[4];
    expect(priceColumn).toHaveProperty("sorter", expect.any(Function));

    const sorterFn = priceColumn.sorter as (
      a: { price: string },
      b: { price: string }
    ) => number;
    expect(sorterFn(ordersRow1, ordersRow2)).toBe(0);
  });

  it("should return the correct sorter function for the amount column", () => {
    const amountColumn = ordersColumns[5];
    expect(amountColumn).toHaveProperty("sorter", expect.any(Function));

    const sorterFn = amountColumn.sorter as (
      a: { price: string },
      b: { price: string }
    ) => number;
    expect(sorterFn(ordersRow1, ordersRow2)).toBe(0);
  });

  it("should return the correct sorter function for the filled column", () => {
    const filledColumn = ordersColumns[6];
    expect(filledColumn).toHaveProperty("sorter", expect.any(Function));

    const sorterFn = filledColumn.sorter as (
      a: { price: string },
      b: { price: string }
    ) => number;
    expect(sorterFn(ordersRow1, ordersRow2)).toBe(0);
  });

  it("should return the correct sorter function for the total column", () => {
    const totalColumn = ordersColumns[7];
    expect(totalColumn).toHaveProperty("sorter", expect.any(Function));

    const sorterFn = totalColumn.sorter as (
      a: { price: string },
      b: { price: string }
    ) => number;
    expect(sorterFn(ordersRow1, ordersRow2)).toBe(0);
  });

  it("should return the correct onFilter function for the statusActions column", () => {
    const statusActionsColumn = historyColumns[8];
    expect(statusActionsColumn).toHaveProperty(
      "onFilter",
      expect.any(Function)
    );

    const filterFn = statusActionsColumn.onFilter as (
      value: string,
      record: OrderTableRow
    ) => boolean;
    expect(filterFn("Complete", historyRow1)).toBe(true);
  });
});
