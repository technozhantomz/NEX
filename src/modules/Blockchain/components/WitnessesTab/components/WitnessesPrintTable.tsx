import { ColumnsType } from "antd/lib/table";
import React, { RefObject } from "react";

import * as Styled from "../WitnessesTab.styled";
import { useWitnessesTab, WitnessTableRow } from "../hooks";

import { WitnessesColumns } from "./WitnessesColumns";

export const WitnessesPrintTable = React.forwardRef((_props, ref) => {
  const { loading, witnessTableRows } = useWitnessesTab();

  return (
    <div ref={ref as RefObject<HTMLDivElement>}>
      <Styled.WitnessesTable
        dataSource={witnessTableRows}
        columns={WitnessesColumns as ColumnsType<WitnessTableRow>}
        loading={loading}
        pagination={false}
      />
    </div>
  );
});
