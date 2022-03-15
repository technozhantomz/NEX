import { Table } from "antd";

import { BlockTableRow } from "../../hooks/useBlockchainTab.types";

import { BlockColumns } from "./BlockColumns";

type Props = {
  blocks: BlockTableRow[];
  loading: boolean;
};

export const BlockTable = ({ blocks, loading }: Props): JSX.Element => {
  return <Table dataSource={blocks} columns={BlockColumns} loading={loading} />;
};
