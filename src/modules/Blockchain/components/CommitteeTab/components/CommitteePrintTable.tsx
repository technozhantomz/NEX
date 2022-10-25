import { ColumnsType } from "antd/lib/table";
import React, { RefObject } from "react";

import * as Styled from "../CommitteeTab.styled";
import { CommitteeTableRow, useCommitteeTab } from "../hooks";

import { CommitteeColumns } from "./CommitteeColumns";

export const CommitteePrintTable = React.forwardRef((_props, ref) => {
  const { loading, committeeTableRows } = useCommitteeTab();

  return (
    <div ref={ref as RefObject<HTMLDivElement>}>
      <Styled.CommitteeTable
        dataSource={committeeTableRows}
        columns={CommitteeColumns as ColumnsType<CommitteeTableRow>}
        loading={loading}
        pagination={false}
      />
    </div>
  );
});
