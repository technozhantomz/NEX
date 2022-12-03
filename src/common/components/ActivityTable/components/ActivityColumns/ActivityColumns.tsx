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
          time: string;
        },
        b: {
          time: string;
        }
      ) => number)
    | undefined;
};

export const ActivityColumns = (
  isNotificationTab: boolean
): ActivityColumnType[] => {
  const headings = isNotificationTab
    ? ["time", "type", "info", "id", "fee", "status"]
    : ["time", "type", "info", "id", "fee"];

  const keys = isNotificationTab
    ? ["time", "type", "info", "id", "fee", "status"]
    : ["time", "type", "info", "id", "fee"];

  const renders = isNotificationTab
    ? [
        undefined,
        (type: string): JSX.Element => <ActivityTag type={type} />,
        (value: string): JSX.Element => (
          <UserLinkExtractor infoString={value} />
        ),
        undefined,
        undefined,
        undefined,
      ]
    : [
        undefined,
        (type: string): JSX.Element => <ActivityTag type={type} />,
        (value: string): JSX.Element => (
          <UserLinkExtractor infoString={value} />
        ),
        undefined,
        undefined,
      ];

  const filters = isNotificationTab
    ? [undefined, undefined, undefined, undefined, undefined, undefined]
    : [undefined, undefined, undefined, undefined, undefined];

  const filterModes = isNotificationTab
    ? [undefined, "menu", undefined, undefined, undefined, undefined]
    : [undefined, "menu", undefined, undefined, undefined];

  const filterSearch = isNotificationTab
    ? [undefined, false, undefined, undefined, undefined, undefined]
    : [undefined, false, undefined, undefined, undefined];

  const onFilters = isNotificationTab
    ? [
        undefined,
        (value: string, record: ActivityRow): boolean =>
          record.type.includes(value),
        undefined,
        undefined,
        undefined,
        undefined,
      ]
    : [
        undefined,
        (value: string, record: ActivityRow): boolean =>
          record.type.includes(value),
        undefined,
        undefined,
        undefined,
      ];

  const sorters = isNotificationTab
    ? [
        (a: { time: string }, b: { time: string }) =>
          new Date(a.time).getTime() - new Date(b.time).getTime(),
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ]
    : [
        (a: { time: string }, b: { time: string }) =>
          new Date(a.time).getTime() - new Date(b.time).getTime(),
        undefined,
        undefined,
        undefined,
        undefined,
      ];

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
