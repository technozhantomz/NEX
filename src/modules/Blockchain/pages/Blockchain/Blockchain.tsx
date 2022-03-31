import type { NextPage } from "next";

import { Layout } from "../../../../common/components/PageLayout";
import { Tabs } from "../../../../ui/src";
import { BlockchainTab } from "../../components";

import * as Styled from "./Blockchain.styled";

const { TabPane } = Tabs;

const Blockchain: NextPage = () => {
  return (
    <Layout
      title="Blockchain"
      type="card-lrg"
      heading="PeerPlays Blockchain"
      description={`Blockchain | `}
      dexLayout={true}
    >
      <Styled.BlockchainCard>
        <Tabs>
          <TabPane tab="Blockchain" key="blockchain">
            <BlockchainTab />
          </TabPane>
          <TabPane tab="Assets" key="assets"></TabPane>
          <TabPane tab="Witnesses" key="witnesses"></TabPane>
          <TabPane tab="Committe" key="committe"></TabPane>
          <TabPane tab="Fees" key="fees"></TabPane>
        </Tabs>
      </Styled.BlockchainCard>
    </Layout>
  );
};

export default Blockchain;
