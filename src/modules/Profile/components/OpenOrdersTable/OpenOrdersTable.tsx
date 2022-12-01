import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";

import { renderPaginationItem } from "../../../../common/components";

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
        pagination={{
          hideOnSinglePage: true,
          defaultPageSize: 15,
          defaultCurrent: 1,
          showSizeChanger: false,
          showLessItems: true,
          size: "small",
          itemRender: renderPaginationItem(),
        }}
        size="small"
      />
      <Styled.PrintTable></Styled.PrintTable>
    </Styled.OpenOrdersWrapper>
  );
};
