import { ColumnsType } from "antd/lib/table";

import { PasswordModal, TransactionModal } from "../../../../common/components";
import { useUserContext } from "../../../../common/providers";
import { OrderTableRow } from "../../../../common/types";
import { Form } from "../../../../ui/src";

import * as Styled from "./UserOrdersTable.styled";
import { useUserOrdersTable } from "./hooks";

type Props = {
  isOpen?: boolean;
};

export function UserOrdersTable({ isOpen = false }: Props): JSX.Element {
  const {
    loading,
    userOrdersRows,
    userOrdersColumns,
    selectedOrderId,
    isPasswordModalVisible,
    isTransactionModalVisible,
    transactionMessageState,
    cancelOrderFeeAmount,
    hidePasswordModal,
    handleCancelLimitOrderFinish,
    hideTransactionModal,
    defineTableRowClassName,
  } = useUserOrdersTable(isOpen);
  const { localStorageAccount } = useUserContext();
  const desktopScroll = {
    y: 300,
    x: 940,
    scrollToFirstRowOnChange: false,
  };
  const scroll = userOrdersRows.length === 0 ? undefined : desktopScroll;
  return (
    <>
      <Styled.OrdersTable
        rowClassName={defineTableRowClassName}
        dataSource={userOrdersRows}
        columns={userOrdersColumns as ColumnsType<OrderTableRow>}
        loading={loading}
        pagination={false}
        scroll={loading ? undefined : scroll}
        size="small"
      />
      {/* Cancel order form */}
      {isOpen ? (
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
      ) : (
        ""
      )}
    </>
  );
}
