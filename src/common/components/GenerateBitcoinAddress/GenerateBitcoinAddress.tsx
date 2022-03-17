import { Form } from "antd";
import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import Link from "next/link";
import React from "react";

import { CardFormButton } from "../../../ui/src";
import { FormDisclamer } from "../FormDisclamer";
import { LogoSelectOption } from "../LogoSelectOption/LogoSelectOption";
import { PasswordModal } from "../PasswordModal";

import * as Styled from "./GenerateBitcoinAddress.styled";
import { useGenerateBitcoinAddress } from "./hooks";

type Props = {
  onAssetChange?:
    | ((
        value: unknown,
        option:
          | DefaultOptionType
          | BaseOptionType
          | (DefaultOptionType | BaseOptionType)[]
      ) => void)
    | undefined;
  hideDisclamer?: boolean;
  hideDefultToken?: boolean;
};

export const GenerateBitcoinAddress = ({
  onAssetChange,
  hideDisclamer = false,
  hideDefultToken = false,
}: Props): JSX.Element => {
  const { visible, onCancel, onFormFinish, confirm, defaultHandleAssetChange } =
    useGenerateBitcoinAddress();

  return (
    <>
      <Form.Provider onFormFinish={onFormFinish}>
        <Styled.DepositForm name="generateAddressForm" onFinish={confirm}>
          <Form.Item>
            <Styled.Row>
              <Styled.SelectOptionCol span={23}>
                <LogoSelectOption
                  defaultValue="BTC"
                  onChange={
                    onAssetChange ? onAssetChange : defaultHandleAssetChange
                  }
                  hideDefultToken={hideDefultToken}
                />
              </Styled.SelectOptionCol>
            </Styled.Row>
          </Form.Item>
          <Form.Item>
            <CardFormButton type="primary" htmlType="submit">
              {hideDisclamer
                ? "Generate Bitcoin Address"
                : "Log in & Generate Bitcoin Address"}
            </CardFormButton>
          </Form.Item>
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
