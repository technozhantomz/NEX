import counterpart from "counterpart";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Layout, MobileTabBar } from "../../../../common/components";
import {
  useUserContext,
  useViewportContext,
} from "../../../../common/providers";
import { PageTabs } from "../../../../ui/src";

import * as Styled from "./ProfilePage.styled";
import { ProfileTabItems } from "./ProfileTabItems";

const ProfilePage: NextPage = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { sm } = useViewportContext();
  const { localStorageAccount } = useUserContext();
  const profileTabItems = ProfileTabItems(localStorageAccount);
  const router = useRouter();
  const { tab } = router.query;
  const renderTabBar = MobileTabBar({
    sm,
    visible,
    tab,
    setVisible,
    defaultKey: "orders",
    defaultTab: counterpart.translate(`pages.profile.orders`),
    selectedTab: counterpart.translate(`pages.profile.${tab}`),
  });

  return (
    <Layout
      title="Profile"
      type="card-lrg"
      heading={counterpart.translate(`pages.profile.heading`)}
      description="Profile"
      layout="dex"
      onClick={() => {
        if (sm) {
          visible && setVisible(false);
        }
      }}
    >
      <Styled.ProfileCard>
        <PageTabs
          activeKey={`${tab ? tab : "orders"}`}
          onTabClick={(key) => {
            router.push(`/profile?tab=${key}`);
            if (sm) setVisible(false);
          }}
          renderTabBar={renderTabBar}
          items={profileTabItems}
        />
      </Styled.ProfileCard>
    </Layout>
  );
};
export default ProfilePage;
