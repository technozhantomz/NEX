import { SearchTableInput } from "ant-table-extensions";
import { TablePaginationConfig } from "antd";
import { PaginationConfig } from "antd/lib/pagination";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactInstance, RefObject, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { renderPaginationConfig } from "../../../../../../common/components";
import { useViewportContext } from "../../../../../../common/providers";
import {
  DownloadOutlined,
  InfoCircleOutlined,
  List,
  SearchOutlined,
} from "../../../../../../ui/src";
import { TransactionRow } from "../../hooks";

import { TransactionsColumns } from "./TransactionsColumns";
import * as Styled from "./TransactionsTable.styled";
import { useTransactionsTable } from "./hooks";

type Props = {
  block: number;
  transactionRows: TransactionRow[];
  loadingBlockDetails: boolean;
};

export const TransactionsTable = ({
  block,
  transactionRows,
  loadingBlockDetails,
}: Props): JSX.Element => {
  const { searchDataSource, setSearchDataSource } =
    useTransactionsTable(transactionRows);
  const { sm } = useViewportContext();
  const componentRef = useRef();
  const transactionsColumns = TransactionsColumns(block);
  const router = useRouter();

  return (
    <Styled.TableWrapper>
      <Styled.TransactionHeaderBar>
        <Styled.TransactionHeader>
          {counterpart.translate(`pages.blocks.block_details.transactions`)}
          <InfoCircleOutlined />
        </Styled.TransactionHeader>
        <SearchTableInput
          columns={transactionsColumns as ColumnsType<TransactionRow>}
          dataSource={transactionRows}
          setDataSource={setSearchDataSource}
          inputProps={{
            placeholder: counterpart.translate(
              `pages.blocks.block_details.search_transactions`
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
            data={transactionRows}
            className="btn btn-primary"
          >
            {counterpart.translate(`links.csv`)}
          </CSVLink>
        </Styled.DownloadLinks>
      </Styled.TransactionHeaderBar>
      {sm ? (
        <List
          itemLayout="vertical"
          dataSource={searchDataSource}
          pagination={
            renderPaginationConfig({
              loading: loadingBlockDetails,
              pageSize: 2,
            }) as PaginationConfig
          }
          loading={loadingBlockDetails}
          renderItem={(item) => (
            <Link href={`/blockchain/${block}/${item.rank}`}>
              <Styled.TransactionListItem key={item.rank}>
                <Styled.TransactionItemContent>
                  <div className="item-info">
                    <span className="item-info-title">
                      {transactionsColumns[0].title()}
                    </span>
                    <span className="item-info-value">{item.rank}</span>
                  </div>
                  {/* <div className="item-info">
                  <span className="item-info-title">
                    {transactionsColumns[1].title()}
                  </span>
                  <span className="item-info-value">
                    <Link
                      target="_blank"
                      href={`/blockchain/${block}/${item.rank}`}
                    >
                      <Styled.CenterEllipsis>
                        <span className="ellipsis">{item.id}</span>
                        <span className="indent">{item.id}</span>
                      </Styled.CenterEllipsis>
                    </Link>
                  </span>
                </div> */}
                  <div className="item-info">
                    <span className="item-info-title">
                      {transactionsColumns[1].title()}
                    </span>
                    <span className="item-info-value">{item.expiration}</span>
                  </div>
                  <div className="item-info">
                    <span className="item-info-title">
                      {transactionsColumns[2].title()}
                    </span>
                    <span className="item-info-value">
                      {item.operations.length}
                    </span>
                  </div>
                  <div className="item-info">
                    <span className="item-info-title">
                      {transactionsColumns[3].title()}
                    </span>
                    <span className="item-info-value">
                      {item.refBlockPrefix}
                    </span>
                  </div>
                  <div className="item-info">
                    <span className="item-info-title">
                      {transactionsColumns[4].title()}
                    </span>
                    <span className="item-info-value">{item.refBlockNum}</span>
                  </div>
                  <div className="item-info">
                    <span className="item-info-title">
                      {transactionsColumns[5].title()}
                    </span>
                    <span className="item-info-value">
                      {item.extensions.length}
                    </span>
                  </div>
                </Styled.TransactionItemContent>
              </Styled.TransactionListItem>
            </Link>
          )}
        />
      ) : (
        <Styled.TransactionsTable
          dataSource={searchDataSource}
          columns={transactionsColumns as ColumnsType<TransactionRow>}
          loading={loadingBlockDetails}
          rowClassName={(_record) => "pointer"}
          onRow={(record) => {
            return {
              onClick: (_event) => {
                router.push(`/blockchain/${block}/${record.rank}`);
              },
            };
          }}
          pagination={
            renderPaginationConfig({
              loading: loadingBlockDetails,
              pageSize: 5,
            }) as false | TablePaginationConfig
          }
        />
      )}
      <Styled.PrintTable>
        <div ref={componentRef as unknown as RefObject<HTMLDivElement>}>
          <Styled.TransactionsTable
            dataSource={transactionRows}
            columns={transactionsColumns as ColumnsType<TransactionRow>}
            loading={loadingBlockDetails}
            pagination={false}
          />
        </div>
      </Styled.PrintTable>
    </Styled.TableWrapper>
  );
};
