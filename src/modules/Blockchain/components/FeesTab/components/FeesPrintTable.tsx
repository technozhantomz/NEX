import { ColumnsType } from "antd/lib/table";
import React, { RefObject } from "react";

import * as Styled from "../FeesTab.styled";
import { FeesTableRow, useFeesTab } from "../hooks";

import { FeesColumns } from "./FeesColumns";

export const FeesPrintTable = React.forwardRef((_props, ref) => {
  const { loading, fullFeesRows } = useFeesTab();

  return (
    <div ref={ref as RefObject<HTMLDivElement>}>
      <Styled.FeesTable
        dataSource={fullFeesRows}
        columns={FeesColumns as ColumnsType<FeesTableRow>}
        loading={loading}
        pagination={false}
      />
    </div>
  );
});
