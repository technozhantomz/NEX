import { TablePaginationConfig } from "antd";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import { ReactInstance, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { renderPaginationConfig } from "../../../../common/components";
import { DownloadOutlined } from "../../../../ui/src";

import * as Styled from "./OpenOrdersTabel.styled";
import { OpenOrdersTableRow, useOpenOrdersTable } from "./hooks";

export const OpenOrdersTabel = (): JSX.Element => {
  const { loading, openOrdersColumns, openOrdersTableRows } =
    useOpenOrdersTable();

  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <Styled.OpenOrdersWrapper>
      <Styled.OpenOrdersHeaderBar>
        <Styled.OpenOrdersHeader>open orders</Styled.OpenOrdersHeader>
        <Styled.DownloadLinks>
          <DownloadOutlined />
          <ReactToPrint
            trigger={() => <a href="#">{counterpart.translate(`links.pdf`)}</a>}
            content={() => componentRef.current as unknown as ReactInstance}
          />

          {` / `}
          <CSVLink
            filename={"OpenOrdersTable.csv"}
            data={""}
            className="btn btn-primary"
          >
            {counterpart.translate(`links.csv`)}
          </CSVLink>
        </Styled.DownloadLinks>
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
