import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { ActivityTable, Layout } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { Button, DownOutlined, Menu } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";
//import { useBrowserHistoryContext } from "../../../../common/providers";
import { AssetsTable } from "../../components/AssetsTable";

import * as Styled from "./WalletPage.styled";

const { TabPane } = Styled.Tabs;

const WalletPage: NextPage = () => {
  //const { pageLoading } = useBrowserHistoryContext();
  const router = useRouter();
  const { tab } = router.query;
  const [visible, setVisible] = useState<boolean>(false);
  const { width } = useViewportContext();
  const renderTabBar = (props: any, DefaultTabBar: any) => (
    <>
      {width > breakpoints.md ? (
        <DefaultTabBar {...props}>{(node: any) => <>{node}</>}</DefaultTabBar>
      ) : (
        <Styled.MobileDropdownWrapper>
          <Styled.MobileDropdown
            visible={visible}
            overlay={
              <Styled.MobileTabsWrapper>
                <Menu>
                  <DefaultTabBar {...props}>
                    {(node: any) => (
                      <Menu.Item key={node.key}>{node}</Menu.Item>
                    )}
                  </DefaultTabBar>
                </Menu>
              </Styled.MobileTabsWrapper>
            }
          >
            <Button type="text" onClick={() => setVisible(!visible)}>
              {tab ? tab : "assets"} <DownOutlined />
            </Button>
          </Styled.MobileDropdown>
        </Styled.MobileDropdownWrapper>
      )}
    </>
  );
  return (
    <Layout
      title="Wallet"
      type="card-lrg"
      heading="Wallet"
      description={`Wallet Page | ${tab}`}
      dexLayout={true}
    >
      <Styled.WalletCard>
        <Styled.Tabs
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "assets"}`}
          onTabClick={(key) => {
            router.push(`/wallet?tab=${key}`);
            if (width < breakpoints.sm) setVisible(false);
          }}
        >
          <TabPane tab="Assets" key="assets">
            <AssetsTable />
          </TabPane>
          <TabPane tab="Activities" key="activities">
            <ActivityTable isWalletActivityTable={true} />
          </TabPane>
        </Styled.Tabs>
      </Styled.WalletCard>
    </Layout>
  );
};

export default WalletPage;
