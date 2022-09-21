import React from "react";

import * as Styled from "../BlockchainTab.styled";
import { useBlockchainTab } from "../hooks";

import { BlockColumns } from "./BlockColumns";

export const BlockPrintTable = React.forwardRef((_props, ref) => {
  const { loading, blockchainTableRows } = useBlockchainTab();

  return (
    <div ref={ref}>
      <Styled.BlockTable
        dataSource={blockchainTableRows}
        columns={BlockColumns}
        loading={loading}
        pagination={false}
      />
    </div>
  );
});
