import React from "react";

import * as Styled from "../CommitteeTab.styled";
import { useCommitteeTab } from "../hooks";

import { CommitteeColumns } from "./CommitteeColumns";

export const CommitteePrintTable = React.forwardRef((_props, ref) => {
  const { loading, committeeTableRows } = useCommitteeTab();

  return (
    <div ref={ref}>
      <Styled.CommitteeTable
        dataSource={committeeTableRows}
        columns={CommitteeColumns}
        loading={loading}
        pagination={false}
      />
    </div>
  );
});
