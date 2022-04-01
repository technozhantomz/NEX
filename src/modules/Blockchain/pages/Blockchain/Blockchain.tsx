import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../../../common/components";
import { Tabs } from "../../../../ui/src";
import {
  AssetsTab,
  BlockchainTab,
  BlockDetails,
  CommitteeTab,
  WitnessesTab,
} from "../../components";

import * as Styled from "./Blockchain.styled";
import { useBlockchainPage } from "./hooks";

const { TabPane } = Tabs;

const Blockchain: NextPage = () => {
  const router = useRouter();
  const { blockNumber, tab } = router.query;
  const { pageMeta } = useBlockchainPage(tab as string);
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
          <TabPane tab="Assets" key="assets">
            <AssetsTab />
          </TabPane>
          <TabPane tab="Witnesses" key="witnesses">
            <WitnessesTab />
          </TabPane>
          <TabPane tab="Committee" key="committee">
            <CommitteeTab />
          </TabPane>
          <TabPane tab="Fees" key="fees"></TabPane>
        </Tabs>
      </Styled.BlockchainCard>
    </Layout>
  );
};

export default Blockchain;
