import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { CardFormButton, Form } from "../../../ui/src";
import { FormDisclamer } from "../FormDisclamer";
import { PasswordModal } from "../PasswordModal";

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
  const { visible, onCancel, onFormFinish, confirm, status } =
    useGenerateBitcoinAddress(getSidechainAccounts);

  return (
    <>
      <Form.Provider onFormFinish={onFormFinish}>
        <Styled.DepositForm name="generateAddressForm" onFinish={confirm}>
          <Form.Item>
            {isLoggedIn ? (
              <CardFormButton type="primary" htmlType="submit">
                Generate Bitcoin Address
              </CardFormButton>
            ) : (
              <CardFormButton
                type="primary"
                htmlType="button"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Log in & Generate Bitcoin Address
              </CardFormButton>
            )}
          </Form.Item>
        </Styled.DepositForm>
        {status === "" ? (
          ""
        ) : (
          <FormDisclamer>
            <Styled.SonError>{status}</Styled.SonError>
          </FormDisclamer>
        )}
        {isLoggedIn ? (
          ""
        ) : (
          <FormDisclamer>
            <span>Don't have a Peerplays account? </span>
            <Link href="/signup">
              <a>Create account</a>
            </Link>
          </FormDisclamer>
        )}
        <PasswordModal visible={visible} onCancel={onCancel} />
      </Form.Provider>
    </>
  );
};
