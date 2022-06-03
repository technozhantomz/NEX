import { GPOSBalances } from "../../types";

import * as Styled from "./PowerUpTab.Styled";
import { PowerUpForm } from "./components";

type Props = {
  gposBalances: GPOSBalances | undefined;
  loading: boolean;
  getGposInfo: () => Promise<void>;
  defaultAsset: any;
};

export const PowerUpTab = ({
  gposBalances,
  loading,
  getGposInfo,
  defaultAsset,
}: Props): JSX.Element => {
  return (
    <Styled.PowerUpTabWrapper>
      <Styled.PowerUpTabIntro>
        <p>
          {`When you Power Up your ${defaultAsset?.symbol} on the Peerplays blockchain you are taking
            your first steps into participating in the Decentralized Autonomous
            Cooperative (DAC) that is the magic in blockchain tech. This means you
            will:`}
        </p>
        <ul>
          <li>Become a big part of something special on a global scale</li>
          <li>Earn participation rewards for your efforts</li>
          <li>Bragging rights to family and friends</li>
          <li>{`Stake your ${defaultAsset?.symbol} while you participate`}</li>
          <li>Help secure the Peerplays blockchain</li>
        </ul>
      </Styled.PowerUpTabIntro>
      <Styled.PowerUpTabFormWrapper>
        <PowerUpForm
          gposBalances={gposBalances}
          loading={loading}
          getGposInfo={getGposInfo}
        />
      </Styled.PowerUpTabFormWrapper>
    </Styled.PowerUpTabWrapper>
  );
};
