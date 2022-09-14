import React from "react";

import { SonsColumns } from "./SonsColumns";
import * as Styled from "./SonsTab.styled";
import { useSonsTab } from "./hooks";

export const SonsPrintTable = React.forwardRef((_props, ref) => {
  const { loading, sonsTableRows } = useSonsTab();

  return (
    <div ref={ref}>
      <Styled.SonsTable
        dataSource={sonsTableRows}
        columns={SonsColumns}
        loading={loading}
        pagination={false}
      />
    </div>
  );
});
