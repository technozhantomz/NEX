import counterpart from "counterpart";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Layout } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
//import { useBrowserHistoryContext } from "../../../../common/providers";
import { Button, DownOutlined, Menu, Tabs } from "../../../../ui/src";
import {
  GeneralTab,
  KeyManagementTab,
  MembershipTab,
  SecurityTab,
} from "../../components";

import * as Styled from "./SettingsPage.styled";

const { TabPane } = Tabs;

const SettingPage: NextPage = () => {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const { tab } = router.query;
  //const { pageLoading } = useBrowserHistoryContext();
  const { sm } = useViewportContext();
  const renderTabBar = (props: any, DefaultTabBar: any) => (
    <>
      {sm ? (
        <Styled.MobileDropdownWrapper>
          <Styled.MobileDropdown
            visible={visible}
            overlay={
              <Styled.MobileTabsWrapper>
                <Menu
                  onSelect={(item: any) => {
                    props.onTabClick(item.key);
                  }}
                  items={props.panes.map((pane: any) => {
                    return { label: pane.props.tab, key: pane.key };
                  })}
                />
              </Styled.MobileTabsWrapper>
            }
          >
            <Button type="text" onClick={() => setVisible(!visible)}>
              {tab
                ? counterpart.translate(
                    `pages.settings.${(tab as string).replace(
                      "-",
                      "_"
                    )}.heading`
                  )
                : counterpart.translate(`pages.settings.general.heading`)}{" "}
              <DownOutlined />
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
      title="Settings"
      type="card-lrg"
      heading={counterpart.translate(`pages.settings.heading`)}
      description="Settings Page"
      dexLayout={true}
      onClick={() => {
        visible && setVisible(false);
      }}
    >
      <Styled.SettingsCard>
        <Tabs
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "general"}`}
          onTabClick={(key) => {
            router.push(`/settings?tab=${key}`);
            if (sm) setVisible(false);
          }}
        >
          <TabPane
            tab={counterpart.translate(`pages.settings.general.heading`)}
            key="general"
          >
            <GeneralTab />
          </TabPane>
          <TabPane
            tab={counterpart.translate(`pages.settings.security.heading`)}
            key="security"
          >
            <SecurityTab />
          </TabPane>
          <TabPane
            tab={counterpart.translate(`pages.settings.key_management.heading`)}
            key="key-management"
          >
            <KeyManagementTab />
          </TabPane>
          <TabPane
            tab={counterpart.translate(`pages.settings.membership.heading`)}
            key="membership"
          >
            <MembershipTab />
          </TabPane>
        </Tabs>
      </Styled.SettingsCard>
    </Layout>
  );
};
export default SettingPage;
