import counterpart from "counterpart";
import { useRouter } from "next/router";

import { defaultToken } from "../../../../api/params";
import { useViewportContext } from "../../../../common/providers";

import * as Styled from "./GPOSTab.styled";
import { useGPOSTab } from "./hooks";

export const GPOSTab = (): JSX.Element => {
  const router = useRouter();

  const { GPOSInfo, readMore, setReadMore } = useGPOSTab();
  const { sm } = useViewportContext();
  const ReadMoreBlock = (
    <>
      <p>{counterpart.translate(`pages.voting.gpos.gpos_descriptions`)}</p>
      <p>{counterpart.translate(`pages.voting.gpos.rewards_label`)}</p>
      <ul>
        <li>{counterpart.translate(`pages.voting.gpos.rewards_way_first`)}</li>
        <li>{counterpart.translate(`pages.voting.gpos.rewards_way_second`)}</li>
        <li>{`1. Transfer more ${defaultToken} into your GPOS balance`}</li>
        <li>2. Share Peerplays with others</li>
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
        <p>{counterpart.translate(`pages.voting.gpos.join_gpos`)}</p>
        <p>{`Join GPOS by transferring your ${defaultToken} to your GPOS balance.`}</p>
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
                  {GPOSInfo.gposBalance} {GPOSInfo.symbol}
                </Styled.GPOSDetailsValue>
              </li>
              <li>
                <Styled.GPOSDetailsTitle>
                  {counterpart.translate(
                    `pages.voting.gpos.voting_performance`
                  )}
                </Styled.GPOSDetailsTitle>
                <Styled.GPOSDetailsValue
                  className={GPOSInfo.performance
                    .replace(" ", "-")
                    .toLowerCase()}
                >
                  {GPOSInfo.performance}
                </Styled.GPOSDetailsValue>
              </li>
              <li>
                <Styled.GPOSDetailsTitle>
                  {counterpart.translate(`pages.voting.gpos.qualified_reward`)}{" "}
                  %
                </Styled.GPOSDetailsTitle>
                <Styled.GPOSDetailsValue>
                  {GPOSInfo.qualifiedReward} %
                </Styled.GPOSDetailsValue>
              </li>
              <li>
                <Styled.GPOSDetailsTitle>
                  {counterpart.translate(
                    `pages.voting.gpos.estimated_rake_reward`
                  )}{" "}
                  %
                </Styled.GPOSDetailsTitle>
                <Styled.GPOSDetailsValue>
                  {GPOSInfo.rakeReward} %
                </Styled.GPOSDetailsValue>
              </li>
            </ul>
          </Styled.GPOSDetails>
          <Styled.GPOSTotal>
            <Styled.GPOSTotalTitle>
              {counterpart.translate(`pages.voting.gpos.available_balance`)}
            </Styled.GPOSTotalTitle>
            <Styled.GPOSTotalValue>
              <span>{GPOSInfo.availableBalance}</span>
              <span>{GPOSInfo.symbol}</span>
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
