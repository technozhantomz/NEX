import counterpart from "counterpart";

import { GPOSBalances } from "../../types";

import * as Styled from "./PowerUpTab.Styled";
import { PowerUpForm } from "./components";

type Props = {
  gposBalances: GPOSBalances | undefined;
  loading: boolean;
  getGposInfo: () => Promise<void>;
};

export const PowerUpTab = ({
  gposBalances,
  loading,
  getGposInfo,
}: Props): JSX.Element => {
  return (
    <Styled.PowerUpTabWrapper>
      <Styled.PowerUpTabIntro>
        <p>
          {counterpart.translate(
            `pages.voting.gpos.powerUp.power_up_description`
          )}
        </p>
        <ul>
          <li>
            {counterpart.translate(
              `pages.voting.gpos.powerUp.power_up_lists.first`
            )}
          </li>
          <li>
            {counterpart.translate(
              `pages.voting.gpos.powerUp.power_up_lists.second`
            )}
          </li>
          <li>
            {counterpart.translate(
              `pages.voting.gpos.powerUp.power_up_lists.third`
            )}
          </li>
          <li>
            {counterpart.translate(
              `pages.voting.gpos.powerUp.power_up_lists.fourth`
            )}
          </li>
          <li>
            {counterpart.translate(
              `pages.voting.gpos.powerUp.power_up_lists.fifth`
            )}
          </li>
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
