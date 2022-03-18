import { useUserContext } from "..";
import HIVEIcon from "../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";

import * as Styled from "./HIVEAndHBDDeposit.styled";

type Props = {
  assetSymbol: string;
};

export const HIVEAndHBDDeposit = ({
  assetSymbol = "HIVE",
}: Props): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  return (
    <>
      <Styled.Container>
        <Styled.LogoContainer>
          <HIVEIcon width="20px" height="20px" />
        </Styled.LogoContainer>
        <span>
          {`To deposit ${assetSymbol} to `}
          <Styled.AccountContainer>{`${localStorageAccount} `}</Styled.AccountContainer>
          please send your funds to son-account on the Hive blockchain with the
          memo
          <Styled.AccountContainer>{` ${localStorageAccount}`}</Styled.AccountContainer>
        </span>
      </Styled.Container>
    </>
  );
};
