import { SearchTableInput } from "ant-table-extensions";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import {
  CSSProperties,
  ReactInstance,
  ReactNode,
  RefObject,
  useRef,
} from "react";
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

import { OperationsColumns } from "./OperationsColumns";
import * as Styled from "./OperationsTable.styled";
import { useOperationsTable } from "./hooks";
import { OperationRow } from "./hooks/useOperationsTable.types";

type Props = {
  transactionRow: TransactionRow;
};

export const OperationsTable = ({ transactionRow }: Props): JSX.Element => {
  const { loading, searchDataSource, setSearchDataSource, operationsRows } =
    useOperationsTable(transactionRow);
  const { sm } = useViewportContext();
  const componentRef = useRef();

  return (
    <Styled.TableWrapper>
      <Styled.OperationsHeaderBar>
        <Styled.OperationsHeader>
          {counterpart.translate(`pages.blocks.block_details.transactions`)}
          <InfoCircleOutlined />
        </Styled.OperationsHeader>
        <SearchTableInput
          columns={OperationsColumns as ColumnsType<OperationRow>}
          dataSource={operationsRows}
          setDataSource={setSearchDataSource}
          inputProps={{
            placeholder: counterpart.translate(
              `pages.blocks.trnasaction_details.search_operations`
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
            data={operationsRows}
            className="btn btn-primary"
          >
            {counterpart.translate(`links.csv`)}
          </CSVLink>
        </Styled.DownloadLinks>
      </Styled.OperationsHeaderBar>
      {sm ? (
        <List
          itemLayout="vertical"
          dataSource={searchDataSource}
          loading={loading}
          renderItem={(item) => (
            <Styled.OperationsListItem key={item.number}>
              <Styled.OperationsItemContent>
                <div className="item-info">
                  <span className="item-info-title">
                    {OperationsColumns[0].title()}
                  </span>
                  <span className="item-info-value"></span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {OperationsColumns[1].title()}
                  </span>
                  <span className="item-info-value"></span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {OperationsColumns[2].title()}
                  </span>
                  <span className="item-info-value"></span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {OperationsColumns[3].title()}
                  </span>
                  <span className="item-info-value"></span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {OperationsColumns[4].title()}
                  </span>
                  <span className="item-info-value"></span>
                </div>
              </Styled.OperationsItemContent>
            </Styled.OperationsListItem>
          )}
        />
      ) : (
        <Styled.OperationsTable
          dataSource={searchDataSource}
          columns={OperationsColumns as ColumnsType<OperationRow>}
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
        <div ref={componentRef as unknown as RefObject<HTMLDivElement>}>
          <Styled.OperationsTable
            dataSource={operationsRows}
            columns={OperationsColumns as ColumnsType<OperationRow>}
            loading={loading}
            pagination={false}
          />
        </div>
      </Styled.PrintTable>
    </Styled.TableWrapper>
  );
};
