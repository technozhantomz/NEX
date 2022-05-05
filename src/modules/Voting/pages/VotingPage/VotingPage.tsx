import { capitalize } from "lodash";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { Layout } from "../../../../common/components";
import { Tabs } from "../../../../ui/src";
import { VoteTab } from "../../components";
import { useVoting } from "../../hooks";

import * as Styled from "./VotingPage.styled";

const { TabPane } = Tabs;

const VotingPage: NextPage = () => {
  const {
    loading,
    isVotesChanged,
    voteSearchValue,
    allMembersVotes,
    localApprovedVotes,
    isPassModalVisible,
    submittingPassword,
    approveVote,
    removeVote,
    handleVoteSearch,
    resetChanges,
    confirm,
    publishChanges,
    setIsPassModalVisible,
  } = useVoting();
  const router = useRouter();
  const { tab } = router.query;
  const voteTabs: ("witnesses" | "sons" | "committees")[] = [
    "witnesses",
    "sons",
    "committees",
  ];

  return (
    <Layout
      title="Voting"
      type="card-lrg"
      heading="Voting"
      description="Voting Page"
      dexLayout={true}
    >
      <Styled.VotingPageCard>
        <Tabs
          defaultActiveKey={`${tab ? tab : "gpos"}`}
          onTabClick={(key) => {
            handleVoteSearch("");
            router.push(`/voting?tab=${key}`);
          }}
        >
          <TabPane tab="GPOS" key="gpos">
            <Styled.Text>GPOS Tab</Styled.Text>
          </TabPane>
          {voteTabs.map((voteTab) => (
            <TabPane tab={capitalize(voteTab)} key={voteTab}>
              <VoteTab
                tab={voteTab}
                localApprovedVotes={
                  voteSearchValue === ""
                    ? localApprovedVotes.filter((vote) => vote.type === voteTab)
                    : localApprovedVotes
                        .filter((vote) => vote.type === voteTab)
                        .filter((approvedVote) =>
                          approvedVote.name
                            .toLowerCase()
                            .startsWith(voteSearchValue.toLowerCase())
                        )
                }
                localNotApprovedVotes={
                  voteSearchValue === ""
                    ? allMembersVotes
                        .filter((vote) => vote.type === voteTab)
                        .filter(
                          (vote) =>
                            !localApprovedVotes
                              .map((approvedVote) => approvedVote.id)
                              .includes(vote.id)
                        )
                    : allMembersVotes
                        .filter((vote) => vote.type === voteTab)
                        .filter(
                          (vote) =>
                            !localApprovedVotes
                              .map((approvedVote) => approvedVote.id)
                              .includes(vote.id)
                        )
                        .filter((notApprovedVote) =>
                          notApprovedVote.name
                            .toLowerCase()
                            .startsWith(voteSearchValue.toLowerCase())
                        )
                }
                loading={loading}
                isVotesChanged={isVotesChanged}
                isPassModalVisible={isPassModalVisible}
                submittingPassword={submittingPassword}
                approveVote={approveVote}
                removeVote={removeVote}
                handleVoteSearch={handleVoteSearch}
                resetChanges={resetChanges}
                confirm={confirm}
                publishChanges={publishChanges}
                setIsPassModalVisible={setIsPassModalVisible}
              />
            </TabPane>
          ))}

          <TabPane tab="Proxy" key="proxy">
            <Styled.Text>Proxy Tab</Styled.Text>
          </TabPane>
        </Tabs>
      </Styled.VotingPageCard>
    </Layout>
  );
};
export default VotingPage;
