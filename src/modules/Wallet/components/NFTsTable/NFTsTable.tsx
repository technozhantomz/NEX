import { SearchTableInput } from "ant-table-extensions";
import { Image, TablePaginationConfig } from "antd";
import { PaginationConfig } from "antd/lib/pagination";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import Link from "next/link";
import { ReactInstance, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { renderPaginationConfig } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import {
  Avatar,
  DownloadOutlined,
  List,
  SearchOutlined,
} from "../../../../ui/src";

import * as Styled from "./NFTsTable.styled";
import { useNFTsTable } from "./hooks";

export const NFTsTable = (): JSX.Element => {
  const {
    loading,
    nftRows,
    nftColumns,
    searchDataSource,
    setSearchDataSource,
  } = useNFTsTable();
  const { sm } = useViewportContext();
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <Styled.NFTsTableWrapper>
      <Styled.NFTsHeaderBar>
        <Styled.NFTsHeader>
          {counterpart.translate(`pages.wallet.nfts`)}{" "}
          <Styled.NFTLinkWrapper>
            <a target="_blank" href="https://tradehands.peerplays.download/">
              {counterpart.translate(`pages.wallet.nft_store`)}
            </a>
          </Styled.NFTLinkWrapper>
        </Styled.NFTsHeader>
        <SearchTableInput
          columns={nftColumns as ColumnsType<unknown>}
          dataSource={nftRows}
          setDataSource={setSearchDataSource}
          inputProps={{
            placeholder: counterpart.translate(`pages.wallet.nft_search`),
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
            filename={"nfts.csv"}
            data={nftRows}
            className="btn btn-primary"
          >
            {counterpart.translate(`links.csv`)}
          </CSVLink>
        </Styled.DownloadLinks>
      </Styled.NFTsHeaderBar>
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
            <Styled.NFTsListItem key={item.key}>
              <Styled.NFTsItemContent>
                <div className="item-info">
                  <span className="item-info-title">
                    {nftColumns[0].title()}
                  </span>
                  <span className="item-info-value">
                    <Avatar src={<Image src={item.img} width="30" />}></Avatar>
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {nftColumns[1].title()}
                  </span>
                  <span className="item-info-value">{item.name}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {nftColumns[2].title()}
                  </span>
                  <span className="item-info-value">
                    <Link href={`/user/${item.maker}`}>
                      <a target="_blank">{item.maker}</a>
                    </Link>
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {nftColumns[3].title()}
                  </span>
                  <span className="item-info-value">{item.collection}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {nftColumns[4].title()}
                  </span>
                  <span className="item-info-value">{item.bestOffer}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {nftColumns[5].title()}
                  </span>
                  <span className="item-info-value">{item.quantity}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {nftColumns[6].title()}
                  </span>
                  <span className="item-info-value">
                    {item.onSale === true ? <Styled.ActiveIcon /> : ``}
                  </span>
                </div>
              </Styled.NFTsItemContent>
            </Styled.NFTsListItem>
          )}
        />
      ) : (
        <Styled.NFTsTable
          dataSource={searchDataSource}
          columns={nftColumns as ColumnsType<unknown>}
          loading={loading}
          pagination={
            renderPaginationConfig({ loading, pageSize: 2 }) as
              | false
              | TablePaginationConfig
          }
        />
      )}
      <Styled.PrintTable>
        <Styled.NFTsTable
          dataSource={nftRows}
          columns={nftColumns as ColumnsType<unknown>}
          loading={loading}
          pagination={false}
        />
      </Styled.PrintTable>
    </Styled.NFTsTableWrapper>
  );
};
