import { ColumnsType } from "antd/lib/table";
import React from "react";

import * as Styled from "../FeesTab.styled";
import { FeesTableRow } from "../hooks";

import { FeeColumnType } from ".";

type Props = {
  loading: boolean;
  feesColumns: FeeColumnType[];
  fullFeesRows: FeesTableRow[];
};

export const FeesPrintTable = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <Styled.FeesTable
          dataSource={props.fullFeesRows}
          columns={props.feesColumns as ColumnsType<FeesTableRow>}
          loading={props.loading}
          pagination={false}
        />
      </div>
    );
  }
);
