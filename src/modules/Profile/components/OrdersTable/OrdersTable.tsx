import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import { useCallback, useRef } from "react";

import {
  renderPaginationItem,
  TableDownloader,
  UserOrderColumnType,
} from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { OrderTableRow } from "../../../../common/types";
import { DeleteOutlined, List } from "../../../../ui/src";
import { OrdersPrintTable } from "../OrdersPrintTable";

import * as Styled from "./OrdersTable.styled";

type Args = {
  header: string;
  loading: boolean;
  ordersColumns: UserOrderColumnType[];
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
  const renderListItem = useCallback(
    (item: OrderTableRow) => {
      const orderRow = item;
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
              <span className="activity-info-value">{orderRow.price}</span>
            </div>
            <div className="activity-info">
              <span className="activity-info-title">
                {ordersColumns[5]?.title()}
              </span>
              <span className="activity-info-value">{orderRow.amount}</span>
            </div>
            <div className="activity-info">
              <span className="activity-info-title">
                {ordersColumns[6]?.title()}
              </span>
              <span className="activity-info-value">{orderRow.filled}</span>
            </div>
            <div className="activity-info">
              <span className="activity-info-title">
                {ordersColumns[7]?.title()}
              </span>
              <span className="activity-info-value">{orderRow.total}</span>
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
    },
    [ordersColumns, onCancelClick]
  );
  const defineTableRowClass = useCallback((record: any) => {
    return record.side === counterpart.translate("pages.profile.orders_tab.buy")
      ? "buy"
      : "sell";
  }, []);

  return (
    <Styled.OrdersWrapper>
      <Styled.OrdersHeaderBar>
        <Styled.OrdersHeader>{header}</Styled.OrdersHeader>
        <TableDownloader
          componentRef={componentRef}
          data={ordersTableRows}
        ></TableDownloader>
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
          renderItem={renderListItem}
        />
      ) : (
        <Styled.OrdersTable
          rowClassName={defineTableRowClass}
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
