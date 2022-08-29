import counterpart from "counterpart";
import Link from "next/link";
import { useRouter } from "next/router";

import HIVEIcon from "../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import { useUserContext } from "../../providers";

import * as Styled from "./HIVEAndHBDDeposit.styled";
import { HIVEAndHBDDepositInfo } from "./components";

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
            <HIVEAndHBDDepositInfo
              infoString={counterpart.translate(`field.comments.deposit_hbd`, {
                assetSymbol: assetSymbol,
                accountName: `[userlink = ${localStorageAccount}]`,
              })}
            />
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
            {counterpart.translate(`buttons.log_in_deposit_hbd_hive`, {
              assetSymbol: assetSymbol,
            })}
          </Styled.Button>

          <Styled.FormDisclamer>
            <span>
              {counterpart.translate(`buttons.dont_have_peerplays_account`)}
            </span>
            <Link href="/signup">
              <a>{counterpart.translate(`links.create_account`)}</a>
            </Link>
          </Styled.FormDisclamer>
        </Styled.LoginContainer>
      )}
    </>
  );
};
