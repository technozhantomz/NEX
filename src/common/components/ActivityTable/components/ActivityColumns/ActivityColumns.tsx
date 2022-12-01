import { ActivityRow } from "../../../../types";
import { TableHeading } from "../../../TableHeading";
import { UserLinkExtractor } from "../../../UserLinkExtractor";
import { ActivityTag } from "../ActivityTag";

export type ActivityColumnType = {
  title: () => JSX.Element;
  dataIndex: string;
  key: string;
  render: ((symbol: string) => JSX.Element) | undefined;
  filters:
    | {
        text: string;
        value: string;
      }[]
    | undefined;
  filterMode: string | undefined;
  filterSearch: boolean | undefined;
  onFilter: ((value: string, record: ActivityRow) => boolean) | undefined;
  sorter:
    | ((
        a: {
          id: string;
        },
        b: {
          id: string;
        }
      ) => number)
    | ((
        a: {
          maxSupply: number;
        },
        b: {
          maxSupply: number;
        }
      ) => number)
    | ((
        a: {
          precision: number;
        },
        b: {
          precision: number;
        }
      ) => number)
    | undefined;
};

const headings = ["time", "type", "info", "id", "fee"];

const keys = ["time", "type", "info", "id", "fee"];

const renders = [
  undefined,
  (type: string): JSX.Element => <ActivityTag type={type} />,
  (value: string): JSX.Element => <UserLinkExtractor infoString={value} />,
  undefined,
  undefined,
];

const filters = [undefined, undefined, undefined, undefined, undefined];
const filterModes = [undefined, "menu", "menu", undefined, undefined];
const filterSearch = [undefined, false, false, undefined, undefined];

const onFilters = [undefined, undefined, undefined, undefined, undefined];
const sorters = [
  (a: { id: string }, b: { id: string }) =>
    parseInt(a.id.charAt(a.id.length - 1)) -
    parseInt(b.id.charAt(b.id.length - 1)),
  undefined,
  undefined,
  undefined,
  undefined,
];

export const ActivityColumns: ActivityColumnType[] = headings.map(
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
