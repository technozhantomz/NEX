import { TableHeading } from "../../../../../../common/components";

const headings = ["block_id", "time", "witness", "transaction"];
const keys = ["blockID", "time", "witness", "transaction"];

export const BlockColumns = headings.map((heading, index) => {
  return {
    title: (): JSX.Element => <TableHeading heading={heading} />,
    dataIndex: keys[index],
    key: keys[index],
  };
});
