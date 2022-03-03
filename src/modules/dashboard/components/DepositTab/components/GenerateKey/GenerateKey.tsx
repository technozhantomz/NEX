import { Form } from "antd";
import Link from "next/link";
import React from "react";

import { DashboardButton } from "../../../../../../common/components/DashboardButton/DashboardButton";
import { LogoSelectOption } from "../../../../../../common/components/LogoSelectOption/LogoSelectOption";
import PasswordModal from "../../../../../../common/components/PasswordModal/passwordModal";
import BitcoinIcon from "../../icons/BitcoinIcon.svg";

import * as Styled from "./GenerateKey.styled";
import { useGenerateAddress } from "./hooks/useGenerateAddress";

export const GenerateKey = (): JSX.Element => {
  const { visible, onCancel, onFormFinish, confirm, handleAssetChange } =
    useGenerateAddress();

  return (
    <>
      <Form.Provider onFormFinish={onFormFinish}>
        <Styled.DepositForm>
          <LogoSelectOption
            balance="1.0000"
            token={<BitcoinIcon width="30px" height="30px" />}
            amountCol={false}
            onChange={handleAssetChange}
          />
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
