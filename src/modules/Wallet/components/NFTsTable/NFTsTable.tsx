import { SearchTableInput } from "ant-table-extensions";
import { Image } from "antd";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import Link from "next/link";
import { useCallback, useRef } from "react";

import {
  renderPaginationItem,
  TableDownloader,
} from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { Avatar, List, SearchOutlined } from "../../../../ui/src";

import * as Styled from "./NFTsTable.styled";
import { NFTRow, useNFTsTable } from "./hooks";

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
  const renderListItem = useCallback(
    (item: NFTRow) => {
      return (
        <Styled.NFTsListItem key={item.key}>
          <Styled.NFTsItemContent>
            <div className="item-info">
              <span className="item-info-title">{nftColumns[0].title()}</span>
              <span className="item-info-value">
                <Avatar src={<Image src={item.img} width="30" />}></Avatar>
              </span>
            </div>
            <div className="item-info">
              <span className="item-info-title">{nftColumns[1].title()}</span>
              <span className="item-info-value">{item.name}</span>
            </div>
            <div className="item-info">
              <span className="item-info-title">{nftColumns[2].title()}</span>
              <span className="item-info-value">
                <Link target="_blank" href={`/user/${item.maker}`}>
                  {item.maker}
                </Link>
              </span>
            </div>
            <div className="item-info">
              <span className="item-info-title">{nftColumns[3].title()}</span>
              <span className="item-info-value">{item.collection}</span>
            </div>
            <div className="item-info">
              <span className="item-info-title">{nftColumns[4].title()}</span>
              <span className="item-info-value">{item.bestOffer}</span>
            </div>
            <div className="item-info">
              <span className="item-info-title">{nftColumns[5].title()}</span>
              <span className="item-info-value">{item.quantity}</span>
            </div>
            <div className="item-info">
              <span className="item-info-title">{nftColumns[6].title()}</span>
              <span className="item-info-value">
                {item.onSale === true ? <Styled.ActiveIcon /> : ``}
              </span>
            </div>
          </Styled.NFTsItemContent>
        </Styled.NFTsListItem>
      );
    },
    [nftColumns]
  );

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
        <TableDownloader
          componentRef={componentRef}
          data={nftRows}
        ></TableDownloader>
      </Styled.NFTsHeaderBar>
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
        <Styled.NFTsTable
          dataSource={searchDataSource}
          columns={nftColumns as ColumnsType<unknown>}
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
