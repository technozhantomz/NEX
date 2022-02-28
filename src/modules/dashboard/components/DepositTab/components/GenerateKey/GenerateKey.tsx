import Link from "next/link";
import React from "react";

import { DashboardButton } from "../../../../../../common/components/DashboardButton/DashboardButton";

import * as Styled from "./GenerateKey.styled";
// import BitcoinIcon from "./icons/BitcoinIcon.svg";

export const GenerateKey = (): JSX.Element => {
  return (
    <>
      <Styled.DepositForm>
        <Styled.DepositFormItemSelect>
          <Styled.DepositFormSelect>
            <Styled.DepositFormOption value="BTC">
              Bitcoin BTC
            </Styled.DepositFormOption>
          </Styled.DepositFormSelect>
        </Styled.DepositFormItemSelect>
        <Styled.DepositForm.Item>
          <DashboardButton label="Log in & Generate Bitcoin Address" />
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
    </>
  );
};
