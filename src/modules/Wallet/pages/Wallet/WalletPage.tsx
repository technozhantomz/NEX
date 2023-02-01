import counterpart from "counterpart";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { Layout, MobileTabBar } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { PageTabs } from "../../../../ui/src";
import { ReceiveTab, SendTab } from "../../components";
import { AssetsTable } from "../../components/AssetsTable";

import * as Styled from "./WalletPage.styled";

const WalletPage: NextPage = () => {
  const router = useRouter();
  const { asset, tab } = router.query;
  const [visible, setVisible] = useState<boolean>(false);
  const { sm } = useViewportContext();
  const renderTabBar = MobileTabBar({
    showMobileMenu: sm,
    visible,
    tab,
    setVisible,
    defaultKey: "assets",
    defaultTab: counterpart.translate(`pages.wallet.assets`),
    selectedTab: counterpart.translate(`pages.wallet.${tab}`),
  });

  const assetSymbol = asset && asset.length > 0 ? asset[0] : undefined;
  const tabItems = [
    {
      label: counterpart.translate(`pages.wallet.assets`),
      key: "assets",
      children: (
        <Styled.AssetTabWrapper>
          <Styled.AssetsTableWrapper>
            <AssetsTable
              title={counterpart.translate(`field.labels.coins_token`)}
            />
          </Styled.AssetsTableWrapper>
        </Styled.AssetTabWrapper>
      ),
    },
    {
      label: counterpart.translate(`pages.wallet.send`),
      key: "send",
      children: <SendTab assetSymbol={assetSymbol}></SendTab>,
    },
    {
      label: counterpart.translate(`pages.wallet.receive`),
      key: "receive",
      children: <ReceiveTab assetSymbol={assetSymbol} />,
    },
  ];

  return (
    <Layout
      title="Wallet"
      type="card-lrg"
      heading={counterpart.translate(`pages.wallet.heading`)}
      description={`Wallet Page | ${tab}`}
      layout="dex"
      onClick={() => {
        if (sm) {
          visible && setVisible(false);
        }
      }}
    >
      <Styled.WalletCard onClick={() => visible && setVisible(false)}>
        <PageTabs
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "assets"}`}
          onTabClick={(key) => {
            router.push(`/wallet?tab=${key}`);
            if (sm) setVisible(false);
          }}
          items={tabItems}
        />
      </Styled.WalletCard>
    </Layout>
  );
};

export default WalletPage;
