import { SearchTableInput } from "ant-table-extensions";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import { ReactNode, useCallback, useRef } from "react";

import { AssetsPrintTable } from "..";
import {
  renderPaginationItem,
  TableDownloader,
} from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { List, SearchOutlined } from "../../../../ui/src";
import { AssetTitle } from "../AssetTitle";

import * as Styled from "./AssetsTable.styled";
import { AssetTableRow, useAssetsTable } from "./hooks";

type Props = {
  className?: string;
  title: string;
  actionType?: "send_receive" | "receive_select" | "send_select";
  filterAsset?: string;
};

export const AssetsTable = ({
  className = "",
  title,
  actionType = "send_receive",
  filterAsset = "",
}: Props): JSX.Element => {
  const {
    loading,
    assetsColumns,
    assetsTableRows,
    searchDataSource,
    setSearchDataSource,
  } = useAssetsTable({ filterAsset, actionType });
  const { sm } = useViewportContext();
  const componentRef = useRef<HTMLDivElement>(null);
  const renderListItem = useCallback(
    (item: AssetTableRow) => {
      return (
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
      );
    },
    [assetsColumns]
  );

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
        <TableDownloader
          componentRef={componentRef}
          data={assetsTableRows}
        ></TableDownloader>
      </Styled.AssetHeaderBar>
      {sm ? (
        <List
          itemLayout="vertical"
          dataSource={searchDataSource}
          loading={loading}
          pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 2,
            defaultCurrent: 1,
            showLessItems: true,
            showSizeChanger: false,
            size: "small",
            itemRender: renderPaginationItem(),
          }}
          renderItem={renderListItem}
        />
      ) : (
        <Styled.AssetsTable
          dataSource={searchDataSource}
          columns={assetsColumns as ColumnsType<AssetTableRow>}
          loading={loading}
          pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 2,
            defaultCurrent: 1,
            showSizeChanger: false,
            showLessItems: true,
            size: "small",
            itemRender: renderPaginationItem(),
          }}
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
