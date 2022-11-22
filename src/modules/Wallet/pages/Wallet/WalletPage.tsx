import counterpart from "counterpart";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { Layout } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { Button, DownOutlined, Menu, UpOutlined } from "../../../../ui/src";
import { NFTsTable, ReceiveTab, SendTab } from "../../components";
import { AssetsTable } from "../../components/AssetsTable";

import * as Styled from "./WalletPage.styled";

const { TabPane } = Styled.Tabs;

const WalletPage: NextPage = () => {
  const router = useRouter();
  const { asset, tab } = router.query;
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
                  onClick={(item: any) => {
                    props.onTabClick(item.key);
                  }}
                  items={props.panes.map((pane: any) => {
                    return { label: pane.props.tab, key: pane.key };
                  })}
                  selectedKeys={tab ? [tab as string] : ["assets"]}
                />
              </Styled.MobileTabsWrapper>
            }
          >
            <Button type="text" onClick={() => setVisible(!visible)}>
              {tab
                ? counterpart.translate(`pages.wallet.${tab}`)
                : counterpart.translate(`pages.wallet.assets`)}{" "}
              {!visible ? <DownOutlined /> : <UpOutlined />}
            </Button>
          </Styled.MobileDropdown>
        </Styled.MobileDropdownWrapper>
      ) : (
        <DefaultTabBar {...props}>{(node: any) => <>{node}</>}</DefaultTabBar>
      )}
    </>
  );
  const assetSymbol = asset && asset.length > 0 ? asset[0] : undefined;

  return (
    <Layout
      title="Wallet"
      type="card-lrg"
      heading={counterpart.translate(`pages.wallet.heading`)}
      description={`Wallet Page | ${tab}`}
      dexLayout={true}
      onClick={() => {
        if (sm) {
          visible && setVisible(false);
        }
      }}
    >
      <Styled.WalletCard onClick={() => visible && setVisible(false)}>
        <Styled.Tabs
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "assets"}`}
          onTabClick={(key) => {
            router.push(`/wallet?tab=${key}`);
            if (sm) setVisible(false);
          }}
        >
          <TabPane
            tab={counterpart.translate(`pages.wallet.assets`)}
            key="assets"
          >
            <Styled.AssetTabWrapper>
              <Styled.AssetsTableWrapper>
                <AssetsTable
                  title={counterpart.translate(`field.labels.coins_token`)}
                />
              </Styled.AssetsTableWrapper>
              <NFTsTable />
            </Styled.AssetTabWrapper>
          </TabPane>
          <TabPane tab={counterpart.translate(`pages.wallet.send`)} key="send">
            <SendTab assetSymbol={assetSymbol}></SendTab>
          </TabPane>
          <TabPane
            tab={counterpart.translate(`pages.wallet.receive`)}
            key="receive"
          >
            <ReceiveTab assetSymbol={assetSymbol} />
          </TabPane>
        </Styled.Tabs>
      </Styled.WalletCard>
    </Layout>
  );
};

export default WalletPage;
