import { useRouter } from "next/router";

import { BlockTableRow } from "../../hooks/useBlockchainTab.types";

import { BlockColumns } from "./BlockColumns";
import * as Styled from "./BlockTable.styled";

type Props = {
  searchValue: string;
  blocks: BlockTableRow[];
  loading: boolean;
};

export const BlockTable = ({
  searchValue = "",
  blocks,
  loading,
}: Props): JSX.Element => {
  const router = useRouter();

  return (
    <Styled.BlockTable
      bordered={false}
      dataSource={
        searchValue === ""
          ? blocks
          : blocks.filter((item) => item.blockID.startsWith(searchValue))
      }
      columns={BlockColumns}
      rowKey={(record) => record.blockID}
      loading={loading}
      pagination={false}
      onRow={(record, _rowIndex) => {
        return {
          onClick: (_event) => {
            console.log(record);
            router.push(`/blockchain/${record.blockID}`);
          },
        };
      }}
    />
  );
};
