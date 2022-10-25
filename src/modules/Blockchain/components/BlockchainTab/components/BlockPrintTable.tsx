import { ColumnsType } from "antd/lib/table";
import React, { RefObject } from "react";

import * as Styled from "../BlockchainTab.styled";
import { DataTableRow, useBlockchainTab } from "../hooks";

import { BlockColumns } from "./BlockColumns";

export const BlockPrintTable = React.forwardRef((_props, ref) => {
  const { loading, blockchainTableRows } = useBlockchainTab();

  return (
    <div ref={ref as RefObject<HTMLDivElement>}>
      <Styled.BlockTable
        dataSource={blockchainTableRows}
        columns={BlockColumns as ColumnsType<DataTableRow>}
        loading={loading}
        pagination={false}
      />
    </div>
  );
});
