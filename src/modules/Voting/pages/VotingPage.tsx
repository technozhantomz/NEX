import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../../common/components";
import { Tabs } from "../../../ui/src";
import { GPOSTab } from "../components";

import * as Styled from "./VotingPage.styled";
import { useVotingPage } from "./hooks";

const { TabPane } = Tabs;

const VotingPage: NextPage = () => {
  const router = useRouter();
  const { tab } = router.query;
  const { pageMeta } = useVotingPage(tab as string);
  return (
    <Layout
      title={`${pageMeta.title}`}
      type="card-lrg"
      heading={`${pageMeta.heading}`}
      description={`${pageMeta.description}`}
      dexLayout={true}
    >
      <Styled.VotingCard>
        <Tabs
          defaultActiveKey={`${tab ? tab : "gpos"}`}
          onTabClick={(key) => {
            router.push(`/voting?tab=${key}`);
          }}
        >
          <TabPane tab="GPOS" key="gpos">
            <GPOSTab />
          </TabPane>
          <TabPane tab="Witness" key="witness">
            <p>witness</p>
          </TabPane>
          <TabPane tab="sons" key="SONs">
            <p>sons</p>
          </TabPane>
          <TabPane tab="Advisors" key="advisors">
            <p>advisors</p>
          </TabPane>
          <TabPane tab="Proxy" key="proxy">
            <p>proxy</p>
          </TabPane>
        </Tabs>
      </Styled.VotingCard>
    </Layout>
  );
};

export default VotingPage;
