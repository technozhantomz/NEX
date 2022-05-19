import { useRouter } from "next/router";

import { useViewportContext } from "../../../../common/providers";

import * as Styled from "./GPOSTab.styled";
import { useGPOSTab } from "./hooks";

export const GPOSTab = (): JSX.Element => {
  const router = useRouter();

  const { GPOSInfo, readMore, setReadMore } = useGPOSTab();
  const { sm } = useViewportContext();
  const ReadMoreBlock = (
    <>
      <p>
        The more value that comes into Peerplays blockchain through its
        operations, the more those that participate to help make it secure will
        earn!
      </p>
      <p>
        If you want to increase your participation rewards you can do it two
        ways:
      </p>
      <ul>
        <li>1. Transfer more PPY into your GPOS balance</li>
        <li>2. Share Peerplays with others</li>
      </ul>
      <p>
        Together as a Decentralized Autonomous Cooperative (DAC), we can ensure
        Peerplays remains the most secure provably fair blockchain globally.
      </p>
    </>
  );

  return (
    <Styled.GPOSTabWrapper>
      <Styled.GPOSIntro>
        <p>Join GPOS by transferring your PPY to your GPOS balance.</p>
        <p>
          Consistently participate in voting for the best Witnesses, Advisors,
          Proposals, and SONs. Share the exciting news and DApps available on
          Peerplays with others.
        </p>
        {sm ? (
          <>
            {readMore ? <>{ReadMoreBlock}</> : ""}
            {readMore ? (
              <a onClick={() => setReadMore(!readMore)}>Read less</a>
            ) : (
              <a onClick={() => setReadMore(!readMore)}>Read More</a>
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
                <Styled.GPOSDetailsTitle>GPOS Balance</Styled.GPOSDetailsTitle>
                <Styled.GPOSDetailsValue>
                  {GPOSInfo.gposBalance} {GPOSInfo.symbol}
                </Styled.GPOSDetailsValue>
              </li>
              <li>
                <Styled.GPOSDetailsTitle>
                  Voting Performance
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
                  Qualified Reward %
                </Styled.GPOSDetailsTitle>
                <Styled.GPOSDetailsValue>
                  {GPOSInfo.qualifiedReward} %
                </Styled.GPOSDetailsValue>
              </li>
              <li>
                <Styled.GPOSDetailsTitle>
                  Estimated Rake Reward %
                </Styled.GPOSDetailsTitle>
                <Styled.GPOSDetailsValue>
                  {GPOSInfo.rakeReward} %
                </Styled.GPOSDetailsValue>
              </li>
            </ul>
          </Styled.GPOSDetails>
          <Styled.GPOSTotal>
            <Styled.GPOSTotalTitle>Available Balance:</Styled.GPOSTotalTitle>
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
            Power Up
          </Styled.GPOSButton>
          <Styled.GPOSButton
            type="primary"
            onClick={() => router.push(`/gpos?tab=power-down`)}
          >
            Power Down
          </Styled.GPOSButton>
          <Styled.GPOSButton
            type="primary"
            onClick={() => router.push(`/voting?tab=witnesses`)}
          >
            Vote
          </Styled.GPOSButton>
        </Styled.GPOSActions>
      </Styled.GPOSContentWrapper>
    </Styled.GPOSTabWrapper>
  );
};
