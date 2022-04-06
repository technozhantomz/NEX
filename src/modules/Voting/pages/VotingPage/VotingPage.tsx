import { Tabs } from "antd";
import type { NextPage } from "next";
import React from "react";

import { Layout } from "../../../../common/components";
import { VoteTab } from "../../components/VoteTab";

import * as Styled from "./VotingPage.styled";

const { TabPane } = Tabs;

const VotingPage: NextPage = () => {
  return (
    <Layout
      title="Voting"
      type="card-lrg"
      heading="Voting"
      description="Voting Page"
      dexLayout={true}
    >
      <Styled.VotingPageCard>
        <Tabs defaultActiveKey="1">
          <TabPane tab="GPOS" key="1">
            <Styled.Text>GPOS Tab</Styled.Text>
          </TabPane>
          <TabPane tab="Witnesses" key="2">
            <VoteTab tab="Witnesses" />
          </TabPane>
          <TabPane tab="SONs" key="3">
            <VoteTab tab="SONs" />
          </TabPane>
          <TabPane tab="Advisors" key="4">
            <VoteTab tab="Advisors" />
          </TabPane>
          <TabPane tab="Proxy" key="5">
            <Styled.Text>Proxy Tab</Styled.Text>
          </TabPane>
        </Tabs>
      </Styled.VotingPageCard>
    </Layout>
  );
};
export default VotingPage;
