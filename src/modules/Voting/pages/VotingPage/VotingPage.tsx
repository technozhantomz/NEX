import { Tabs } from "antd";
import type { NextPage } from "next";
import React from "react";

import { Layout } from "../../../../common/components";
import { VoteTab } from "../../components";
import { useVoting } from "../../hooks";

import * as Styled from "./VotingPage.styled";

const { TabPane } = Tabs;

const VotingPage: NextPage = () => {
  const { allMembersVotes, localApprovedVotes, loading } = useVoting();
  // console.log(serverApprovedVotes, "approved votes");
  // console.log(allMembersVotes, "all member votes");
  return (
    <Layout
      title="Voting"
      type="card-lrg"
      heading="Voting"
      description="Voting Page"
      dexLayout={true}
    >
      <Styled.VotingPageCard>
        <Tabs defaultActiveKey="gpos">
          <TabPane tab="GPOS" key="gpos">
            <Styled.Text>GPOS Tab</Styled.Text>
          </TabPane>
          <TabPane tab="Witnesses" key="witnesses">
            <VoteTab
              localApprovedVotes={localApprovedVotes.filter(
                (vote) => vote.type === "witnesses"
              )}
              localNotApprovedVotes={allMembersVotes
                .filter((vote) => vote.type === "witnesses")
                .filter(
                  (vote) =>
                    !localApprovedVotes
                      .map((approvedVote) => approvedVote.id)
                      .includes(vote.id)
                )}
              loading={loading}
            />
          </TabPane>
          <TabPane tab="SONs" key="sons">
            <VoteTab
              localApprovedVotes={localApprovedVotes.filter(
                (vote) => vote.type === "sons"
              )}
              localNotApprovedVotes={allMembersVotes
                .filter((vote) => vote.type === "sons")
                .filter(
                  (vote) =>
                    !localApprovedVotes
                      .map((approvedVote) => approvedVote.id)
                      .includes(vote.id)
                )}
              loading={loading}
            />
          </TabPane>
          <TabPane tab="Committeee" key="committee">
            <VoteTab
              localApprovedVotes={localApprovedVotes.filter(
                (vote) => vote.type === "committees"
              )}
              localNotApprovedVotes={allMembersVotes
                .filter((vote) => vote.type === "committees")
                .filter(
                  (vote) =>
                    !localApprovedVotes
                      .map((approvedVote) => approvedVote.id)
                      .includes(vote.id)
                )}
              loading={loading}
            />
          </TabPane>
          <TabPane tab="Proxy" key="proxy">
            <Styled.Text>Proxy Tab</Styled.Text>
          </TabPane>
        </Tabs>
      </Styled.VotingPageCard>
    </Layout>
  );
};
export default VotingPage;
