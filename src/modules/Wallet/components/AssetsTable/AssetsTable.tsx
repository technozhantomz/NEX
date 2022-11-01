import { SearchTableInput } from "ant-table-extensions";
import { TablePaginationConfig } from "antd";
import { PaginationConfig } from "antd/lib/pagination";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import { ReactInstance, ReactNode, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { AssetsPrintTable } from "..";
import { renderPaginationConfig } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { DownloadOutlined, List, SearchOutlined } from "../../../../ui/src";
import { AssetTitle } from "../AssetTitle";

import * as Styled from "./AssetsTable.styled";
import { AssetTableRow, useAssetsTable } from "./hooks";

type Props = {
  className?: string;
  title: string;
  actionType?: "send_receive" | "receive_select" | "send_select";
  fillterAsset?: string;
};

export const AssetsTable = ({
  className = "",
  title,
  actionType = "send_receive",
  fillterAsset = "",
}: Props): JSX.Element => {
  const {
    loading,
    assetsColumns,
    assetsTableRows,
    searchDataSource,
    setSearchDataSource,
  } = useAssetsTable({ fillterAsset, actionType });
  const { sm } = useViewportContext();
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <Styled.AssetsWrapper className={className}>
      <Styled.AssetHeaderBar>
        <Styled.AssetHeader>{title}</Styled.AssetHeader>
        <SearchTableInput
          columns={assetsColumns as ColumnsType<AssetTableRow>}
          dataSource={assetsTableRows}
          setDataSource={setSearchDataSource}
          inputProps={{
            placeholder: counterpart.translate(
              `pages.blocks.assets.search_assets`
            ),
            suffix: <SearchOutlined />,
          }}
        />
        <Styled.DownloadLinks>
          <DownloadOutlined />
          <ReactToPrint
            trigger={() => <a href="#">{counterpart.translate(`links.pdf`)}</a>}
            content={() => componentRef.current as unknown as ReactInstance}
          />

          {` / `}
          <CSVLink
            filename={"AssetsTable.csv"}
            data={assetsTableRows}
            className="btn btn-primary"
          >
            {counterpart.translate(`links.csv`)}
          </CSVLink>
        </Styled.DownloadLinks>
      </Styled.AssetHeaderBar>
      {sm ? (
        <List
          itemLayout="vertical"
          dataSource={searchDataSource}
          loading={loading}
          pagination={
            renderPaginationConfig({ loading, pageSize: 2 }) as
              | false
              | PaginationConfig
          }
          renderItem={(item) => (
            <Styled.AssetListItem
              key={item.key}
              actions={
                [
                  (
                    assetsColumns[4].render as (
                      _text: string,
                      record: AssetTableRow
                    ) => JSX.Element
                  )("", item),
                ] as ReactNode[]
              }
            >
              <AssetTitle symbol={item.symbol} />
              <Styled.AssetsItemContent>
                <div className="asset-info">
                  <span className="asset-info-title">
                    {assetsColumns[2].title()}
                  </span>
                  <span className="asset-info-value">{item.available}</span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">
                    {assetsColumns[3].title()}
                  </span>
                  <span className="asset-info-value">{item.inOrders}</span>
                </div>
              </Styled.AssetsItemContent>
            </Styled.AssetListItem>
          )}
        />
      ) : (
        <Styled.AssetsTable
          dataSource={searchDataSource}
          columns={assetsColumns as ColumnsType<AssetTableRow>}
          loading={loading}
          pagination={
            renderPaginationConfig({ loading, pageSize: 2 }) as
              | false
              | TablePaginationConfig
          }
          size="small"
        />
      )}
      <Styled.PrintTable>
        <AssetsPrintTable
          ref={componentRef}
          assetsTableRows={assetsTableRows}
          loading={loading}
          assetsColumns={assetsColumns}
        />
      </Styled.PrintTable>
    </Styled.AssetsWrapper>
  );
};
