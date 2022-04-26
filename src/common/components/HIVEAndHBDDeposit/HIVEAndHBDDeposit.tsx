import Link from "next/link";
import { useRouter } from "next/router";

import HIVEIcon from "../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import { useUserContext } from "../../providers";

import * as Styled from "./HIVEAndHBDDeposit.styled";

type Props = {
  assetSymbol: string;
};

export const HIVEAndHBDDeposit = ({
  assetSymbol = "HIVE",
}: Props): JSX.Element => {
  const router = useRouter();
  const { localStorageAccount } = useUserContext();
  return (
    <>
      {localStorageAccount && localStorageAccount !== "" ? (
        <Styled.Container>
          <Styled.LogoContainer>
            <HIVEIcon width="20px" height="20px" />
          </Styled.LogoContainer>
          <Styled.DepositInstruction>
            {`To deposit ${assetSymbol} to `}
            <Styled.AccountContainer>{`${localStorageAccount} `}</Styled.AccountContainer>
            please send your funds to son-account on the Hive blockchain with
            the memo
            <Styled.AccountContainer>{` ${localStorageAccount}`}</Styled.AccountContainer>
          </Styled.DepositInstruction>
        </Styled.Container>
      ) : (
        <Styled.LoginContainer>
          <Styled.Button
            type="primary"
            htmlType="button"
            onClick={() => {
              router.push("/login");
            }}
          >
            {`Log in & Deposit ${assetSymbol}`}
          </Styled.Button>

          <Styled.FormDisclamer>
            <span>Don't have a Peerplays account? </span>
            <Link href="/signup">
              <a>Create account</a>
            </Link>
          </Styled.FormDisclamer>
        </Styled.LoginContainer>
      )}
    </>
  );
};
