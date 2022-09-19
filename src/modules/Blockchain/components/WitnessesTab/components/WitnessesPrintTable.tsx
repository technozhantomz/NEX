import React from "react";

import * as Styled from "../WitnessesTab.styled";
import { useWitnessesTab } from "../hooks";

import { WitnessesColumns } from "./WitnessesColumns";

export const WitnessesPrintTable = React.forwardRef((_props, ref) => {
  const { loading, witnessTableRows } = useWitnessesTab();

  return (
    <div ref={ref}>
      <Styled.WitnessesTable
        dataSource={witnessTableRows}
        columns={WitnessesColumns}
        loading={loading}
        pagination={false}
      />
    </div>
  );
});
