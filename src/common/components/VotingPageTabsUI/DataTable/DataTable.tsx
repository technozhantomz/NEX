import React from "react";

import * as Styled from "./DataTable.styled";
import { useDataTable } from "./hooks";

type Props = {
  approved: boolean;
  columns: any[];
  data: any[];
};

export const DataTable = ({ approved, columns, data }: Props): JSX.Element => {
  const { localStorageAccount } = useDataTable();

  return (
    <Styled.ActionFormTabCard>
      <Styled.Table
        columns={columns}
        dataSource={data}
        size="small"
        title={() => (
          <Styled.TableTitle strong>
            {approved
              ? `Approved by ${localStorageAccount}`
              : `Not approved by ${localStorageAccount}`}
            {approved ? <Styled.Check /> : <Styled.Xmark />}
          </Styled.TableTitle>
        )}
      />
    </Styled.ActionFormTabCard>
  );
};
