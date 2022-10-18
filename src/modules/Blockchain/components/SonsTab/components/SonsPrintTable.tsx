import { ColumnsType } from "antd/lib/table";
import React, { RefObject } from "react";

import * as Styled from "../SonsTab.styled";
import { SonsTableRow, useSonsTab } from "../hooks";

import { SonsColumns } from "./SonsColumns";

export const SonsPrintTable = React.forwardRef((_props, ref) => {
  const { loading, sonsTableRows } = useSonsTab();

  return (
    <div ref={ref as RefObject<HTMLDivElement>}>
      <Styled.SonsTable
        dataSource={sonsTableRows}
        columns={SonsColumns as ColumnsType<SonsTableRow>}
        loading={loading}
        pagination={false}
      />
    </div>
  );
});
