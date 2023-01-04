import counterpart from "counterpart";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Layout } from "../../../../common/components";
import {
  useUserContext,
  useViewportContext,
} from "../../../../common/providers";
import {
  Button,
  DownOutlined,
  Menu,
  PageTabs,
  UpOutlined,
} from "../../../../ui/src";

import * as Styled from "./ProfilePage.styled";
import { ProfileTabItems } from "./ProfileTabItems";

const ProfilePage: NextPage = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { sm } = useViewportContext();
  const { localStorageAccount } = useUserContext();
  const profileTabItems = ProfileTabItems(localStorageAccount);
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
