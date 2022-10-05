import counterpart from "counterpart";
import { Dispatch, SetStateAction } from "react";

import { PasswordModal, TransactionModal } from "../../../../common/components";
import { useHandleTransactionForm } from "../../../../common/hooks";
import { useUserContext } from "../../../../common/providers";
import { Asset } from "../../../../common/types";
import { DownOutlined, Form, Tooltip } from "../../../../ui/src";
import { Order, OrderRow } from "../../types";

import * as Styled from "./OrderBook.styled";
import { showUserOrderColumns } from "./components";
import { OrderType, useOrderBook } from "./hooks";

type Props = {
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
  forUser?: boolean;
  getOrderBook: (base: Asset, quote: Asset) => Promise<void>;
  asks: Order[];
  bids: Order[];
  ordersRows: OrderRow[];
  setOrdersRows: Dispatch<SetStateAction<OrderRow[]>>;
  loadingOrderRows: boolean;
  getUserOrderBook: (base: Asset, quote: Asset) => Promise<void>;
  userOrdersRows: OrderRow[];
  loadingUserOrderRows: boolean;
};

export const OrderBook = ({
  forUser = false,
  currentBase,
  currentQuote,
  loadingSelectedPair,
  getOrderBook,
  asks,
  bids,
  ordersRows,
  setOrdersRows,
  loadingOrderRows,
  getUserOrderBook,
  userOrdersRows,
  loadingUserOrderRows,
}: Props): JSX.Element => {
  const {
    orderType,
    threshold,
    handleThresholdChange,
    handleFilterChange,
    orderColumns,
    cancelOrderfeeAmount,
    transactionErrorMessage,
    setTransactionErrorMessage,
    transactionSuccessMessage,
    setTransactionSuccessMessage,
    loadingTransaction,
    setSelectedOrderId,
    selectedOrderId,
    handleCancelLimitOrder,
  } = useOrderBook({
    currentBase,
    currentQuote,
    loadingSelectedPair,
    getOrderBook,
    asks,
    bids,
    setOrdersRows,
    getUserOrderBook,
  });

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: handleCancelLimitOrder,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    neededKeyType: "active",
  });

  const { localStorageAccount } = useUserContext();

  const dataSource = forUser ? userOrdersRows : ordersRows;

  const types: OrderType[] = ["total", "sell", "buy"];

  const thresholdMenu = (
    <Styled.ThresholdMenu onClick={handleThresholdChange}>
      <Styled.ThresholdMenu.Item key="0.001">0.001</Styled.ThresholdMenu.Item>
      <Styled.ThresholdMenu.Item key="0.005">0.005</Styled.ThresholdMenu.Item>
      <Styled.ThresholdMenu.Item key="0.01">0.01</Styled.ThresholdMenu.Item>
    </Styled.ThresholdMenu>
  );

  const userOrderColumns =
    currentQuote && currentBase
      ? showUserOrderColumns(
          currentQuote.symbol,
          currentBase.symbol,
          (orderId) => {
            setSelectedOrderId(orderId.split(".")[2]);
            showPasswordModal();
          }
        )
      : undefined;

  const columns = forUser ? userOrderColumns : orderColumns;

  return (
    <>
      {forUser ? (
        ""
      ) : (
        <Styled.FilterContainer>
          <Styled.Flex>
            {types.map((type) => (
              <Tooltip
                placement="top"
                title={type.toUpperCase() + " ORDERS"}
                key={`${type}_tooltip`}
              >
                <Styled.OrdersFilter
                  key={type}
                  onClick={() => handleFilterChange(type)}
                  className={`order-filters__type--${type}${
                    type === orderType ? " active" : ""
                  }`}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </Styled.OrdersFilter>
              </Tooltip>
            ))}
          </Styled.Flex>
          <Styled.Flex>
            <Styled.ThresholdDropdown overlay={thresholdMenu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <Styled.ThresholdLabel>
                  {counterpart.translate(`field.labels.threshold`)}
                </Styled.ThresholdLabel>
                <Styled.ThresholdValue>{threshold}</Styled.ThresholdValue>
                <DownOutlined />
              </a>
            </Styled.ThresholdDropdown>
          </Styled.Flex>
        </Styled.FilterContainer>
      )}
      <Styled.TableContainer forUser={forUser}>
        <Styled.Table
          loading={forUser ? loadingUserOrderRows : loadingOrderRows}
          pagination={false}
          columns={columns}
          scroll={{ x: true }}
          dataSource={dataSource}
          rowClassName={(record: any) => {
            return record.isBuyOrder ? "buy" : "sell";
          }}
        ></Styled.Table>
      </Styled.TableContainer>
      <Form.Provider onFormFinish={handleFormFinish}>
        <TransactionModal
          visible={isTransactionModalVisible}
          onCancel={hideTransactionModal}
          transactionErrorMessage={transactionErrorMessage}
          transactionSuccessMessage={transactionSuccessMessage}
          loadingTransaction={loadingTransaction}
          account={localStorageAccount}
          fee={cancelOrderfeeAmount}
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
  );
};
