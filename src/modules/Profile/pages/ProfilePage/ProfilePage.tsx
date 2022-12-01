import counterpart from "counterpart";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { ActivityTable, Layout } from "../../../../common/components";
import {
  useUserContext,
  useViewportContext,
} from "../../../../common/providers";
import { OpenOrdersTabel } from "../../components/OpenOrdersTable";

import * as Styled from "./ProfilePage.styled";

const { TabPane } = Styled.Tabs;

const ProfilePage: NextPage = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { localStorageAccount } = useUserContext();
  const { sm } = useViewportContext();
  const router = useRouter();
  const { tab } = router.query;

  return (
    <Layout
      title="Profile"
      type="card-lrg"
      heading={counterpart.translate(`pages.profile.heading`)}
      description="Profile"
      dexLayout={true}
      onClick={() => {
        if (sm) {
          visible && setVisible(false);
        }
      }}
    >
      <Styled.ProfileCard>
        <Styled.Tabs
          activeKey={`${tab ? tab : "orders"}`}
          onTabClick={(key) => {
            router.push(`/profile?tab=${key}`);
            if (sm) setVisible(false);
          }}
        >
          <TabPane tab="Orders" key="orders">
            <OpenOrdersTabel />
          </TabPane>
          <TabPane tab="Activity" key="activity">
            <ActivityTable userName={localStorageAccount} showHeader={true} />
          </TabPane>
          <TabPane tab="Notifications" key="notifications">
            <p>notifications Tab</p>
          </TabPane>
        </Styled.Tabs>
      </Styled.ProfileCard>
    </Layout>
  );
};
export default ProfilePage;
