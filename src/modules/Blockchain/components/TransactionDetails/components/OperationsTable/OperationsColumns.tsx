import counterpart from "counterpart";

import { TableHeading } from "../../../../../../common/components";

import * as Styled from "./OperationsTable.styled";

const headings = ["number", "operation_id", "operation_type", "fees", ""];
const keys = ["number", "id", "type", "fees", "details"];
const renders = [
  undefined,
  undefined,
  (type: string): JSX.Element => <Styled.TimeStamp>{type}</Styled.TimeStamp>,
  undefined,
  (_details: unknown): JSX.Element => (
    <a>
      {counterpart.translate(`pages.blocks.transaction_detials.see_details`)}
    </a>
  ),
];
const filters = [undefined, undefined, undefined, undefined, undefined];
const filterModes = [undefined, undefined, undefined, undefined, undefined];
const filterSearch = [undefined, undefined, undefined, undefined, undefined];
const onFilters = [undefined, undefined, undefined, undefined, undefined];
const sorters = [
  (a: { number: number }, b: { number: number }) => a.number - b.number,
  (a: { id: number }, b: { id: number }) => a.id - b.id,
  (a: { type: string }, b: { type: string }) =>
    new Date(a.type).getTime() - new Date(b.type).getTime(),
  (a: { fees: number }, b: { fees: number }) => a.fees - b.fees,
  undefined,
];

export const OperationsColumns = headings.map((heading, index) => {
  return {
    title:
      heading === ""
        ? ""
        : (): JSX.Element => <TableHeading heading={heading} />,
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
