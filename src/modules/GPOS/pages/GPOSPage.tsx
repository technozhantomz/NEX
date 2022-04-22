import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { Layout } from "../../../common/components";
import { useViewportContext } from "../../../common/providers";
import { Button, DownOutlined, Menu, Tabs } from "../../../ui/src";
import { breakpoints } from "../../../ui/src/breakpoints";
import { PowerDownTab, PowerUpTab } from "../components";

import * as Styled from "./GPOSPage.styled";

const { TabPane } = Tabs;

const GPOSPage: NextPage = () => {
  const router = useRouter();
  const { tab } = router.query;
  const { width } = useViewportContext();
  const [visible, setVisible] = useState<boolean>(false);
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
              {tab ? tab : "power-up"} <DownOutlined />
            </Button>
          </Styled.MobileDropdown>
        </Styled.MobileDropdownWrapper>
      )}
    </>
  );
  return (
    <Layout
      title="Peerplays (GPOS)"
      type="card-lrg"
      heading="Peerplays (GPOS)"
      description="Peerplays (GPOS)"
      dexLayout={true}
    >
      <Styled.GPOSCard>
        <Tabs
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "power-up"}`}
          onTabClick={(key) => {
            if (key === "vote") router.push(`/voting`);
            else router.push(`/gpos?tab=${key}`);
            if (width < breakpoints.sm) setVisible(false);
          }}
        >
          <TabPane tab="Power up" key="power-up">
            <PowerUpTab />
          </TabPane>
          <TabPane tab="Power Down" key="power-down">
            <PowerDownTab />
          </TabPane>
          <TabPane tab="Vote" key="vote"></TabPane>
        </Tabs>
      </Styled.GPOSCard>
    </Layout>
  );
};

export default GPOSPage;
