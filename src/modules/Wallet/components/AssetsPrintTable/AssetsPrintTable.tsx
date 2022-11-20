import { ColumnsType } from "antd/lib/table";
import React from "react";

import { AssetColumnType } from "..";
import * as Styled from "../AssetsTable/AssetsTable.styled";
import { AssetTableRow } from "../AssetsTable/hooks";

type Props = {
  loading: boolean;
  assetsColumns: AssetColumnType[];
  assetsTableRows: AssetTableRow[];
};

export const AssetsPrintTable = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <Styled.AssetsTable
          dataSource={props.assetsTableRows}
          columns={props.assetsColumns as ColumnsType<AssetTableRow>}
          loading={props.loading}
          pagination={false}
        />
      </div>
    );
  }
);
