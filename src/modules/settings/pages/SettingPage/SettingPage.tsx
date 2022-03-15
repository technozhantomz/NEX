import { Tabs } from "antd";
import type { NextPage } from "next";
import React from "react";

import { Layout } from "../../../../common/components";
import { GeneralTab } from "../../components/GeneralTab";
import { KeyManagementTab } from "../../components/KeyManagementTab";
import { MembershipTab } from "../../components/MembershipTab";
import { SecurityTab } from "../../components/Security";

import * as Styled from "./SettingPage.styled";

const { TabPane } = Tabs;

const SettingPage: NextPage = () => {
  return (
    <Layout
      title="Settings"
      type="card-lrg"
      heading="Settings"
      description="Settings Page"
      dexLayout={true}
    >
      <Styled.SettingsCard>
        <Tabs defaultActiveKey="1">
          <TabPane tab="General" key="1">
            <GeneralTab />
          </TabPane>
          <TabPane tab="Account" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Security" key="3">
            <SecurityTab />
          </TabPane>
          <TabPane tab="Key management" key="4">
            <KeyManagementTab />
          </TabPane>
          <TabPane tab="Membership" key="5">
            <MembershipTab />
          </TabPane>
        </Tabs>
      </Styled.SettingsCard>
    </Layout>
  );
};
export default SettingPage;
