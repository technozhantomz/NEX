import { ColumnsType } from "antd/lib/table";
import React from "react";

import * as Styled from "../WitnessesTab.styled";
import { WitnessTableRow } from "../hooks";

import { WitnessColumnType } from ".";

type Props = {
  loading: boolean;
  witnessTableRows: WitnessTableRow[];
  witnessesColumns: WitnessColumnType[];
};

export const WitnessesPrintTable = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <Styled.WitnessesTable
          dataSource={props.witnessTableRows}
          columns={props.witnessesColumns as ColumnsType<WitnessTableRow>}
          loading={props.loading}
          pagination={false}
        />
      </div>
    );
  }
);
