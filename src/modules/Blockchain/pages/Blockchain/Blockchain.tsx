import { Menu } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { Layout } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { Button, DownOutlined, Tabs } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";
import {
  AssetsTab,
  BlockchainTab,
  BlockDetails,
  CommitteeTab,
  FeesTab,
  WitnessesTab,
} from "../../components";

import * as Styled from "./Blockchain.styled";
import { useBlockchainPage } from "./hooks";

const { TabPane } = Tabs;

const Blockchain: NextPage = () => {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const { blockNumber, tab } = router.query;
  const { pageMeta } = useBlockchainPage(tab as string);
  const { width } = useViewportContext();
  const renderTabBar = (props: any, DefaultTabBar: any) => (
    <>
      {width > breakpoints.sm ? (
        <DefaultTabBar {...props}>{(node: any) => <>{node}</>}</DefaultTabBar>
      ) : (
        <Styled.MobileDropdownWrapper>
          <Styled.MobileDropdown
            visible={visible}
            overlay={
              <Styled.MobileTabsWrapper>
                <Menu>
                  <DefaultTabBar {...props}>
                    {(node: any) => (
                      <Menu.Item key={node.key}>{node}</Menu.Item>
                    )}
                  </DefaultTabBar>
                </Menu>
              </Styled.MobileTabsWrapper>
            }
          >
            <Button type="text" onClick={() => setVisible(!visible)}>
              {tab ? tab : "blockchain"} <DownOutlined />
            </Button>
          </Styled.MobileDropdown>
        </Styled.MobileDropdownWrapper>
      )}
    </>
  );
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
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "blockchain"}`}
          onTabClick={(key) => {
            router.push(`/blockchain?tab=${key}`);
            if (width < breakpoints.sm) setVisible(false);
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
          <TabPane tab="Fees" key="fees">
            <FeesTab />
          </TabPane>
        </Tabs>
      </Styled.BlockchainCard>
    </Layout>
  );
};

export default Blockchain;
