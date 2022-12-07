import counterpart from "counterpart";

import { TableHeading } from "../../../../common/components";
import { DeleteOutlined } from "../../../../ui/src";
import { OrderTableRow } from "../../types";

import * as Styled from "./OrdersColumns.styled";

export type OrderColumnType = {
  title: () => JSX.Element;
  dataIndex: string;
  key: string;
  render: ((_value: string, _record: any) => JSX.Element) | undefined;
  filters:
    | {
        text: string;
        value: string;
      }[]
    | undefined;
  filterMode: string | undefined;
  filterSearch: boolean | undefined;
  onFilter:
    | ((value: boolean, record: OrderTableRow) => boolean)
    | ((value: string, record: OrderTableRow) => boolean)
    | undefined;
  sorter:
    | ((
        a: {
          price: string;
        },
        b: {
          price: string;
        }
      ) => number)
    | ((
        a: {
          amount: string;
        },
        b: {
          amount: string;
        }
      ) => number)
    | ((
        a: {
          filled: string;
        },
        b: {
          filled: string;
        }
      ) => number)
    | ((
        a: {
          total: string;
        },
        b: {
          total: string;
        }
      ) => number)
    | undefined;
};

export const createOrdersColumns = (
  isHistoryTable: boolean,
  handleCancel?: (orderId: string) => void
): OrderColumnType[] => {
  const keys = [
    "date",
    "pair",
    "type",
    "side",
    "price",
    "amount",
    "filled",
    "total",
    "statusActions",
  ];

  const headings = [
    "expiration",
    "pair",
    "type",
    "side",
    "price",
    "amount",
    "filled",
    "total",
    "actions",
  ];

  const renders = [
    //expiration
    undefined,
    //pair
    undefined,
    //type
    undefined,
    //side
    undefined,
    //price
    undefined,
    //amount
    undefined,
    //filled
    undefined,
    //total
    undefined,
    //status
    (_value: string, _record: any): JSX.Element => (
      <Styled.DeleteIconContainer
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          (handleCancel as (orderId: string) => void)(_record.key);
        }}
      >
        <DeleteOutlined />
      </Styled.DeleteIconContainer>
    ),
  ];
  const filters = [
    //expiration
    undefined,
    //pair
    undefined,
    //type
    undefined,
    //side
    [
      {
        text: counterpart.translate("pages.profile.orders_tab.buy"),
        value: counterpart.translate("pages.profile.orders_tab.buy"),
      },
      {
        text: counterpart.translate("pages.profile.orders_tab.sell"),
        value: counterpart.translate("pages.profile.orders_tab.sell"),
      },
    ],
    //price
    undefined,
    //amount
    undefined,
    //filled
    undefined,
    //total
    undefined,
    //status
    undefined,
  ];
  const filterModes = [
    //expiration
    undefined,
    //pair
    "menu",
    //type
    "menu",
    //side
    "menu",
    //price
    undefined,
    //amount
    undefined,
    //filled
    undefined,
    //total
    undefined,
    //status
    undefined,
  ];
  const filterSearch = [
    //expiration
    undefined,
    //pair
    false,
    //type
    false,
    //side
    false,
    //price
    undefined,
    //amount
    undefined,
    //filled
    undefined,
    //total
    undefined,
    //status
    false,
  ];

  const onFilters = [
    //expiration
    undefined,
    //pair
    (value: string, record: OrderTableRow): boolean => record.pair === value,
    //type
    (value: string, record: OrderTableRow): boolean => record.type === value,
    //side
    (value: string, record: OrderTableRow): boolean => record.side === value,
    //price
    undefined,
    //amount
    undefined,
    //filled
    undefined,
    //total
    undefined,
    //status
    undefined,
  ];
  const sorters = [
    //expiration
    undefined,
    //pair
    undefined,
    //type
    undefined,
    //side
    undefined,
    //price
    (a: { price: string }, b: { price: string }) =>
      parseFloat(a.price) - parseFloat(b.price),
    //amount
    (a: { amount: string }, b: { amount: string }) =>
      parseFloat(a.amount) - parseFloat(b.amount),
    //filled
    (a: { filled: string }, b: { filled: string }) =>
      parseFloat(a.filled) - parseFloat(b.filled),
    //total
    (a: { total: string }, b: { total: string }) =>
      parseFloat(a.total) - parseFloat(b.total),
    //status
    undefined,
  ];
  if (isHistoryTable) {
    headings[0] = "date";
    headings[8] = "status";
    renders[8] = undefined;
    filters[8] = [
      {
        text: counterpart.translate("pages.profile.orders_tab.complete"),
        value: counterpart.translate("pages.profile.orders_tab.complete"),
      },
      {
        text: counterpart.translate("pages.profile.orders_tab.partial"),
        value: counterpart.translate("pages.profile.orders_tab.partial"),
      },
    ];
    filterModes[8] = "menu";
    onFilters[8] = (value: string, record: OrderTableRow): boolean =>
      record.statusActions === value;
  }

  return headings.map((heading, index) => {
    return {
      title: (): JSX.Element => <TableHeading heading={heading} />,
      dataIndex: keys[index],
      key: keys[index],
      render: renders[index],
      filters: filters[index],
      filterMode: filterModes[index],
      filterSearch: filterSearch[index],
      onFilter: onFilters[index],
      sorter: sorters[index],
    };
  });
};
