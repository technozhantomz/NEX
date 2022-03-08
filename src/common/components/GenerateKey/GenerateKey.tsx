import { Form } from "antd";
import Link from "next/link";
import React from "react";

import { DashboardButton } from "../DashboardButton/DashboardButton";
import { FormDisclamer } from "../FormDisclamer";
import { LogoSelectOption } from "../LogoSelectOption/LogoSelectOption";
import { PasswordModal } from "../PasswordModal";

import * as Styled from "./GenerateKey.styled";
import { useGenerateAddress } from "./hooks/useGenerateAddress";

type Props = {
  hideDisclamer?: boolean;
};

export const GenerateKey = ({ hideDisclamer = false }: Props): JSX.Element => {
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
          </Styled.DepositForm.Item>
        </Styled.DepositForm>
        {hideDisclamer ? (
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
