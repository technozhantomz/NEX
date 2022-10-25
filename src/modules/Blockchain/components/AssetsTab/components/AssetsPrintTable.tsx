import { ColumnsType } from "antd/lib/table";
import React, { RefObject } from "react";

import * as Styled from "../AssetsTab.styled";
import { AssetTableRow, useAssetsTab } from "../hooks";

import { AssetsColumns } from "./AssetsColumns";

export const AssetsPrintTable = React.forwardRef((_props, ref) => {
  const { loading, assetTableRows } = useAssetsTab();

  return (
    <div ref={ref as RefObject<HTMLDivElement>}>
      <Styled.AssetsTable
        dataSource={assetTableRows}
        columns={AssetsColumns as ColumnsType<AssetTableRow>}
        loading={loading}
        pagination={false}
      />
    </div>
  );
});
