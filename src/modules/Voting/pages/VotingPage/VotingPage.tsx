import counterpart from "counterpart";
import { capitalize } from "lodash";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Layout, MobileTabBar } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { VoteType } from "../../../../common/types";
import { PageTabs } from "../../../../ui/src";
import { GPOSTab, ProxyTab, VoteTab } from "../../components";
import { useVoting } from "../../hooks";

import * as Styled from "./VotingPage.styled";
import { useVotingPageMeta } from "./hooks";

const VotingPage: NextPage = () => {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const voteTabs: VoteType[] = ["witnesses", "sons", "committees"];
  const voteIdentifiers = [1, 3, 0];
  const { tab } = router.query;
  const { pageMeta } = useVotingPageMeta(tab as string);
  const { md } = useViewportContext();
  const {
    allMembers,
    allMembersIds,
    fullAccount,
    proxy,
    gposInfo,
    getUserVotes,
    serverApprovedVotesIds,
    voteTabLoaded,
    loadingUserVotes,
  } = useVoting();

  const renderTabBar = MobileTabBar({
    showMobileMenu: md,
    visible,
    tab,
    setVisible,
    defaultKey: "gpos",
    defaultTab: counterpart.translate(`pages.voting.gpos.tab`),
    selectedTab: counterpart.translate(`pages.voting.${tab}.tab`),
  });

  const tabItems = [
    {
      label: counterpart.translate(`pages.voting.gpos.tab`),
      key: "gpos",
      children: <GPOSTab loading={loadingUserVotes} gposInfo={gposInfo} />,
    },
    ...voteTabs.map((voteTab, index) => {
      return {
        label: capitalize(
          counterpart.translate(`pages.voting.lower_case_${voteTab}`)
        ),
        key: voteTab,
        children: (
          <VoteTab
            tab={voteTab}
            votesLoading={!voteTabLoaded}
            fullAccount={fullAccount}
            tabAllMembers={allMembers.filter(
              (member) =>
                parseInt(member.vote_id.split(":")[0]) ===
                voteIdentifiers[index]
            )}
            tabServerApprovedVotesIds={serverApprovedVotesIds.filter(
              (voteId) =>
                parseInt(voteId.split(":")[0]) === voteIdentifiers[index]
            )}
            allMembersIds={allMembersIds}
            getUserVotes={getUserVotes}
            totalGpos={gposInfo.gposBalance}
            proxy={proxy}
            key={voteTab}
          />
        ),
      };
    }),
    {
      label: counterpart.translate(`pages.voting.proxy.tab`),
      key: "proxy",
      children: (
        <ProxyTab
          serverProxy={proxy}
          totalGpos={gposInfo.gposBalance}
          getUserVotes={getUserVotes}
          loading={!voteTabLoaded}
        />
      ),
    },
  ];

  return (
    <Layout
      title={`${pageMeta.title}`}
      type="card-lrg"
      heading={`${pageMeta.heading}`}
      description={`${pageMeta.description}`}
      layout="dex"
      onClick={() => {
        if (md) {
          visible && setVisible(false);
        }
      }}
    >
      <Styled.VotingPageCard>
        <PageTabs
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "gpos"}`}
          onTabClick={(key) => {
            router.push(`/voting?tab=${key}`);
            if (md) setVisible(false);
          }}
          items={tabItems}
        />
      </Styled.VotingPageCard>
    </Layout>
  );
};
export default VotingPage;
