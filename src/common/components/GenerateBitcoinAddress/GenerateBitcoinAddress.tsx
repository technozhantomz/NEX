import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Form } from "../../../ui/src";
import { PasswordModal } from "../PasswordModal";
import counterpart from "counterpart";

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
  const {
    isPasswordModalVisible,
    handlePasswordModalCancel,
    onFormFinish,
    confirm,
    status,
    submittingPassword,
  } = useGenerateBitcoinAddress(getSidechainAccounts);

  return (
    <>
      <Form.Provider onFormFinish={onFormFinish}>
        <Styled.DepositForm name="generateAddressForm" onFinish={confirm}>
          <Styled.FormItem>
            {isLoggedIn ? (
              <Styled.Button type="primary" htmlType="submit">
                {counterpart.translate(`transaction.buttons.generateBitcoinAddress`)}
              </Styled.Button>
            ) : (
              <Styled.Button
                type="primary"
                htmlType="button"
                onClick={() => {
                  router.push("/login");
                }}
              >
                {counterpart.translate(`transaction.buttons.loginAndGenerateBitcoinAddress`)}
              </Styled.Button>
            )}
          </Styled.FormItem>
        </Styled.DepositForm>
        {status === "" ? (
          ""
        ) : (
          <Styled.FormDisclamer>
            <Styled.SonError>{status}</Styled.SonError>
          </Styled.FormDisclamer>
        )}
        {isLoggedIn ? (
          ""
        ) : (
          <Styled.FormDisclamer>
              <span>{counterpart.translate(`transaction.buttons.dontHavePeerplaysAccount`)}</span>
            <Link href="/signup">
                <a>{counterpart.translate(`transaction.links.createAccount`)}</a>
            </Link>
          </Styled.FormDisclamer>
        )}
        <PasswordModal
          visible={isPasswordModalVisible}
          onCancel={handlePasswordModalCancel}
          submitting={submittingPassword}
        />
      </Form.Provider>
    </>
  );
};
