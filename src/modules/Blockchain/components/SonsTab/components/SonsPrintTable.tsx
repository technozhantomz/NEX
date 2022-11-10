import { ColumnsType } from "antd/lib/table";
import React from "react";

import * as Styled from "../SonsTab.styled";
import { SonsTableRow } from "../hooks";

import { SonColumnType } from ".";

type Props = {
  loading: boolean;
  sonsTableRows: SonsTableRow[];
  sonsColumns: SonColumnType[];
};

export const SonsPrintTable = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <Styled.SonsTable
          dataSource={props.sonsTableRows}
          columns={props.sonsColumns as ColumnsType<SonsTableRow>}
          loading={props.loading}
          pagination={false}
        />
      </div>
    );
  }
);
