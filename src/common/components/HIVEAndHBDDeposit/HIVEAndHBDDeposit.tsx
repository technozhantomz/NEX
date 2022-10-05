import counterpart from "counterpart";

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
  const { localStorageAccount } = useUserContext();

  return (
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
  );
};
