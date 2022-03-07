import { Form } from "antd";
import Link from "next/link";
import React from "react";

import { DashboardButton } from "../../../../../../common/components/DashboardButton/DashboardButton";
import { LogoSelectOption } from "../../../../../../common/components/LogoSelectOption/LogoSelectOption";
import PasswordModal from "../../../../../../common/components/PasswordModal/passwordModal";

import * as Styled from "./GenerateKey.styled";
import { useGenerateAddress } from "./hooks/useGenerateAddress";

export const GenerateKey = (): JSX.Element => {
  const { visible, onCancel, onFormFinish, confirm, handleAssetChange } =
    useGenerateAddress();

  return (
    <>
      <Form.Provider onFormFinish={onFormFinish}>
        <Styled.DepositForm>
          <Form.Item>
            <Styled.Row>
              <Styled.SelectOptionCol span={23}>
                <LogoSelectOption
                  defaultValue="BTC"
                  onChange={handleAssetChange}
                />
              </Styled.SelectOptionCol>
            </Styled.Row>
          </Form.Item>
          <Styled.DepositForm.Item>
            <DashboardButton
              label="Log in & Generate Bitcoin Address"
              onClick={confirm}
            />
            <Styled.DepositFormFooter>
              <Styled.DepositFormFooterSpan>
                Don't have a Peerplays account?{" "}
              </Styled.DepositFormFooterSpan>
              <Link href="/signup" passHref={true}>
                <Styled.DepositFormFooterA>
                  Create account
                </Styled.DepositFormFooterA>
              </Link>
            </Styled.DepositFormFooter>
          </Styled.DepositForm.Item>
        </Styled.DepositForm>
        <PasswordModal visible={visible} onCancel={onCancel} />
      </Form.Provider>
    </>
  );
};
