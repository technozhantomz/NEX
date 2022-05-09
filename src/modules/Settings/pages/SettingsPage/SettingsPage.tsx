import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Layout } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
//import { useBrowserHistoryContext } from "../../../../common/providers";
import { Button, DownOutlined, Menu, Tabs } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";
import { GeneralTab, MembershipTab, SecurityTab } from "../../components";

import * as Styled from "./SettingsPage.styled";

const { TabPane } = Tabs;

const SettingPage: NextPage = () => {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const { tab } = router.query;
  //const { pageLoading } = useBrowserHistoryContext();
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
              {tab ? tab : "general"} <DownOutlined />
            </Button>
          </Styled.MobileDropdown>
        </Styled.MobileDropdownWrapper>
      )}
    </>
  );

  return (
    <Layout
      title="Settings"
      type="card-lrg"
      heading="Settings"
      description="Settings Page"
      dexLayout={true}
    >
      <Styled.SettingsCard>
        <Tabs
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "general"}`}
          onTabClick={(key) => {
            router.push(`/settings?tab=${key}`);
            if (width < breakpoints.sm) setVisible(false);
          }}
        >
          <TabPane tab="General" key="general">
            <GeneralTab />
          </TabPane>
          <TabPane tab="Security" key="security">
            <SecurityTab />
          </TabPane>
          {/* <TabPane tab="Key management" key="4">
            <KeyManagementTab />
          </TabPane> */}
          <TabPane tab="Membership" key="membership">
            <MembershipTab />
          </TabPane>
        </Tabs>
      </Styled.SettingsCard>
    </Layout>
  );
};
export default SettingPage;
