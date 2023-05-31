import counterpart from "counterpart";
import React from "react";

import { PasswordModal, TransactionModal } from "..";
import { BITCOIN_NETWORK } from "../../../api/params";
import { Form } from "../../../ui/src";
import { useHandleTransactionForm } from "../../hooks";
import { useUserContext } from "../../providers";

import * as Styled from "./GenerateBitcoinAddress.styled";
import { useGenerateBitcoinAddress } from "./hooks";

type Props = {
  getSidechainAccounts: (accountId: string) => Promise<void>;
  className?: string;
};

export const GenerateBitcoinAddress = ({
  className,
  getSidechainAccounts,
}: Props): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const {
    transactionMessageState,
    transactionMessageDispatch,
    generateBitcoinAddresses,
  } = useGenerateBitcoinAddress(getSidechainAccounts);

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: generateBitcoinAddresses,
    transactionMessageDispatch,
    neededKeyType: "active",
  });

  return (
    <>
      <Form.Provider onFormFinish={handleFormFinish}>
        <Styled.DepositForm
          name="generateAddressForm"
          onFinish={showPasswordModal}
          className={className}
        >
          <Styled.FormItem>
            <Styled.Button type="primary" htmlType="submit">
              {counterpart.translate(`buttons.generate_bitcoin_address`)}
            </Styled.Button>
          </Styled.FormItem>
        </Styled.DepositForm>

        <PasswordModal
          neededKeyType="active"
          visible={isPasswordModalVisible}
          onCancel={hidePasswordModal}
        />
        <TransactionModal
          visible={isTransactionModalVisible}
          onCancel={hideTransactionModal}
          transactionMessageState={transactionMessageState}
          account={localStorageAccount}
          fee={0}
          sidechain={BITCOIN_NETWORK}
          transactionType="sidechain_address_add"
        />
      </Form.Provider>
    </>
  );
};
