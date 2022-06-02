import counterpart from "counterpart";
import { capitalize } from "lodash";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Layout } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { VoteType } from "../../../../common/types";
import { Button, DownOutlined, Menu, Tabs } from "../../../../ui/src";
import { GPOSTab, ProxyTab, VoteTab } from "../../components";
import { useVoting } from "../../hooks";

import * as Styled from "./VotingPage.styled";
import { useVotingPageMeta } from "./hooks";

const { TabPane } = Tabs;

const VotingPage: NextPage = () => {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const voteTabs: VoteType[] = [
    counterpart.translate(`pages.voting.lower_case_witnesses`),
    counterpart.translate(`pages.voting.lower_case_sons`),
    counterpart.translate(`pages.voting.lower_case_committees`),
  ];
  const voteIdentifiers = [1, 3, 0];
  const { tab } = router.query;
  const { pageMeta } = useVotingPageMeta(tab as string);
  const { sm } = useViewportContext();
  const {
    loading,
    serverApprovedVotes,
    allMembers,
    fullAccount,
    allMembersIds,
    totalGpos,
    proxy,
    getVotes,
    getProxyAccount,
  } = useVoting();
  const dropdowItems = [
    { label: counterpart.translate(`pages.voting.gpos.heading`), key: "gpos" },
    {
      label: counterpart.translate(`pages.voting.witnesses.heading`),
      key: "witnesses",
    },
    { label: counterpart.translate(`pages.voting.sons.heading`), key: "sons" },
    {
      label: counterpart.translate(`pages.voting.committees.heading`),
      key: "committees",
    },
    {
      label: counterpart.translate(`pages.voting.proxy.heading`),
      key: "proxy",
    },
  ];
  const renderTabBar = (props: any, DefaultTabBar: any) => (
    <>
      {sm ? (
        <Styled.MobileDropdownWrapper>
          <Styled.MobileDropdown
            visible={visible}
            overlay={
              <Styled.MobileTabsWrapper>
                <Menu
                  onSelect={(item: any) => {
                    props.onTabClick(item.key);
                  }}
                  items={dropdowItems}
                />
              </Styled.MobileTabsWrapper>
            }
          >
            <Button type="text" onClick={() => setVisible(!visible)}>
              {tab ? tab : "gpos"} <DownOutlined />
            </Button>
          </Styled.MobileDropdown>
        </Styled.MobileDropdownWrapper>
      ) : (
        <DefaultTabBar {...props}>{(node: any) => <>{node}</>}</DefaultTabBar>
      )}
    </>
  );

  return (
    <Layout
      title={`${pageMeta.title}`}
      type="card-lrg"
      heading={`${pageMeta.heading}`}
      description={`${pageMeta.description}`}
      dexLayout={true}
    >
      <Styled.VotingPageCard>
        <Tabs
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "gpos"}`}
          onTabClick={(key) => {
            router.push(`/voting?tab=${key}`);
            if (sm) setVisible(false);
          }}
        >
          <TabPane
            tab={counterpart.translate(`pages.voting.gpos.heading`)}
            key="gpos"
          >
            <GPOSTab />
          </TabPane>
          {voteTabs.map((voteTab, index) => {
            return (
              <TabPane tab={capitalize(voteTab)} key={voteTab}>
                <VoteTab
                  tab={voteTab}
                  serverApprovedVotes={serverApprovedVotes.filter(
                    (approvedVote) =>
                      parseInt(approvedVote.vote_id.split(":")[0]) ===
                      voteIdentifiers[index]
                  )}
                  allMembers={allMembers.filter(
                    (member) =>
                      parseInt(member.vote_id.split(":")[0]) ===
                      voteIdentifiers[index]
                  )}
                  fullAccount={fullAccount}
                  getVotes={getVotes}
                  allMembersIds={allMembersIds}
                  votesLoading={loading}
                  totalGpos={totalGpos}
                  proxy={proxy}
                />
              </TabPane>
            );
          })}
          <TabPane
            tab={counterpart.translate(`pages.voting.proxy.heading`)}
            key="proxy"
          >
            <ProxyTab
              serverProxy={proxy}
              totalGpos={totalGpos}
              getProxyAccount={getProxyAccount}
              loading={loading}
            />
          </TabPane>
        </Tabs>
      </Styled.VotingPageCard>
    </Layout>
  );
};
export default VotingPage;
