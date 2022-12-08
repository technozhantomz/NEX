import counterpart from "counterpart";
import { capitalize } from "lodash";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Layout } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { VoteType } from "../../../../common/types";
import {
  Button,
  DownOutlined,
  Menu,
  Tabs,
  UpOutlined,
} from "../../../../ui/src";
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
  const { sm } = useViewportContext();
  const {
    loadingMembers,
    loadingUserVotes,
    allMembers,
    allMembersIds,
    fullAccount,
    proxy,
    totalGpos,
    getUserVotes,
    serverApprovedVotesIds,
  } = useVoting();
  const dropdowItems = [
    { label: counterpart.translate(`pages.voting.gpos.tab`), key: "gpos" },
    {
      label: counterpart.translate(`pages.voting.witnesses.tab`),
      key: "witnesses",
    },
    { label: counterpart.translate(`pages.voting.sons.tab`), key: "sons" },
    {
      label: counterpart.translate(`pages.voting.committees.tab`),
      key: "committees",
    },
    {
      label: counterpart.translate(`pages.voting.proxy.tab`),
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
                  onClick={(item: any) => {
                    props.onTabClick(item.key);
                  }}
                  items={dropdowItems}
                  selectedKeys={tab ? [tab as string] : ["gpos"]}
                />
              </Styled.MobileTabsWrapper>
            }
          >
            <Button type="text" onClick={() => setVisible(!visible)}>
              {tab
                ? counterpart.translate(`pages.voting.${tab}.tab`)
                : counterpart.translate(`pages.voting.gpos.tab`)}{" "}
              {!visible ? <DownOutlined /> : <UpOutlined />}
            </Button>
          </Styled.MobileDropdown>
        </Styled.MobileDropdownWrapper>
      ) : (
        <DefaultTabBar {...props}>{(node: any) => <>{node}</>}</DefaultTabBar>
      )}
    </>
  );
  const tabItems = [
    {
      label: counterpart.translate(`pages.voting.gpos.tab`),
      key: "gpos",
      children: <GPOSTab />,
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
            votesLoading={loadingMembers || loadingUserVotes}
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
            totalGpos={totalGpos}
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
          totalGpos={totalGpos}
          getUserVotes={getUserVotes}
          loading={loadingMembers || loadingUserVotes}
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
      dexLayout={true}
      onClick={() => {
        if (sm) {
          visible && setVisible(false);
        }
      }}
    >
      <Styled.VotingPageCard>
        <Tabs
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "gpos"}`}
          onTabClick={(key) => {
            router.push(`/voting?tab=${key}`);
            if (sm) setVisible(false);
          }}
          items={tabItems}
        />
      </Styled.VotingPageCard>
    </Layout>
  );
};
export default VotingPage;
