import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import { ReactInstance, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { OrderColumnType } from "..";
import { renderPaginationItem } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { DeleteOutlined, DownloadOutlined, List } from "../../../../ui/src";
import { OrderTableRow } from "../../types";
import { OrdersPrintTable } from "../OrdersPrintTable";

import * as Styled from "./OrdersTable.styled";

type Args = {
  header: string;
  loading: boolean;
  ordersColumns: OrderColumnType[];
  ordersTableRows: OrderTableRow[];
  onCancelClick?: (orderId: string) => void;
};

export const OrdersTable = ({
  header,
  loading,
  ordersColumns,
  ordersTableRows,
  onCancelClick,
}: Args): JSX.Element => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { md } = useViewportContext();

  return (
    <Styled.OrdersWrapper>
      <Styled.OrdersHeaderBar>
        <Styled.OrdersHeader>{header}</Styled.OrdersHeader>
        <Styled.DownloadLinks>
          <DownloadOutlined />
          <ReactToPrint
            trigger={() => <a href="#">{counterpart.translate(`links.pdf`)}</a>}
            content={() => componentRef.current as unknown as ReactInstance}
          />

          {` / `}
          <CSVLink
            filename={"WitnessesTable.csv"}
            data={ordersTableRows}
            className="btn btn-primary"
          >
            {counterpart.translate(`links.csv`)}
          </CSVLink>
        </Styled.DownloadLinks>
      </Styled.OrdersHeaderBar>
      {md ? (
        <List
          itemLayout="vertical"
          dataSource={ordersTableRows}
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
          renderItem={(item) => {
            const orderRow = item as OrderTableRow;
            return (
              <Styled.OrderListItem key={orderRow.key}>
                <Styled.OrderItemContent>
                  <div className="activity-info">
                    <span className="activity-info-title">
                      {ordersColumns[0]?.title()}
                    </span>
                    <span className="activity-info-value">{orderRow.date}</span>
                  </div>
                  <div className="activity-info">
                    <span className="activity-info-title">
                      {ordersColumns[1]?.title()}
                    </span>
                    <span className="activity-info-value">{orderRow.pair}</span>
                  </div>
                  <div className="activity-info">
                    <span className="activity-info-title">
                      {ordersColumns[2]?.title()}
                    </span>
                    <span className="activity-info-value">{orderRow.type}</span>
                  </div>
                  <div className="activity-info">
                    <span className="activity-info-title">
                      {ordersColumns[3]?.title()}
                    </span>
                    <span className="activity-info-value">{orderRow.side}</span>
                  </div>
                  <div className="activity-info">
                    <span className="activity-info-title">
                      {ordersColumns[4]?.title()}
                    </span>
                    <span className="activity-info-value">
                      {orderRow.price}
                    </span>
                  </div>
                  <div className="activity-info">
                    <span className="activity-info-title">
                      {ordersColumns[5]?.title()}
                    </span>
                    <span className="activity-info-value">
                      {orderRow.amount}
                    </span>
                  </div>
                  <div className="activity-info">
                    <span className="activity-info-title">
                      {ordersColumns[6]?.title()}
                    </span>
                    <span className="activity-info-value">
                      {orderRow.filled}
                    </span>
                  </div>
                  <div className="activity-info">
                    <span className="activity-info-title">
                      {ordersColumns[7]?.title()}
                    </span>
                    <span className="activity-info-value">
                      {orderRow.total}
                    </span>
                  </div>
                  <div className="activity-info">
                    <span className="activity-info-title">
                      {ordersColumns[8]?.title()}
                    </span>
                    <span className="activity-info-value">
                      {!onCancelClick ? (
                        orderRow.statusActions
                      ) : (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onCancelClick(orderRow.key);
                          }}
                        >
                          <DeleteOutlined />
                        </div>
                      )}
                    </span>
                  </div>
                </Styled.OrderItemContent>
              </Styled.OrderListItem>
            );
          }}
        />
      ) : (
        <Styled.OrdersTable
          rowClassName={(record, _index) => {
            return record.side ===
              counterpart.translate("pages.profile.orders_tab.buy")
              ? "buy"
              : "sell";
          }}
          dataSource={ordersTableRows}
          columns={ordersColumns as ColumnsType<OrderTableRow>}
          loading={loading}
          pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 4,
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
        <OrdersPrintTable
          ref={componentRef}
          loading={loading}
          ordersColumns={ordersColumns}
          ordersTableRows={ordersTableRows}
        />
      </Styled.PrintTable>
    </Styled.OrdersWrapper>
  );
};
