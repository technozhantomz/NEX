import { Tabs } from "antd";
import type { NextPage } from "next";
import React from "react";

import { Layout } from "../../../../common/components";
//import { VoteTab } from "../../components/VoteTab";

import * as Styled from "./VotingPage.styled";
import { useVoting } from "./hooks";

const { TabPane } = Tabs;

const VotingPage: NextPage = () => {
  const { allMembersVotes, serverApprovedVotes } = useVoting();
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
            {/* <VoteTab tab="Witnesses" /> */}
          </TabPane>
          <TabPane tab="SONs" key="sons">
            {/* <VoteTab tab="SONs" /> */}
          </TabPane>
          <TabPane tab="Advisors" key="advisors">
            {/* <VoteTab tab="Advisors" /> */}
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
