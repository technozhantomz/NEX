import { Tabs } from "antd";
import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

import { FormDisclamer, Layout } from "../../../../common/components";
import { Card } from "../../../../ui/src";

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
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Account" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Security" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Key management" key="4">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Membership" key="5">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </Styled.SettingsCard>
    </Layout>
  );
};
export default SettingPage;
