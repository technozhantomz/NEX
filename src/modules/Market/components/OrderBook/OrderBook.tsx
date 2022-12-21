import counterpart from "counterpart";

import { PasswordModal, TransactionModal } from "../../../../common/components";
import { useHandleTransactionForm } from "../../../../common/hooks";
import {
  useUserContext,
  useViewportContext,
} from "../../../../common/providers";
import { Scroll } from "../../../../common/types";
import { DownOutlined, Form, Tooltip } from "../../../../ui/src";
import { Order, OrderRow, PairAssets } from "../../types";

import * as Styled from "./OrderBook.styled";
import { showUserOrderColumns } from "./components";
import { OrderType, useOrderBook } from "./hooks";

type Props = {
  selectedAssets: PairAssets | undefined;
  loadingSelectedPair: boolean;
  forUser?: boolean;
  asks: Order[];
  bids: Order[];
  loadingAsksBids: boolean;
  userOrdersRows: OrderRow[];
  loadingUserOrderRows: boolean;
  onOrderBookRowClick: (record: OrderRow) => void;
};

export const OrderBook = ({
  forUser = false,
  loadingSelectedPair,
  asks,
  bids,
  loadingAsksBids,
  userOrdersRows,
  loadingUserOrderRows,
  onOrderBookRowClick,
  selectedAssets,
}: Props): JSX.Element => {
  const {
    ordersRows,
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
    selectedAssets,
    loadingSelectedPair,
    asks,
    bids,
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
  const { md } = useViewportContext();
  const { localStorageAccount } = useUserContext();

  const dataSource = forUser ? userOrdersRows : ordersRows;

  const desktopScrollForUserHistories =
    dataSource.length > 11
      ? {
          y: 290,
          x: true,
          scrollToFirstRowOnChange: false,
        }
      : { x: true, scrollToFirstRowOnChange: false };

  const desktopScrollForHistories =
    dataSource.length > 27
      ? { y: 730, x: true, scrollToFirstRowOnChange: false }
      : { x: true, scrollToFirstRowOnChange: false };
  const desktopScroll = forUser
    ? desktopScrollForUserHistories
    : desktopScrollForHistories;

  const mobileScroll =
    dataSource.length > 6
      ? ({ y: 300, x: true, scrollToFirstRowOnChange: false } as Scroll)
      : ({ x: true, scrollToFirstRowOnChange: false } as Scroll);
  const scroll = md ? mobileScroll : (desktopScroll as Scroll);

  const types: OrderType[] = ["total", "sell", "buy"];

  const thresholdMenu = (
    <Styled.ThresholdMenu onClick={handleThresholdChange}>
      <Styled.ThresholdMenu.Item key="0.001">0.001</Styled.ThresholdMenu.Item>
      <Styled.ThresholdMenu.Item key="0.005">0.005</Styled.ThresholdMenu.Item>
      <Styled.ThresholdMenu.Item key="0.01">0.01</Styled.ThresholdMenu.Item>
    </Styled.ThresholdMenu>
  );

  const userOrderColumns = selectedAssets
    ? showUserOrderColumns(
        selectedAssets.quote.symbol,
        selectedAssets.base.symbol,
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
      <Styled.TableContainer>
        <Styled.Table
          loading={forUser ? loadingUserOrderRows : loadingAsksBids}
          pagination={false}
          columns={columns}
          scroll={scroll}
          bordered={false}
          dataSource={dataSource}
          rowClassName={(record: any) => {
            return record.isBuyOrder ? "buy" : "sell";
          }}
          onRow={(record, _rowIndex) => {
            return {
              onClick: () => {
                onOrderBookRowClick(record as OrderRow);
              },
            };
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
