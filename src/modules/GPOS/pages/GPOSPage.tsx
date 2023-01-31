import counterpart from "counterpart";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout, MobileTabBar } from "../../../common/components";
import { useViewportContext } from "../../../common/providers";
import { PageTabs } from "../../../ui/src";
import { PowerDownTab, PowerUpTab } from "../components";
import { useGposPage } from "../hooks";

import * as Styled from "./GPOSPage.styled";

const GPOSPage: NextPage = () => {
  const router = useRouter();
  const { tab } = router.query;
  const { sm } = useViewportContext();
  const {
    gposBalances,
    loading,
    calculateGposBalances,
    isMobileDropdownvisible,
    setIsMobileDropdownvisible,
  } = useGposPage();
  const renderTabBar = MobileTabBar({
    showMobileMenu: sm,
    visible: isMobileDropdownvisible,
    tab,
    setVisible: setIsMobileDropdownvisible,
    defaultKey: "power-up",
    defaultTab: counterpart.translate(`buttons.power_up`),
    selectedTab: counterpart.translate(
      `buttons.${(tab as string)?.replace("-", "_")}`
    ),
  });
  const tabItems = [
    {
      label: counterpart.translate(`buttons.power_up`),
      key: "power-up",
      children: (
        <PowerUpTab
          gposBalances={gposBalances}
          loading={loading}
          calculateGposBalances={calculateGposBalances}
        />
      ),
    },
    {
      label: counterpart.translate(`buttons.power_down`),
      key: "power-down",
      children: (
        <PowerDownTab
          gposBalances={gposBalances}
          loading={loading}
          calculateGposBalances={calculateGposBalances}
        />
      ),
    },
    {
      label: counterpart.translate(`buttons.vote`),
      key: "vote",
      children: "",
    },
  ];

  return (
    <Layout
      title="Peerplays (GPOS)"
      type="card-lrg"
      heading={counterpart.translate(
        `pages.voting.gpos.${
          tab === "power-up" ? "powerUp" : "powerDown"
        }.heading`
      )}
      description="Peerplays (GPOS)"
      layout="dex"
      onClick={() => {
        if (sm) {
          isMobileDropdownvisible && setIsMobileDropdownvisible(false);
        }
      }}
    >
      <Styled.GPOSCard>
        <PageTabs
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "power-up"}`}
          onTabClick={(key) => {
            if (key === "vote") router.push(`/voting?tab=witnesses`);
            else router.push(`/gpos?tab=${key}`);
            if (sm) setIsMobileDropdownvisible(false);
          }}
          items={tabItems}
        />
      </Styled.GPOSCard>
    </Layout>
  );
};

export default GPOSPage;
