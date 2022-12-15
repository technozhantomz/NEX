import counterpart from "counterpart";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../../common/components";
import { useViewportContext } from "../../../common/providers";
import { Button, DownOutlined, Menu, Tabs, UpOutlined } from "../../../ui/src";
import { PowerDownTab, PowerUpTab } from "../components";
import { useGposPage } from "../hooks";

import * as Styled from "./GPOSPage.styled";

const { TabPane } = Tabs;

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
  const renderTabBar = (props: any, DefaultTabBar: any) => (
    <>
      {sm ? (
        <Styled.MobileDropdownWrapper>
          <Styled.MobileDropdown
            visible={isMobileDropdownvisible}
            overlay={
              <Styled.MobileTabsWrapper>
                <Menu
                  onClick={(item: any) => {
                    props.onTabClick(item.key);
                  }}
                  items={props.panes.map((pane: any) => {
                    return { label: pane.props.tab, key: pane.key };
                  })}
                  selectedKeys={tab ? [tab as string] : ["power-up"]}
                />
              </Styled.MobileTabsWrapper>
            }
          >
            <Button
              type="text"
              onClick={() =>
                setIsMobileDropdownvisible(!isMobileDropdownvisible)
              }
            >
              {tab
                ? counterpart.translate(
                    `buttons.${(tab as string).replace("-", "_")}`
                  )
                : counterpart.translate(`buttons.power_up`)}{" "}
              {!isMobileDropdownvisible ? <DownOutlined /> : <UpOutlined />}
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
        <Tabs
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "power-up"}`}
          onTabClick={(key) => {
            if (key === "vote") router.push(`/voting?tab=witnesses`);
            else router.push(`/gpos?tab=${key}`);
            if (sm) setIsMobileDropdownvisible(false);
          }}
        >
          <TabPane
            tab={counterpart.translate(`buttons.power_up`)}
            key="power-up"
          >
            <PowerUpTab
              gposBalances={gposBalances}
              loading={loading}
              calculateGposBalances={calculateGposBalances}
            />
          </TabPane>
          <TabPane
            tab={counterpart.translate(`buttons.power_down`)}
            key="power-down"
          >
            <PowerDownTab
              gposBalances={gposBalances}
              loading={loading}
              calculateGposBalances={calculateGposBalances}
            />
          </TabPane>
          <TabPane
            tab={counterpart.translate(`buttons.vote`)}
            key="vote"
          ></TabPane>
        </Tabs>
      </Styled.GPOSCard>
    </Layout>
  );
};

export default GPOSPage;
