import { Tabs } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../../../common/components/PageLayout";
import { AssetsTab, BlockchainTab } from "../../components";

import * as Styled from "./Blockchain.styled";
import { useBlockchainPage } from "./hooks";

const { TabPane } = Tabs;

const Blockchain: NextPage = () => {
  const router = useRouter();
  const { tab } = router.query;
  const { pageMeta, onTabClick } = useBlockchainPage(tab);
  return (
    <Layout
      title={`${pageMeta.title}`}
      type="card-lrg"
      heading={`${pageMeta.heading}`}
      description={`${pageMeta.description}`}
      dexLayout={true}
    >
      <Styled.BlockchainCard>
        <Tabs
          defaultActiveKey={`${tab ? tab : "blockchain"}`}
          onTabClick={onTabClick}
        >
          <TabPane tab="Blockchain" key="blockchain">
            <BlockchainTab />
          </TabPane>
          <TabPane tab="Assets" key="assets">
            <AssetsTab />
          </TabPane>
          <TabPane tab="Witnesses" key="witnesses"></TabPane>
          <TabPane tab="Committe" key="committe"></TabPane>
          <TabPane tab="Fees" key="fees"></TabPane>
        </Tabs>
      </Styled.BlockchainCard>
    </Layout>
  );
};

export default Blockchain;
