import counterpart from "counterpart";

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
        <p>
          {counterpart.translate(
            `pages.voting.gpos.powerDown.power_down_description`
          )}
        </p>
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
              `pages.voting.gpos.powerDown.power_down_lists.fifth`
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
