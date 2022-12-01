import { TablePaginationConfig } from "antd";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";

import { renderPaginationConfig } from "../../../../common/components";

import * as Styled from "./OpenOrdersTable.styled";
import { OpenOrdersTableRow, useOpenOrdersTable } from "./hooks";

export const OpenOrdersTabel = (): JSX.Element => {
  const { loading, openOrdersColumns, openOrdersTableRows } =
    useOpenOrdersTable();

  return (
    <Styled.OpenOrdersWrapper>
      <Styled.OpenOrdersHeaderBar>
        <Styled.OpenOrdersHeader>
          {counterpart.translate(`field.labels.open_orders`)}
        </Styled.OpenOrdersHeader>
      </Styled.OpenOrdersHeaderBar>
      <Styled.OpenOrdersTable
        dataSource={openOrdersTableRows}
        columns={openOrdersColumns as ColumnsType<OpenOrdersTableRow>}
        loading={loading}
        pagination={
          renderPaginationConfig({ loading, pageSize: 2 }) as
            | false
            | TablePaginationConfig
        }
        size="small"
      />
      <Styled.PrintTable></Styled.PrintTable>
    </Styled.OpenOrdersWrapper>
  );
};
