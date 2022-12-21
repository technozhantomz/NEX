import counterpart from "counterpart";

import { PasswordModal, TransactionModal } from "../../../../common/components";
import { Form } from "../../../../ui/src";
import { OrdersTable } from "../OrdersTable";

import * as Styled from "./OrdersTab.styled";
import { useOrdersTab } from "./hooks";

export const OrdersTab = (): JSX.Element => {
  const {
    loading,
    openOrdersColumns,
    openOrdersTableRows,
    ordersHistoriesTableRows,
    ordersHistoriesColumns,
    transactionErrorMessage,
    transactionSuccessMessage,
    loadingTransaction,
    selectedOrderId,
    isPasswordModalVisible,
    isTransactionModalVisible,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
    localStorageAccount,
    cancelOrderfeeAmount,
    onCancelClick,
  } = useOrdersTab();

  return (
    <Styled.OrdersTabWrapper>
      {/* Open orders */}
      <OrdersTable
        header={counterpart.translate("pages.profile.orders_tab.open_orders")}
        loading={loading}
        ordersColumns={openOrdersColumns}
        ordersTableRows={openOrdersTableRows}
        onCancelClick={onCancelClick}
      ></OrdersTable>
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
      {/* Orders History */}
      <OrdersTable
        header={counterpart.translate("pages.profile.orders_tab.order_history")}
        loading={loading}
        ordersColumns={ordersHistoriesColumns}
        ordersTableRows={ordersHistoriesTableRows}
      ></OrdersTable>
    </Styled.OrdersTabWrapper>
  );
};
