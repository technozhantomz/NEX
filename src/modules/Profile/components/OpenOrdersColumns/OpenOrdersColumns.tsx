import { TableHeading } from "../../../../common/components";
import { AssetTableRow } from "../../../Wallet/components";

const headings = [
  "key",
  "date",
  "pair",
  "type",
  "side",
  "price",
  "amount",
  "filled",
  "total",
  "status_actions",
];

const keys = [
  "key",
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

const renders = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
const filters = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
const filterModes = [
  "menu",
  "menu",
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
const filterSearch = [
  false,
  false,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

const onFilters = [
  (value: string, record: AssetTableRow): boolean =>
    record.symbol.includes(value),
  (value: string, record: AssetTableRow): boolean =>
    record.name.includes(value),
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
const sorters = [
  undefined,
  undefined,
  (a: { available: number }, b: { available: number }) =>
    a.available - b.available,
  (a: { inOrders: number }, b: { inOrders: number }) => a.inOrders - b.inOrders,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

export type OpenOrdersColumnType = {
  title: () => JSX.Element;
  dataIndex: string;
  key: string;
  render: ((symbol: number) => JSX.Element) | undefined;
  filters:
    | {
        text: string;
        value: string;
      }[]
    | undefined;
  filterMode: string | undefined;
  filterSearch: boolean | undefined;
  onFilter: ((value: string, record: AssetTableRow) => boolean) | undefined;
  sorter:
    | ((
        a: {
          available: number;
        },
        b: {
          available: number;
        }
      ) => number)
    | ((
        a: {
          inOrders: number;
        },
        b: {
          inOrders: number;
        }
      ) => number)
    | undefined;
};

export const createOpenOrdersColumns: OpenOrdersColumnType[] = headings.map(
  (heading, index) => {
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
  }
);
