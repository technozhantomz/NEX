import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { Layout } from "../../../../common/components";
//import { useBrowserHistoryContext } from "../../../../common/providers";
import { Tabs } from "../../../../ui/src";
import { GeneralTab, MembershipTab, SecurityTab } from "../../components";

import * as Styled from "./SettingsPage.styled";

const { TabPane } = Tabs;

const SettingPage: NextPage = () => {
  const router = useRouter();
  const { tab } = router.query;
  //const { pageLoading } = useBrowserHistoryContext();

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
          onTabClick={(key) => {
            router.push(`/settings?tab=${key}`);
          }}
          defaultActiveKey={`${tab ? tab : "general"}`}
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
