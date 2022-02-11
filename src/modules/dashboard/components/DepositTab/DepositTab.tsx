import Link from "next/link";
import React from "react";

// import { useSidechainAccounts } from "../../components/DepositTab/hooks/useSidechainAccounts";
// import BitcoinIcon from "./icons/BitcoinIcon.svg";
import * as Styled from "./DepositTab.styled";

export const DepositTab = (): JSX.Element => {
  return (
    <Styled.DepositFormContainer>
      <Styled.DepositForm>
        <Styled.DepositFormItemSelect>
          <Styled.DepositFormSelect>
            <Styled.DepositFormOption value="BTC">
              Bitcoin BTC
            </Styled.DepositFormOption>
          </Styled.DepositFormSelect>
        </Styled.DepositFormItemSelect>
        <Styled.DepositForm.Item>
          <Styled.DepositFormBotton htmlType="submit">
            Log in & Generate Bitcoin Address
          </Styled.DepositFormBotton>
          <Styled.DepositFormFooter>
            <Styled.DepositFormFooterSpan>
              Don't have a Peerplays account?{" "}
            </Styled.DepositFormFooterSpan>
            <Link href="/signup">
              <Styled.DepositFormFooterA>
                Create account
              </Styled.DepositFormFooterA>
            </Link>
          </Styled.DepositFormFooter>
        </Styled.DepositForm.Item>
      </Styled.DepositForm>
    </Styled.DepositFormContainer>
  );
};
