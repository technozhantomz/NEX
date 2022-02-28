import Link from "next/link";
import React from "react";

import { DashboardButton } from "../../../../../../common/components/DashboardButton/DashboardButton";
import { LogoSelectOption } from "../../../../../../common/components/LogoSelectOption/LogoSelectOption";
import BitcoinIcon from "../../icons/BitcoinIcon.svg";

import * as Styled from "./GenerateKey.styled";

export const GenerateKey = (): JSX.Element => {
  return (
    <>
      <Styled.DepositForm>
        <LogoSelectOption
          balance="1.0000"
          token={<BitcoinIcon width="30px" height="30px" />}
          amountCol={false}
        />
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
