import { ColumnsType } from "antd/lib/table";
import React from "react";

import * as Styled from "../CommitteeTab.styled";
import { CommitteeTableRow } from "../hooks";

import { CommitteeColumnType } from ".";

type Props = {
  loading: boolean;
  committeeColumns: CommitteeColumnType[];
  committeeTableRows: CommitteeTableRow[];
};

export const CommitteePrintTable = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <Styled.CommitteeTable
          dataSource={props.committeeTableRows}
          columns={props.committeeColumns as ColumnsType<CommitteeTableRow>}
          loading={props.loading}
          pagination={false}
        />
      </div>
    );
  }
);
