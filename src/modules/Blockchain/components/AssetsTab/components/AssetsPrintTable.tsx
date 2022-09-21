import React from "react";

import * as Styled from "../AssetsTab.styled";
import { useAssetsTab } from "../hooks";

import { AssetsColumns } from "./AssetsColumns";

export const AssetsPrintTable = React.forwardRef((_props, ref) => {
  const { loading, assetTableRows } = useAssetsTab();

  return (
    <div ref={ref}>
      <Styled.AssetsTable
        dataSource={assetTableRows}
        columns={AssetsColumns}
        loading={loading}
        pagination={false}
      />
    </div>
  );
});
