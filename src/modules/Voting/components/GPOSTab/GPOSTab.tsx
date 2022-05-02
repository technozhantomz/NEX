import { useRouter } from "next/router";
import { useState } from "react";

import { useViewportContext } from "../../../../common/providers";

import * as Styled from "./GPOSTab.styled";
import { useGPOSTab } from "./hooks";

export const GPOSTab = (): JSX.Element => {
  const router = useRouter();
  const [readMore, setReadMore] = useState<boolean>(false);
  const { GPOSInfo } = useGPOSTab();
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
        <Styled.GPOSContentInfo>
          <Styled.GPOSContentInfoDetails>
            <ul>
              <li>
                <Styled.GPOSContentInfoDetailsTitle>
                  GPOS Balance
                </Styled.GPOSContentInfoDetailsTitle>
                <Styled.GPOSContentInfoDetailsValue>
                  {GPOSInfo.gposBalance} {GPOSInfo.symbol}
                </Styled.GPOSContentInfoDetailsValue>
              </li>
              <li>
                <Styled.GPOSContentInfoDetailsTitle>
                  Voting Performance
                </Styled.GPOSContentInfoDetailsTitle>
                <Styled.GPOSContentInfoDetailsValue
                  className={GPOSInfo.performance
                    .replace(" ", "-")
                    .toLowerCase()}
                >
                  {GPOSInfo.performance}
                </Styled.GPOSContentInfoDetailsValue>
              </li>
              <li>
                <Styled.GPOSContentInfoDetailsTitle>
                  Qualified Reward %
                </Styled.GPOSContentInfoDetailsTitle>
                <Styled.GPOSContentInfoDetailsValue>
                  {GPOSInfo.qualifiedReward} %
                </Styled.GPOSContentInfoDetailsValue>
              </li>
              <li>
                <Styled.GPOSContentInfoDetailsTitle>
                  Estimated Rake Reward %
                </Styled.GPOSContentInfoDetailsTitle>
                <Styled.GPOSContentInfoDetailsValue>
                  {GPOSInfo.rakeReward} %
                </Styled.GPOSContentInfoDetailsValue>
              </li>
            </ul>
          </Styled.GPOSContentInfoDetails>
          <Styled.GPOSContentInfoTotal>
            <Styled.GPOSContentInfoTotalTitle>
              Available Balance:
            </Styled.GPOSContentInfoTotalTitle>
            <Styled.GPOSContentInfoTotalValue>
              <span>{GPOSInfo.availableBalance}</span>
              <span>{GPOSInfo.symbol}</span>
            </Styled.GPOSContentInfoTotalValue>
          </Styled.GPOSContentInfoTotal>
        </Styled.GPOSContentInfo>
        <Styled.GPOSContentActions>
          <Styled.GPOSTButton
            type="primary"
            onClick={() => router.push(`/gpos?tab=power-up`)}
          >
            Power Up
          </Styled.GPOSTButton>
          <Styled.GPOSTButton
            type="primary"
            onClick={() => router.push(`/gpos?tab=power-down`)}
          >
            Power Down
          </Styled.GPOSTButton>
          <Styled.GPOSTButton
            type="primary"
            onClick={() => router.push(`/voting?tab=witness`)}
          >
            Vote
          </Styled.GPOSTButton>
          <Styled.GPOSTButton type="text">Cancel</Styled.GPOSTButton>
        </Styled.GPOSContentActions>
      </Styled.GPOSContentWrapper>
    </Styled.GPOSTabWrapper>
  );
};
