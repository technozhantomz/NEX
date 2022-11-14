import { ColumnsType } from "antd/lib/table";
import React from "react";

import * as Styled from "../BlockchainTab.styled";
import { BlockColumnType, DataTableRow } from "../hooks";

type Props = {
  loading: boolean;
  blockColumns: BlockColumnType[];
  blockchainTableRows: DataTableRow[];
};

export const BlockPrintTable = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <Styled.BlockTable
          dataSource={props.blockchainTableRows}
          columns={props.blockColumns as ColumnsType<DataTableRow>}
          loading={props.loading}
          pagination={false}
        />
      </div>
    );
  }
);
