import counterpart from "counterpart";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { PasswordModal, TransactionModal } from "..";
import { Form } from "../../../ui/src";
import { useHandleTransactionForm } from "../../hooks";
import { useUserContext } from "../../providers";

import * as Styled from "./GenerateBitcoinAddress.styled";
import { useGenerateBitcoinAddress } from "./hooks";

type Props = {
  isLoggedIn?: boolean;
  getSidechainAccounts: (accountId: string) => Promise<void>;
};

export const GenerateBitcoinAddress = ({
  isLoggedIn = false,
  getSidechainAccounts,
}: Props): JSX.Element => {
  const router = useRouter();
  const { localStorageAccount } = useUserContext();
  const {
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    loadingTransaction,
    transactionErrorMessage,
    transactionSuccessMessage,
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
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    neededKeyType: "active",
  });

  return (
    <>
      <Form.Provider onFormFinish={handleFormFinish}>
        <Styled.DepositForm
          name="generateAddressForm"
          onFinish={showPasswordModal}
        >
          <Styled.FormItem>
            {isLoggedIn ? (
              <Styled.Button type="primary" htmlType="submit">
                {counterpart.translate(`buttons.generate_bitcoin_address`)}
              </Styled.Button>
            ) : (
              <Styled.Button
                type="primary"
                htmlType="button"
                onClick={() => {
                  router.push("/login");
                }}
              >
                {counterpart.translate(
                  `buttons.login_and_generate_bitcoin_address`
                )}
              </Styled.Button>
            )}
          </Styled.FormItem>
        </Styled.DepositForm>

        {isLoggedIn ? (
          ""
        ) : (
          <Styled.FormDisclamer>
            <span>
              {counterpart.translate(`buttons.dont_have_peerplays_account`)}
            </span>
            <Link href="/signup">
              <a>{counterpart.translate(`links.create_account`)}</a>
            </Link>
          </Styled.FormDisclamer>
        )}
        <PasswordModal
          neededKeyType="active"
          visible={isPasswordModalVisible}
          onCancel={hidePasswordModal}
        />
        <TransactionModal
          visible={isTransactionModalVisible}
          onCancel={hideTransactionModal}
          transactionErrorMessage={transactionErrorMessage}
          transactionSuccessMessage={transactionSuccessMessage}
          loadingTransaction={loadingTransaction}
          account={localStorageAccount}
          fee={0}
          sidechain="Bitcoin"
          transactionType="sidechain_address_add"
        />
      </Form.Provider>
    </>
  );
};
