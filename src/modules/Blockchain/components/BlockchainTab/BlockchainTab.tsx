import { ParsedUrlQuery } from "querystring";

import { SearchTableInput } from "ant-table-extensions";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactInstance, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { renderPaginationItem } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import {
  DownloadOutlined,
  InfoCircleOutlined,
  List,
  SearchOutlined,
} from "../../../../ui/src";
import { StatsCard } from "../../common";

import * as Styled from "./BlockchainTab.styled";
import { BlockPrintTable } from "./components";
import { DataTableRow, useBlockchainTab } from "./hooks";

type Props = {
  routerQuery: ParsedUrlQuery;
};
export const BlockchainTab = ({ routerQuery }: Props): JSX.Element => {
  const {
    loading,
    blockColumns,
    blockchainTableRows,
    blockchainStats,
    currentBlock,
    lastIrreversibleBlock,
    avgTime,
    supply,
    searchDataSource,
    setSearchDataSource,
  } = useBlockchainTab(routerQuery);
  const router = useRouter();
  const { sm } = useViewportContext();
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <Styled.BlockTabWrapper>
      <Styled.StatsCardsDeck>
        <StatsCard
          noData={currentBlock === 0}
          title={counterpart.translate(`pages.blocks.blockchain.current_block`)}
          data={`${currentBlock}`}
          statsData={blockchainStats.currentBlock}
        />
        <StatsCard
          noData={lastIrreversibleBlock === ""}
          title={counterpart.translate(
            `pages.blocks.blockchain.last_irreversible_block`
          )}
          data={`${lastIrreversibleBlock}`}
          statsData={blockchainStats.lastIrreversible}
        />
        <StatsCard
          isTimeCard={true}
          noData={avgTime === 0}
          title={counterpart.translate(
            `pages.blocks.blockchain.confirmation_time`
          )}
          data={`${avgTime}`}
          statsData={blockchainStats.avgTime}
        />
        <StatsCard
          isRewardCard
          noData={supply.amount === 0}
          title={counterpart.translate(`pages.blocks.blockchain.supply`, {
            symbol: supply.symbol,
          })}
          data={`${supply.amount}`}
          statsData={blockchainStats.supply}
        />
      </Styled.StatsCardsDeck>
      <Styled.BlockHeaderBar>
        <Styled.BlockHeader>
          {counterpart.translate(`pages.blocks.blockchain.recent_blocks`)}
          <InfoCircleOutlined />
        </Styled.BlockHeader>
        <SearchTableInput
          columns={blockColumns as ColumnsType<DataTableRow>}
          dataSource={blockchainTableRows}
          setDataSource={setSearchDataSource}
          inputProps={{
            placeholder: counterpart.translate(
              `pages.blocks.blockchain.search_blocks`
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
            filename={"BlocksTable.csv"}
            data={blockchainTableRows}
            className="btn btn-primary"
          >
            {counterpart.translate(`links.csv`)}
          </CSVLink>
        </Styled.DownloadLinks>
      </Styled.BlockHeaderBar>
      {sm ? (
        <List
          itemLayout="vertical"
          dataSource={searchDataSource}
          loading={loading}
          pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 5,
            defaultCurrent: 1,
            showLessItems: true,
            showSizeChanger: false,
            size: "small",
            itemRender: renderPaginationItem(),
          }}
          renderItem={(item) => (
            <Link href={`/blockchain/${item.blockID}`}>
              <a>
                <Styled.BlockListItem key={item.key}>
                  <Styled.BlockItemContent>
                    <div className="item-info">
                      <span className="item-info-title">
                        {blockColumns[0].title()}
                      </span>
                      <span className="item-info-value">{item.blockID}</span>
                    </div>
                    <div className="item-info">
                      <span className="item-info-title">
                        {blockColumns[1].title()}
                      </span>
                      <span className="item-info-value">{item.time}</span>
                    </div>
                    <div className="item-info">
                      <span className="item-info-title">
                        {blockColumns[2].title()}
                      </span>
                      <span className="item-info-value">
                        {" "}
                        <a href={`/user/${item.witness}`} target="_blank">
                          {item.witness}
                        </a>
                      </span>
                    </div>
                    <div className="item-info">
                      <span className="item-info-title">
                        {blockColumns[3].title()}
                      </span>
                      <span className="item-info-value">
                        {item.transaction ? item.transaction : 0}
                      </span>
                    </div>
                  </Styled.BlockItemContent>
                </Styled.BlockListItem>
              </a>
            </Link>
          )}
        />
      ) : (
        <Styled.BlockTable
          dataSource={searchDataSource}
          columns={blockColumns as ColumnsType<DataTableRow>}
          rowKey={(record) => record.blockID}
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
          onRow={(record, _rowIndex) => {
            return {
              onClick: (_event) => {
                router.push(`/blockchain/${record.blockID}`);
              },
            };
          }}
        />
      )}
      <Styled.PrintTable>
        <BlockPrintTable
          ref={componentRef}
          blockColumns={blockColumns}
          blockchainTableRows={blockchainTableRows}
          loading={loading}
        />
      </Styled.PrintTable>
    </Styled.BlockTabWrapper>
  );
};
