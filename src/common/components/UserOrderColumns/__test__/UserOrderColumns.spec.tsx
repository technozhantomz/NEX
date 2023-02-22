import { OrderTableRow } from "../../../types";
import { TableHeading } from "../../TableHeading";
import {
  createUserOrderColumns,
  UserOrderColumnType,
} from "../UserOrderColumns";

describe("OrdersColumns", () => {
  let ordersColumns: UserOrderColumnType[];
  let historyColumns: UserOrderColumnType[];
  let orders: OrderTableRow[];
  let histories: OrderTableRow[];
  const handleClick = jest.fn();

  beforeEach(() => {
    ordersColumns = createUserOrderColumns(false, handleClick);
    historyColumns = createUserOrderColumns(true, handleClick);

    orders = [
      {
        amount: "1 HIVE",
        date: "29 Aug 2023 13:19:44",
        filled: "05.0%",
        key: "1.7.500",
        pair: "HIVE_TEST",
        price: "8 TEST",
        side: "Buy",
        total: "5 TEST",
        type: "Limit",
        numberedAmount: 1,
        numberedPrice: 8,
        numberedTotal: 5,
        isOpenOrderRow: true,
      },
      {
        amount: "1 PBTC",
        date: "13 Sep 2023 11:24:57",
        filled: "10.0%",
        key: "1.7.640",
        pair: "PBTC_TEST",
        price: "5 TEST",
        side: "Sell",
        total: "8 TEST",
        type: "Market",
        numberedAmount: 1,
        numberedPrice: 5,
        numberedTotal: 8,
        isOpenOrderRow: true,
      },
    ];

    histories = [
      {
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
        numberedAmount: 1,
        numberedPrice: 86,
        numberedTotal: 86,
        isOpenOrderRow: false,
      },
      {
        amount: "2 HIVE",
        date: "03 Dec 2022 17,:20:51",
        filled: "90%",
        key: "1.11.2996348",
        pair: "HIVE_TEST",
        price: "80 TEST",
        side: "Buy",
        statusActions: "Partial",
        total: "82 TEST",
        type: "Market",
        numberedAmount: 2,
        numberedPrice: 80,
        numberedTotal: 82,
        isOpenOrderRow: false,
      },
    ];
  });

  describe("OrdersColumns when isHistoryTable is false", () => {
    it("should return an array with the correct number of ordersColumns", () => {
      expect(ordersColumns).toHaveLength(9);
    });

    describe("keys", () => {
      it("should returns the correct column keys", () => {
        expect(ordersColumns.map((c) => c.key)).toEqual([
          "date",
          "pair",
          "type",
          "side",
          "price",
          "amount",
          "filled",
          "total",
          "statusActions",
        ]);
      });
    });

    describe("headings", () => {
      it("should returns the correct column headings", () => {
        expect(ordersColumns.map((c) => c.title())).toEqual([
          <TableHeading heading="expiration" />,
          <TableHeading heading="pair" />,
          <TableHeading heading="type" />,
          <TableHeading heading="side" />,
          <TableHeading heading="price" />,
          <TableHeading heading="amount" />,
          <TableHeading heading="filled" />,
          <TableHeading heading="total" />,
          <TableHeading heading="actions" />,
        ]);
      });
    });

    describe("render", () => {
      it("should return a column with a cancel icon that calls the handleClick function when clicked", () => {
        const orderlColumn = ordersColumns[8];
        const mockEvent = {
          stopPropagation: jest.fn(),
          preventDefault: jest.fn(),
        };
        orderlColumn.render?.("value", orders[0]).props.onClick(mockEvent);
        expect(mockEvent.stopPropagation).toHaveBeenCalled();
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(handleClick).toHaveBeenCalledWith("1.7.500");
      });
    });

    describe("filters", () => {
      it("should returns the correct column filters", () => {
        const typeColumn = ordersColumns[3];
        expect(typeColumn.filters).toEqual([
          {
            text: "Buy",
            value: "Buy",
          },
          {
            text: "Sell",
            value: "Sell",
          },
        ]);
      });
    });

    describe("filterModes", () => {
      it("should returns the correct column filter modes for pair column", () => {
        expect(ordersColumns[1].filterMode).toBe("menu");
      });
      it("should returns the correct column filter modes for type column", () => {
        expect(ordersColumns[2].filterMode).toBe("menu");
      });
      it("should returns the correct column filter modes for side column", () => {
        expect(ordersColumns[3].filterMode).toBe("menu");
      });
    });

    describe("filterSearch", () => {
      it("should returns the correct column filter modes for pair column", () => {
        expect(ordersColumns[1].filterSearch).toBe(false);
      });
      it("should returns the correct column filter modes for type column", () => {
        expect(ordersColumns[2].filterSearch).toBe(false);
      });
      it("should returns the correct column filter modes for side column", () => {
        expect(ordersColumns[3].filterSearch).toBe(false);
      });
    });

    describe("onFilters", () => {
      it("should return the correct onFilter function for the pair column", () => {
        const filteredOrders = orders.filter((order) =>
          ordersColumns[1].onFilter?.("HIVE_TEST", order)
        );
        expect(filteredOrders).toEqual([
          {
            amount: "1 HIVE",
            date: "29 Aug 2023 13:19:44",
            filled: "05.0%",
            key: "1.7.500",
            pair: "HIVE_TEST",
            price: "8 TEST",
            side: "Buy",
            total: "5 TEST",
            type: "Limit",
            numberedAmount: 1,
            numberedPrice: 8,
            numberedTotal: 5,
            isOpenOrderRow: true,
          },
        ]);
      });
      it("should return the correct onFilter function for the type column", () => {
        const filteredOrders = orders.filter((order) =>
          ordersColumns[2].onFilter?.("Limit", order)
        );
        expect(filteredOrders).toEqual([
          {
            amount: "1 HIVE",
            date: "29 Aug 2023 13:19:44",
            filled: "05.0%",
            key: "1.7.500",
            pair: "HIVE_TEST",
            price: "8 TEST",
            side: "Buy",
            total: "5 TEST",
            type: "Limit",
            numberedAmount: 1,
            numberedPrice: 8,
            numberedTotal: 5,
            isOpenOrderRow: true,
          },
        ]);
      });
      it("should return the correct onFilter function for the side column", () => {
        const filteredOrders = orders.filter((order) =>
          ordersColumns[3].onFilter?.("Buy", order)
        );
        expect(filteredOrders).toEqual([
          {
            amount: "1 HIVE",
            date: "29 Aug 2023 13:19:44",
            filled: "05.0%",
            key: "1.7.500",
            pair: "HIVE_TEST",
            price: "8 TEST",
            side: "Buy",
            total: "5 TEST",
            type: "Limit",
            numberedAmount: 1,
            numberedPrice: 8,
            numberedTotal: 5,
            isOpenOrderRow: true,
          },
        ]);
      });
    });

    describe("sorters", () => {
      it("should sort the orders by price in ascending order", () => {
        const sortedOrders = orders.sort(ordersColumns[4].sorter);
        expect(sortedOrders).toEqual([
          {
            amount: "1 PBTC",
            date: "13 Sep 2023 11:24:57",
            filled: "10.0%",
            key: "1.7.640",
            pair: "PBTC_TEST",
            price: "5 TEST",
            side: "Sell",
            total: "8 TEST",
            type: "Market",
            numberedAmount: 1,
            numberedPrice: 5,
            numberedTotal: 8,
            isOpenOrderRow: true,
          },
          {
            amount: "1 HIVE",
            date: "29 Aug 2023 13:19:44",
            filled: "05.0%",
            key: "1.7.500",
            pair: "HIVE_TEST",
            price: "8 TEST",
            side: "Buy",
            total: "5 TEST",
            type: "Limit",
            numberedAmount: 1,
            numberedPrice: 8,
            numberedTotal: 5,
            isOpenOrderRow: true,
          },
        ]);
      });
      it("should sort the orders by amount in ascending order", () => {
        const sortedOrders = orders.sort(ordersColumns[5].sorter);
        expect(sortedOrders).toEqual([
          {
            amount: "1 HIVE",
            date: "29 Aug 2023 13:19:44",
            filled: "05.0%",
            key: "1.7.500",
            pair: "HIVE_TEST",
            price: "8 TEST",
            side: "Buy",
            total: "5 TEST",
            type: "Limit",
            numberedAmount: 1,
            numberedPrice: 8,
            numberedTotal: 5,
            isOpenOrderRow: true,
          },
          {
            amount: "1 PBTC",
            date: "13 Sep 2023 11:24:57",
            filled: "10.0%",
            key: "1.7.640",
            pair: "PBTC_TEST",
            price: "5 TEST",
            side: "Sell",
            total: "8 TEST",
            type: "Market",
            numberedAmount: 1,
            numberedPrice: 5,
            numberedTotal: 8,
            isOpenOrderRow: true,
          },
        ]);
      });
      it("should sort the orders by filled in ascending order", () => {
        const sortedOrders = orders.sort(ordersColumns[6].sorter);
        expect(sortedOrders).toEqual([
          {
            amount: "1 HIVE",
            date: "29 Aug 2023 13:19:44",
            filled: "05.0%",
            key: "1.7.500",
            pair: "HIVE_TEST",
            price: "8 TEST",
            side: "Buy",
            total: "5 TEST",
            type: "Limit",
            numberedAmount: 1,
            numberedPrice: 8,
            numberedTotal: 5,
            isOpenOrderRow: true,
          },
          {
            amount: "1 PBTC",
            date: "13 Sep 2023 11:24:57",
            filled: "10.0%",
            key: "1.7.640",
            pair: "PBTC_TEST",
            price: "5 TEST",
            side: "Sell",
            total: "8 TEST",
            type: "Market",
            numberedAmount: 1,
            numberedPrice: 5,
            numberedTotal: 8,
            isOpenOrderRow: true,
          },
        ]);
      });
      it("should sort the orders by total in ascending order", () => {
        const sortedOrders = orders.sort(ordersColumns[7].sorter);
        expect(sortedOrders).toEqual([
          {
            amount: "1 HIVE",
            date: "29 Aug 2023 13:19:44",
            filled: "05.0%",
            key: "1.7.500",
            pair: "HIVE_TEST",
            price: "8 TEST",
            side: "Buy",
            total: "5 TEST",
            type: "Limit",
            numberedAmount: 1,
            numberedPrice: 8,
            numberedTotal: 5,
            isOpenOrderRow: true,
          },
          {
            amount: "1 PBTC",
            date: "13 Sep 2023 11:24:57",
            filled: "10.0%",
            key: "1.7.640",
            pair: "PBTC_TEST",
            price: "5 TEST",
            side: "Sell",
            total: "8 TEST",
            type: "Market",
            numberedAmount: 1,
            numberedPrice: 5,
            numberedTotal: 8,
            isOpenOrderRow: true,
          },
        ]);
      });
    });
  });

  describe("HistoryColumns when isHistoryTable is true", () => {
    it("should return an array with the correct number of historyColumns", () => {
      expect(historyColumns).toHaveLength(9);
    });

    describe("keys", () => {
      it("should returns the correct column keys", () => {
        expect(historyColumns.map((c) => c.key)).toEqual([
          "date",
          "pair",
          "type",
          "side",
          "price",
          "amount",
          "filled",
          "total",
          "statusActions",
        ]);
      });
    });

    describe("headings", () => {
      it("should returns the correct column headings", () => {
        expect(historyColumns.map((c) => c.title())).toEqual([
          <TableHeading heading="date" />,
          <TableHeading heading="pair" />,
          <TableHeading heading="type" />,
          <TableHeading heading="side" />,
          <TableHeading heading="price" />,
          <TableHeading heading="amount" />,
          <TableHeading heading="filled" />,
          <TableHeading heading="total" />,
          <TableHeading heading="status" />,
        ]);
      });
    });

    describe("filters", () => {
      it("should returns the correct column filters", () => {
        expect(historyColumns[8].filters).toEqual([
          { text: "Complete", value: "Complete" },
          { text: "Partial", value: "Partial" },
        ]);
      });
    });

    describe("filterModes", () => {
      it("should returns the correct column filter modes for pair column", () => {
        expect(historyColumns[1].filterMode).toBe("menu");
      });
      it("should returns the correct column filter modes for type column", () => {
        expect(historyColumns[2].filterMode).toBe("menu");
      });
      it("should returns the correct column filter modes for side column", () => {
        expect(historyColumns[3].filterMode).toBe("menu");
      });
      it("should returns the correct column filter modes for status column", () => {
        expect(historyColumns[8].filterMode).toBe("menu");
      });
    });

    describe("onFilters", () => {
      it("should return the correct onFilter function for the pair column", () => {
        const filteredHistories = histories.filter((history) =>
          historyColumns[1].onFilter?.("BTC_TEST", history)
        );
        expect(filteredHistories).toEqual([
          {
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
            numberedAmount: 1,
            numberedPrice: 86,
            numberedTotal: 86,
            isOpenOrderRow: false,
          },
        ]);
      });
      it("should return the correct onFilter function for the type column", () => {
        const filteredHistories = histories.filter((history) =>
          historyColumns[2].onFilter?.("Limit", history)
        );
        expect(filteredHistories).toEqual([
          {
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
            numberedAmount: 1,
            numberedPrice: 86,
            numberedTotal: 86,
            isOpenOrderRow: false,
          },
        ]);
      });
      it("should return the correct onFilter function for the side column", () => {
        const filteredHistories = histories.filter((history) =>
          historyColumns[3].onFilter?.("Buy", history)
        );
        expect(filteredHistories).toEqual([
          {
            amount: "2 HIVE",
            date: "03 Dec 2022 17,:20:51",
            filled: "90%",
            key: "1.11.2996348",
            pair: "HIVE_TEST",
            price: "80 TEST",
            side: "Buy",
            statusActions: "Partial",
            total: "82 TEST",
            type: "Market",
            numberedAmount: 2,
            numberedPrice: 80,
            numberedTotal: 82,
            isOpenOrderRow: false,
          },
        ]);
      });
      it("should return the correct onFilter function for the statusActions column", () => {
        const filteredHistories = histories.filter((history) =>
          historyColumns[8].onFilter?.("Partial", history)
        );
        expect(filteredHistories).toEqual([
          {
            amount: "2 HIVE",
            date: "03 Dec 2022 17,:20:51",
            filled: "90%",
            key: "1.11.2996348",
            pair: "HIVE_TEST",
            price: "80 TEST",
            side: "Buy",
            statusActions: "Partial",
            total: "82 TEST",
            type: "Market",
            numberedAmount: 2,
            numberedPrice: 80,
            numberedTotal: 82,
            isOpenOrderRow: false,
          },
        ]);
      });
    });

    describe("sorters", () => {
      it("should sort the orders by price in ascending order", () => {
        const sortedHistories = histories.sort(historyColumns[4].sorter);
        expect(sortedHistories).toEqual([
          {
            amount: "2 HIVE",
            date: "03 Dec 2022 17,:20:51",
            filled: "90%",
            key: "1.11.2996348",
            pair: "HIVE_TEST",
            price: "80 TEST",
            side: "Buy",
            statusActions: "Partial",
            total: "82 TEST",
            type: "Market",
            numberedAmount: 2,
            numberedPrice: 80,
            numberedTotal: 82,
            isOpenOrderRow: false,
          },
          {
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
            numberedAmount: 1,
            numberedPrice: 86,
            numberedTotal: 86,
            isOpenOrderRow: false,
          },
        ]);
      });
      it("should sort the orders by amount in ascending order", () => {
        const sortedHistories = histories.sort(historyColumns[5].sorter);
        expect(sortedHistories).toEqual([
          {
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
            numberedAmount: 1,
            numberedPrice: 86,
            numberedTotal: 86,
            isOpenOrderRow: false,
          },
          {
            amount: "2 HIVE",
            date: "03 Dec 2022 17,:20:51",
            filled: "90%",
            key: "1.11.2996348",
            pair: "HIVE_TEST",
            price: "80 TEST",
            side: "Buy",
            statusActions: "Partial",
            total: "82 TEST",
            type: "Market",
            numberedAmount: 2,
            numberedPrice: 80,
            numberedTotal: 82,
            isOpenOrderRow: false,
          },
        ]);
      });
      it("should sort the orders by filled in ascending order", () => {
        const sortedHistories = histories.sort(historyColumns[6].sorter);
        expect(sortedHistories).toEqual([
          {
            amount: "2 HIVE",
            date: "03 Dec 2022 17,:20:51",
            filled: "90%",
            key: "1.11.2996348",
            pair: "HIVE_TEST",
            price: "80 TEST",
            side: "Buy",
            statusActions: "Partial",
            total: "82 TEST",
            type: "Market",
            numberedAmount: 2,
            numberedPrice: 80,
            numberedTotal: 82,
            isOpenOrderRow: false,
          },
          {
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
            numberedAmount: 1,
            numberedPrice: 86,
            numberedTotal: 86,
            isOpenOrderRow: false,
          },
        ]);
      });
      it("should sort the orders by total in ascending order", () => {
        const sortedHistories = histories.sort(historyColumns[7].sorter);
        expect(sortedHistories).toEqual([
          {
            amount: "2 HIVE",
            date: "03 Dec 2022 17,:20:51",
            filled: "90%",
            key: "1.11.2996348",
            pair: "HIVE_TEST",
            price: "80 TEST",
            side: "Buy",
            statusActions: "Partial",
            total: "82 TEST",
            type: "Market",
            numberedAmount: 2,
            numberedPrice: 80,
            numberedTotal: 82,
            isOpenOrderRow: false,
          },
          {
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
            numberedAmount: 1,
            numberedPrice: 86,
            numberedTotal: 86,
            isOpenOrderRow: false,
          },
        ]);
      });
    });
  });
});
