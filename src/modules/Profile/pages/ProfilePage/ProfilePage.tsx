import counterpart from "counterpart";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { ActivityTable, Layout } from "../../../../common/components";
import {
  useUserContext,
  useViewportContext,
} from "../../../../common/providers";
import { Button, DownOutlined, Menu, UpOutlined } from "../../../../ui/src";
import { OrdersTab } from "../../components";

import * as Styled from "./ProfilePage.styled";

const { TabPane } = Styled.Tabs;

const ProfilePage: NextPage = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { sm } = useViewportContext();
  const { localStorageAccount } = useUserContext();
  const router = useRouter();
  const { tab } = router.query;
  const renderTabBar = (props: any, DefaultTabBar: any) => (
    <>
      {sm ? (
        <Styled.MobileDropdownWrapper>
          <Styled.MobileDropdown
            visible={visible}
            overlay={
              <Styled.MobileTabsWrapper>
                <Menu
                  onClick={(item: any) => {
                    props.onTabClick(item.key);
                  }}
                  items={props.panes.map((pane: any) => {
                    return { label: pane.props.tab, key: pane.key };
                  })}
                  selectedKeys={tab ? [tab as string] : ["orders"]}
                />
              </Styled.MobileTabsWrapper>
            }
          >
            <Button type="text" onClick={() => setVisible(!visible)}>
              {tab
                ? counterpart.translate(`pages.profile.${tab}`)
                : counterpart.translate(`pages.profile.orders`)}{" "}
              {!visible ? <DownOutlined /> : <UpOutlined />}
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
          renderTabBar={renderTabBar}
        >
          <TabPane tab="Orders" key="orders">
            <OrdersTab />
          </TabPane>
          <TabPane tab="Activity" key="activities">
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
