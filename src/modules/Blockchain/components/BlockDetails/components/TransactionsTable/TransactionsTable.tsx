import { SearchTableInput } from "ant-table-extensions";
import counterpart from "counterpart";
import { CSSProperties, ReactInstance, ReactNode, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { useViewportContext } from "../../../../../../common/providers";
import {
  DownloadOutlined,
  InfoCircleOutlined,
  List,
  SearchOutlined,
} from "../../../../../../ui/src";
import { TransactionRow } from "../../../BlockchainTab/hooks/useBlockchainTab.types";

import { TransactionsColumns } from "./TransactionsColumns";
import * as Styled from "./TransactionsTable.styled";
import { useTransactionsTable } from "./hooks";

type Props = {
  transactionRows: TransactionRow[];
};

export const TransactionsTable = ({ transactionRows }: Props): JSX.Element => {
  const { loading, searchDataSource, setSearchDataSource } =
    useTransactionsTable(transactionRows);
  const { sm } = useViewportContext();
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <Styled.TableWrapper>
      <Styled.TransactionHeaderBar>
        <Styled.TransactionHeader>
          {counterpart.translate(`pages.blocks.block_details.transactions`)}
          <InfoCircleOutlined />
        </Styled.TransactionHeader>
        <SearchTableInput
          columns={TransactionsColumns}
          dataSource={transactionRows}
          setDataSource={setSearchDataSource}
          inputProps={{
            placeholder: counterpart.translate(
              `pages.blocks.block_details.search_transaction`
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
          loading={loading}
          renderItem={(item) => (
            <Styled.TransactionListItem key={item.rank}>
              <Styled.TransactionItemContent>
                <div className="item-info">
                  <span className="item-info-title">
                    {TransactionsColumns[0].title()}
                  </span>
                  <span className="item-info-value">{item.rank}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {TransactionsColumns[1].title()}
                  </span>
                  <span className="item-info-value">
                    <a target="_blank" href={`/transaction/${item.id}`}>
                      <Styled.CenterEllipsis>
                        <span className="ellipsis">{item.id}</span>
                        <span className="indent">{item.id}</span>
                      </Styled.CenterEllipsis>
                    </a>
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {TransactionsColumns[2].title()}
                  </span>
                  <span className="item-info-value">{item.expiration}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {TransactionsColumns[3].title()}
                  </span>
                  <span className="item-info-value">{item.operations}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {TransactionsColumns[4].title()}
                  </span>
                  <span className="item-info-value">{item.refBlockPrefix}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {TransactionsColumns[5].title()}
                  </span>
                  <span className="item-info-value">{item.refBlockNum}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {TransactionsColumns[6].title()}
                  </span>
                  <span className="item-info-value">{item.extensions}</span>
                </div>
              </Styled.TransactionItemContent>
            </Styled.TransactionListItem>
          )}
        />
      ) : (
        <Styled.TransactionsTable
          dataSource={searchDataSource}
          columns={TransactionsColumns}
          loading={loading}
          pagination={
            !loading
              ? {
                  showSizeChanger: false,
                  size: "small",
                  pageSize: 5,
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
        <div ref={componentRef}>
          <Styled.TransactionsTable
            dataSource={transactionRows}
            columns={TransactionsColumns}
            loading={loading}
            pagination={false}
          />
        </div>
      </Styled.PrintTable>
    </Styled.TableWrapper>
  );
};
