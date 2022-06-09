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
          {`When you Power Down it will take 30 days for you to withdraw your ${defaultToken} balance in full. You will continue to receive participation rewards
          during that time so long as you have been participating. After Power Down you can then use your ${defaultToken} like any other cryptocurrency. This means you will:`}
        </p>
        <ul>
          <li>Still be a part of something special, just not as much</li>
          <li>No longer helping secure the Peerplays blockchain</li>
          <li>No longer earn participation rewards</li>
          <li>Lose bragging rights</li>
          <li>{`Stop staking your ${defaultToken}`}</li>
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
