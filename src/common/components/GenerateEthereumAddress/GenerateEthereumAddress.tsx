import counterpart from "counterpart";
import React from "react";

import { PasswordModal, TransactionModal } from "..";
import { ETHEREUM_NETWORK } from "../../../api/params";
import { Form } from "../../../ui/src";
import { useTransactionForm } from "../../hooks";
import { useUserContext } from "../../providers";

import * as Styled from "./GenerateEthereumAddress.styled";
import { useGenerateEthereumAddress } from "./hooks";

type Props = {
  getSidechainAccounts: (accountId: string) => Promise<void>;
  className?: string;
};

export const GenerateEthereumAddress = ({
  className,
  getSidechainAccounts,
}: Props): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const {
    transactionMessageState,
    dispatchTransactionMessage,
    generateEthereumAddresses,
  } = useGenerateEthereumAddress(getSidechainAccounts);

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useTransactionForm({
    executeTransaction: generateEthereumAddresses,
    dispatchTransactionMessage,
    neededKeyType: "active",
  });

  return (
    <>
      <Form.Provider onFormFinish={handleFormFinish}>
        <Styled.DepositForm name="generateAddressForm" className={className}>
          <Styled.FormItem>
            <Styled.Button type="primary" htmlType="submit">
              {counterpart.translate(`buttons.generate_ethereum_address`)}
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
          sidechain={ETHEREUM_NETWORK}
          transactionType="sidechain_address_add"
        />
      </Form.Provider>
    </>
  );
};
