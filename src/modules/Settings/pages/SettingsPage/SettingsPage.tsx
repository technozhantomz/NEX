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
import { GeneralTab, KeyManagementTab, MembershipTab } from "../../components";

import * as Styled from "./SettingsPage.styled";

const SettingPage: NextPage = () => {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const { tab } = router.query;
  const { localStorageAccount } = useUserContext();
  const { sm } = useViewportContext();
  const renderTabBar = MobileTabBar({
    showMobileMenu: sm,
    visible,
    tab,
    setVisible,
    defaultKey: "general",
    defaultTab: counterpart.translate(`pages.settings.general.heading`),
    selectedTab: counterpart.translate(
      `pages.settings.${(tab as string)?.replace("-", "_")}.heading`
    ),
  });

  let tabItems = [
    {
      label: counterpart.translate(`pages.settings.general.heading`),
      key: "general",
      children: <GeneralTab />,
    },
  ];
  if (localStorageAccount && localStorageAccount !== "") {
    tabItems = [
      ...tabItems,
      {
        label: counterpart.translate(`pages.settings.key_management.heading`),
        key: "key-management",
        children: <KeyManagementTab />,
      },
      {
        label: counterpart.translate(`pages.settings.membership.heading`),
        key: "membership",
        children: <MembershipTab />,
      },
    ];
  }

  return (
    <Layout
      title={counterpart.translate(`pages.settings.heading`)}
      type="card-lrg"
      heading={counterpart.translate(`pages.settings.heading`)}
      description="Settings Page"
      layout="dex"
      onClick={() => {
        if (sm) {
          visible && setVisible(false);
        }
      }}
    >
      <Styled.SettingsCard>
        <PageTabs
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "general"}`}
          onTabClick={(key) => {
            router.push(`/settings?tab=${key}`);
            if (sm) setVisible(false);
          }}
          items={tabItems}
        />
      </Styled.SettingsCard>
    </Layout>
  );
};
export default SettingPage;
