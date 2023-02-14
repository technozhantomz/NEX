import counterpart from "counterpart";
import { useCallback, useMemo } from "react";

import {
  PasswordModal,
  TransactionModal,
} from "../../../../../../common/components";
import { useViewportContext } from "../../../../../../common/providers";
import { OrderTableRow } from "../../../../../../common/types";
import { Form } from "../../../../../../ui/src";

import * as Styled from "./ExpandableUserOrders.styled";
import { createOrdersColumns } from "./ExpandableUserOrdersColumns";
import { useExpandableUserOrders } from "./hooks";

export function ExpandableUserOrders(): JSX.Element {
  const {
    loadingOpenOrders,
    loadingHistoryOrders,
    selectedOrderId,
    isPasswordModalVisible,
    isTransactionModalVisible,
    transactionMessageState,
    cancelOrderFeeAmount,
    hidePasswordModal,
    handleCancelLimitOrderFinish,
    hideTransactionModal,
    onCancelClick,
    localStorageAccount,
    ordersRows,
    defineTableRowClassName,
    pairs,
    onPairFilter,
    selectedPair,
    onStatusFilter,
    selectedStatus,
  } = useExpandableUserOrders();
  const { lg } = useViewportContext();
  const expandedRowRender = useCallback(
    (record: OrderTableRow) => {
      const isOpenOrderRow = record.isOpenOrderRow;
      return (
        <Styled.ExpandableRowContainer>
          <Styled.ItemContainer>
            <Styled.ItemTitle>
              {isOpenOrderRow
                ? counterpart.translate("tableHead.expiration")
                : counterpart.translate("tableHead.date")}
            </Styled.ItemTitle>
            <Styled.ItemValue>{record.date}</Styled.ItemValue>
          </Styled.ItemContainer>
          <Styled.ItemContainer>
            <Styled.ItemTitle>
              {counterpart.translate("tableHead.pair")}
            </Styled.ItemTitle>
            <Styled.ItemValue>{record.pair}</Styled.ItemValue>
          </Styled.ItemContainer>
          <Styled.ItemContainer>
            <Styled.ItemTitle>
              {counterpart.translate("tableHead.type")}
            </Styled.ItemTitle>
            <Styled.ItemValue>{record.type}</Styled.ItemValue>
          </Styled.ItemContainer>
          <Styled.ItemContainer>
            <Styled.ItemTitle>
              {counterpart.translate("tableHead.side")}
            </Styled.ItemTitle>
            <Styled.ItemValue>{record.side}</Styled.ItemValue>
          </Styled.ItemContainer>
          <Styled.ItemContainer>
            <Styled.ItemTitle>
              {counterpart.translate("tableHead.filled")}
            </Styled.ItemTitle>
            <Styled.ItemValue>{record.filled}</Styled.ItemValue>
          </Styled.ItemContainer>
          {lg && (
            <Styled.ItemContainer>
              <Styled.ItemTitle>
                {counterpart.translate("tableHead.total")}
              </Styled.ItemTitle>
              <Styled.ItemValue>{record.total}</Styled.ItemValue>
            </Styled.ItemContainer>
          )}
        </Styled.ExpandableRowContainer>
      );
    },
    [lg]
  );
  const tabletScroll = useMemo(() => {
    return ordersRows.length ? { y: 500, x: undefined } : undefined;
  }, [ordersRows]);
  const mobileScroll = useMemo(() => {
    return ordersRows.length ? { y: 150, x: undefined } : undefined;
  }, [ordersRows]);

  const columns = createOrdersColumns(onCancelClick, lg);

  return (
    <Styled.OrdersWrapper>
      <Styled.FiltersContainer>
        <Styled.Filter
          value={selectedPair}
          onChange={onPairFilter}
          options={[
            {
              value: "all-pairs",
              label: counterpart.translate("pages.market.all_pairs"),
            },
            ...pairs.map((pair) => {
              return {
                value: pair,
                label: pair,
              };
            }),
          ]}
        />
        <Styled.Filter
          value={selectedStatus}
          onChange={onStatusFilter}
          options={[
            {
              value: "all-statuses",
              label: counterpart.translate("pages.market.all_statuses"),
            },
            {
              value: "open",
              label: counterpart.translate("pages.market.open"),
            },
            {
              value: "completed",
              label: counterpart.translate("pages.market.completed"),
            },
            {
              value: "partial",
              label: counterpart.translate("pages.market.partial"),
            },
          ]}
        />
      </Styled.FiltersContainer>
      <Styled.Table
        rowClassName={defineTableRowClassName}
        loading={loadingOpenOrders || loadingHistoryOrders}
        columns={columns}
        expandable={{
          expandedRowRender: expandedRowRender,
          columnWidth: lg ? "28px" : "32px",
          expandRowByClick: true,
        }}
        scroll={lg ? mobileScroll : tabletScroll}
        pagination={false}
        dataSource={ordersRows}
      />

      <>
        <Form.Provider onFormFinish={handleCancelLimitOrderFinish}>
          <TransactionModal
            visible={isTransactionModalVisible}
            onCancel={hideTransactionModal}
            transactionMessageState={transactionMessageState}
            account={localStorageAccount}
            fee={cancelOrderFeeAmount}
            orderId={selectedOrderId}
            transactionType="limit_order_cancel"
          />
          <PasswordModal
            visible={isPasswordModalVisible}
            onCancel={hidePasswordModal}
            neededKeyType="active"
          />
        </Form.Provider>
      </>
    </Styled.OrdersWrapper>
  );
}
