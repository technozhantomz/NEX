import { ColumnsType } from "antd/lib/table";
import React from "react";

import * as Styled from "../AssetsTab.styled";
import { AssetColumnType, AssetTableRow } from "../hooks";

type Props = {
  loading: boolean;
  assetsColumns: AssetColumnType[];
  assetTableRows: AssetTableRow[];
};

export const AssetsPrintTable = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <Styled.AssetsTable
          dataSource={props.assetTableRows}
          columns={props.assetsColumns as ColumnsType<AssetTableRow>}
          loading={props.loading}
          pagination={false}
        />
      </div>
    );
  }
);
