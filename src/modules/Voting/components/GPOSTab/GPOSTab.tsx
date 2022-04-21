import { useState } from "react";

import { useViewportContext } from "../../../../common/providers";
import { breakpoints } from "../../../../ui/src/breakpoints";

import * as Styled from "./GPOSTab.styled";
import { useGPOSTab } from "./hooks";

export const GPOSTab = (): JSX.Element => {
  const [readMore, setReadMore] = useState<boolean>(false);
  const { GPOSInfo } = useGPOSTab();
  const { width } = useViewportContext();
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
        {width > breakpoints.sm ? (
          <>{ReadMoreBlock}</>
        ) : (
          <>
            {readMore ? <>{ReadMoreBlock}</> : ""}
            {readMore ? (
              <a onClick={() => setReadMore(!readMore)}>Read less</a>
            ) : (
              <a onClick={() => setReadMore(!readMore)}>Read More</a>
            )}
          </>
        )}
      </Styled.GPOSIntro>
      <Styled.GPOSContentWrapper>
        <Styled.GPOSContentInfo>
          <div>
            <ul>
              <li>
                <span>GPOS Balance</span>
                <span>{GPOSInfo.gposBalance}</span>
              </li>
              <li>
                <span>Voting Performance</span>
                <span>{GPOSInfo.performance}</span>
              </li>
              <li>
                <span>Qualified Reward %</span>
                <span>{GPOSInfo.qualifiedReward}</span>
              </li>
              <li>
                <span>Estimated Rake Reward %</span>
                <span>{GPOSInfo.rakeReward}</span>
              </li>
            </ul>
          </div>
          <div>
            <p>Available Balance:</p>
            <p>
              <span>{GPOSInfo.availableBalance}</span>
              <span>{GPOSInfo.symbol}</span>
            </p>
          </div>
        </Styled.GPOSContentInfo>
        <Styled.GPOSContentActions>
          <Styled.GPOSTButton type="primary">Power Up</Styled.GPOSTButton>
          <Styled.GPOSTButton type="primary">Power Down</Styled.GPOSTButton>
          <Styled.GPOSTButton type="primary">Vote</Styled.GPOSTButton>
          <Styled.GPOSTButton type="text">Cancel</Styled.GPOSTButton>
        </Styled.GPOSContentActions>
      </Styled.GPOSContentWrapper>
    </Styled.GPOSTabWrapper>
  );
};
