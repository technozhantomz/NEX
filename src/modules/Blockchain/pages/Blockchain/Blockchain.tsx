import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../../../common/components";
import { Tabs } from "../../../../ui/src";
import { BlockchainTab, BlockDetails } from "../../components";

import * as Styled from "./Blockchain.styled";

const { TabPane } = Tabs;

const Blockchain: NextPage = () => {
  const router = useRouter();
  const { blockNumber } = router.query;
  return (
    <Layout
      title="Blockchain"
      type="card-lrg"
      heading="PeerPlays Blockchain"
      description={`Blockchain | `}
      dexLayout={true}
    >
      <Styled.BlockchainCard>
        <Tabs
          onTabClick={(key) => {
            router.push(`/blockchain?tab=${key}`);
          }}
        >
          <TabPane tab="Blockchain" key="blockchain">
            {blockNumber ? (
              <BlockDetails block={blockNumber as string} />
            ) : (
              <BlockchainTab routerQuery={router.query} />
            )}
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
