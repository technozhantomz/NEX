import { SearchTableInput } from "ant-table-extensions";
import { Image } from "antd";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import Link from "next/link";
import { CSSProperties, ReactInstance, ReactNode, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

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
          <a target="_blank" href="https://tradehands.peerplays.download/">
            {counterpart.translate(`pages.wallet.nft_store`)}
          </a>
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
                  <span className="item-info-value">{item.quantity}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {nftColumns[5].title()}
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
            !loading
              ? {
                  hideOnSinglePage: true,
                  showSizeChanger: false,
                  size: "small",
                  pageSize: 15,
                  showLessItems: true,
                  itemRender: (
                    _page: number,
                    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
                    element: ReactNode
                  ) => {
                    if (type === "prev") {
                      return (
                        <a style={{ marginRight: "8px" } as CSSProperties}>
                          {counterpart.translate(`buttons.previous`)}
                        </a>
                      );
                    }
                    if (type === "next") {
                      return (
                        <a style={{ marginLeft: "8px" } as CSSProperties}>
                          {counterpart.translate(`buttons.next`)}
                        </a>
                      );
                    }
                    return element;
                  },
                }
              : false
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
