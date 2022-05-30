import counterpart from "counterpart";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { ActivityTable, Layout } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { Button, DownOutlined, Menu } from "../../../../ui/src";
//import { useBrowserHistoryContext } from "../../../../common/providers";
import { AssetsTable } from "../../components/AssetsTable";

import * as Styled from "./WalletPage.styled";

const { TabPane } = Styled.Tabs;

const WalletPage: NextPage = () => {
  //const { pageLoading } = useBrowserHistoryContext();
  const router = useRouter();
  const { tab } = router.query;
  const [visible, setVisible] = useState<boolean>(false);
  const { sm } = useViewportContext();
  const renderTabBar = (props: any, DefaultTabBar: any) => (
    <>
      {sm ? (
        <Styled.MobileDropdownWrapper>
          <Styled.MobileDropdown
            visible={visible}
            overlay={
              <Styled.MobileTabsWrapper>
                <Menu
                  onSelect={(item: any) => {
                    props.onTabClick(item.key);
                  }}
                  items={props.panes.map((pane: any) => {
                    return { label: pane.props.tab, key: pane.key };
                  })}
                />
              </Styled.MobileTabsWrapper>
            }
          >
            <Button type="text" onClick={() => setVisible(!visible)}>
              {tab ? tab : "assets"} <DownOutlined />
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
      title="Wallet"
      type="card-lrg"
      heading={counterpart.translate(`pages.wallet.heading`)}
      description={`Wallet Page | ${tab}`}
      dexLayout={true}
    >
      <Styled.WalletCard>
        <Styled.Tabs
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "assets"}`}
          onTabClick={(key) => {
            router.push(`/wallet?tab=${key}`);
            if (sm) setVisible(false);
          }}
        >
          <TabPane
            tab={counterpart.translate(`pages.blocks.assets.assets`)}
            key="assets"
          >
            <AssetsTable />
          </TabPane>
          <TabPane
            tab={counterpart.translate(`pages.wallet.activities`)}
            key="activities"
          >
            <ActivityTable isWalletActivityTable={true} />
          </TabPane>
        </Styled.Tabs>
      </Styled.WalletCard>
    </Layout>
  );
};

export default WalletPage;
