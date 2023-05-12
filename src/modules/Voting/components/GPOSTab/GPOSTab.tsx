import { green, red, yellow } from "@ant-design/colors";
import counterpart from "counterpart";
import { useRouter } from "next/router";

import { defaultToken } from "../../../../api/params";
import { LoadingIndicator } from "../../../../common/components";
import { GPOSInfo } from "../../../../common/hooks";
import { useViewportContext } from "../../../../common/providers";

import * as Styled from "./GPOSTab.styled";
import { useGPOSTab } from "./hooks";

type Props = {
  gposInfo: GPOSInfo;
  loading: boolean;
};

export const GPOSTab = ({ gposInfo, loading }: Props): JSX.Element => {
  const router = useRouter();

  const { readMore, setReadMore } = useGPOSTab();
  const { sm } = useViewportContext();
  const ReadMoreBlock = (
    <>
      <p>{counterpart.translate(`pages.voting.gpos.gpos_description`)}</p>
      <p>{counterpart.translate(`pages.voting.gpos.rewards_label`)}</p>
      <ul>
        <li>
          {counterpart.translate(`pages.voting.gpos.rewards_way_first`, {
            defaultToken: defaultToken,
          })}
        </li>
        <li>{counterpart.translate(`pages.voting.gpos.rewards_way_second`)}</li>
      </ul>
      <p>
        {counterpart.translate(
          `pages.voting.gpos.decentralized_autonomous_cooperative`
        )}
      </p>
    </>
  );

  return (
    <Styled.GPOSTabWrapper>
      <Styled.GPOSIntro>
        <p>
          {counterpart.translate(`pages.voting.gpos.join_gpos`, {
            defaultToken: defaultToken,
          })}
        </p>
        <p>
          {counterpart.translate(`pages.voting.gpos.consistently_participate`)}
        </p>
        {sm ? (
          <>
            {readMore ? <>{ReadMoreBlock}</> : ""}
            {readMore ? (
              <a onClick={() => setReadMore(!readMore)}>
                {counterpart.translate(`pages.voting.gpos.read_less`)}
              </a>
            ) : (
              <a onClick={() => setReadMore(!readMore)}>
                {counterpart.translate(`pages.voting.gpos.read_more`)}
              </a>
            )}
          </>
        ) : (
          <>{ReadMoreBlock}</>
        )}
      </Styled.GPOSIntro>
      <Styled.GPOSContentWrapper>
        <Styled.GPOSContent>
          <Styled.GPOSDetails>
            <ul>
              <li>
                <Styled.GPOSDetailsTitle>
                  {counterpart.translate(`pages.voting.gpos.gpos_balance`)}
                </Styled.GPOSDetailsTitle>
                <Styled.GPOSDetailsValue>
                  {gposInfo.gposBalance} {gposInfo.symbol}
                </Styled.GPOSDetailsValue>
              </li>
              <li>
                <Styled.GPOSDetailsTitle>
                  {counterpart.translate(
                    `pages.voting.gpos.voting_performance`
                  )}
                </Styled.GPOSDetailsTitle>
                <Styled.GPOSDetailsValue
                  className={gposInfo.performance
                    .replace(" ", "-")
                    .toLowerCase()}
                >
                  {!loading ? (
                    `${counterpart.translate(
                      `pages.voting.gpos.performance_string.${gposInfo.performance
                        .replace(" ", "_")
                        .toLowerCase()}`
                    )}`
                  ) : (
                    <LoadingIndicator type="circle-small" />
                  )}
                </Styled.GPOSDetailsValue>
              </li>
              <li>
                <Styled.GPOSDetailsTitle>
                  {counterpart.translate(`pages.voting.gpos.qualified_reward`)}
                </Styled.GPOSDetailsTitle>
                <Styled.GPOSDetailsValue>
                  {gposInfo.qualifiedReward} %
                </Styled.GPOSDetailsValue>
              </li>
              <li style={{ alignItems: "baseline" }}>
                <Styled.GPOSDetailsTitle>
                  {counterpart.translate(
                    `pages.voting.gpos.estimated_participation_reward`
                  )}
                </Styled.GPOSDetailsTitle>

                <Styled.GPOSProgressBar
                  percent={gposInfo.rakeReward}
                  steps={6}
                  strokeColor={[
                    red[5],
                    red[5],
                    yellow[5],
                    yellow[5],
                    green[5],
                    green[6],
                  ]}
                />
              </li>
            </ul>
          </Styled.GPOSDetails>
          <Styled.GPOSTotal>
            <Styled.GPOSTotalTitle>
              {counterpart.translate(`pages.voting.gpos.available_balance`)}
            </Styled.GPOSTotalTitle>
            <Styled.GPOSTotalValue>
              <span>{gposInfo.availableBalance}</span>
              <span>{gposInfo.symbol}</span>
            </Styled.GPOSTotalValue>
          </Styled.GPOSTotal>
        </Styled.GPOSContent>
        <Styled.GPOSActions>
          <Styled.GPOSButton
            type="primary"
            onClick={() => router.push(`/gpos?tab=power-up`)}
          >
            {counterpart.translate(`buttons.power_up`)}
          </Styled.GPOSButton>
          <Styled.GPOSButton
            type="primary"
            onClick={() => router.push(`/gpos?tab=power-down`)}
          >
            {counterpart.translate(`buttons.power_down`)}
          </Styled.GPOSButton>
          <Styled.GPOSButton
            type="primary"
            onClick={() => router.push(`/voting?tab=witnesses`)}
          >
            {counterpart.translate(`buttons.vote`)}
          </Styled.GPOSButton>
        </Styled.GPOSActions>
      </Styled.GPOSContentWrapper>
    </Styled.GPOSTabWrapper>
  );
};
