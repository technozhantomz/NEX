import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { Layout } from "../../../common/components";
import { useViewportContext } from "../../../common/providers";
import { Button, DownOutlined, Menu, Tabs } from "../../../ui/src";
import { GPOSTab, ProxyTab } from "../components";

import * as Styled from "./VotingPage.styled";
import { useVotingPage } from "./hooks";

const { TabPane } = Tabs;

const VotingPage: NextPage = () => {
  const router = useRouter();
  const { tab } = router.query;
  const { pageMeta } = useVotingPage(tab as string);
  const { sm } = useViewportContext();
  const [visible, setVisible] = useState<boolean>(false);
  const renderTabBar = (props: any, DefaultTabBar: any) => (
    <>
      {sm ? (
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
              {tab ? tab : "gpos"} <DownOutlined />
            </Button>
          </Styled.MobileDropdown>
        </Styled.MobileDropdownWrapper>
      ) : (
        <DefaultTabBar {...props}>{(node: any) => <>{node}</>}</DefaultTabBar>
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
      <Styled.VotingCard>
        <Tabs
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "gpos"}`}
          onTabClick={(key) => {
            router.push(`/voting?tab=${key}`);
            if (sm) setVisible(false);
          }}
        >
          <TabPane tab="GPOS" key="gpos">
            <GPOSTab />
          </TabPane>
          <TabPane tab="Witness" key="witness">
            <p>witness</p>
          </TabPane>
          <TabPane tab="SONs" key="sons">
            <p>sons</p>
          </TabPane>
          <TabPane tab="Advisors" key="advisors">
            <p>advisors</p>
          </TabPane>
          <TabPane tab="Proxy" key="proxy">
            <ProxyTab />
          </TabPane>
        </Tabs>
      </Styled.VotingCard>
    </Layout>
  );
};

export default VotingPage;
