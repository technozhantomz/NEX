import counterpart from "counterpart";

import { defaultToken } from "../../../../api/params";
import { GPOSBalances } from "../../types";

import * as Styled from "./PowerDownTab.styled";
import { PowerDownForm } from "./components";

type Props = {
  gposBalances: GPOSBalances | undefined;
  loading: boolean;
  getGposInfo: () => Promise<void>;
};

export const PowerDownTab = ({
  gposBalances,
  loading,
  getGposInfo,
}: Props): JSX.Element => {
  return (
    <Styled.PowerDownTabWrapper>
      <Styled.PowerDownTabIntro>
        <Styled.PowerDownTabIntroHeading>
          {counterpart.translate(
            `pages.voting.gpos.powerDown.power_down_description_heading`
          )}
        </Styled.PowerDownTabIntroHeading>
        <Styled.PowerDownTabIntroParagraph>
          {counterpart.translate(
            `pages.voting.gpos.powerDown.power_down_description`,
            {
              defaultToken: defaultToken,
            }
          )}
        </Styled.PowerDownTabIntroParagraph>
        <ul>
          <li>
            {counterpart.translate(
              `pages.voting.gpos.powerDown.power_down_lists.first`
            )}
          </li>
          <li>
            {counterpart.translate(
              `pages.voting.gpos.powerDown.power_down_lists.second`
            )}
          </li>
          <li>
            {counterpart.translate(
              `pages.voting.gpos.powerDown.power_down_lists.third`
            )}
          </li>
          <li>
            {counterpart.translate(
              `pages.voting.gpos.powerDown.power_down_lists.fourth`
            )}
          </li>
          <li>
            {counterpart.translate(
              `pages.voting.gpos.powerDown.power_down_lists.fifth`,
              {
                defaultToken: defaultToken,
              }
            )}
          </li>
        </ul>
      </Styled.PowerDownTabIntro>
      <Styled.PowerDownTabFormWrapper>
        <PowerDownForm
          gposBalances={gposBalances}
          loading={loading}
          getGposInfo={getGposInfo}
        />
      </Styled.PowerDownTabFormWrapper>
    </Styled.PowerDownTabWrapper>
  );
};
