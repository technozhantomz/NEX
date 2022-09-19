import React from "react";

import * as Styled from "../FeesTab.styled";
import { useFeesTab } from "../hooks";

import { FeesColumns } from "./FeesColumns";

export const FeesPrintTable = React.forwardRef((_props, ref) => {
  const { loading, fullFeesRows } = useFeesTab();

  return (
    <div ref={ref}>
      <Styled.FeesTable
        dataSource={fullFeesRows}
        columns={FeesColumns}
        loading={loading}
        pagination={false}
      />
    </div>
  );
});
