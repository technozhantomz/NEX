import counterpart from "counterpart";

import { defaultToken } from "../../../../api/params";
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
        <Styled.PowerUpTabIntroHeading>
          {counterpart.translate(
            `pages.voting.gpos.powerUp.power_up_description_heading`
          )}
        </Styled.PowerUpTabIntroHeading>
        <Styled.PowerUpTabIntroParagraph>
          {counterpart.translate(
            `pages.voting.gpos.powerUp.power_up_description`,
            {
              defaultToken: defaultToken,
            }
          )}
        </Styled.PowerUpTabIntroParagraph>
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
              `pages.voting.gpos.powerUp.power_up_lists.fourth`,
              {
                defaultToken: defaultToken,
              }
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
