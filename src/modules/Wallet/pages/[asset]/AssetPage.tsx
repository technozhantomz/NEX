import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import {
  AddressGenerated,
  GenerateBitcoinAddress,
  HIVEAndHBDDeposit,
  Layout,
  TransferForm,
  WithdrawForm,
} from "../../../../common/components";
import { useAsset, useSidechainAccounts } from "../../../../common/hooks";
import {
  //useBrowserHistoryContext,
  useUserContext,
  useViewportContext,
} from "../../../../common/providers";
import { SidechainAcccount } from "../../../../common/types";
import { Button, DownOutlined, Menu, Tabs } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";
import { AssetsTable } from "../../components";

import * as Styled from "./AssetPage.styled";

const { TabPane } = Tabs;

const AssetPage: NextPage = () => {
  const router = useRouter();
  const { asset, tab } = router.query;
  const { loadingSidechainAssets, sidechainAssets } = useAsset();
  const {
    bitcoinSidechainAccount,
    hasBTCDepositAddress,
    loadingSidechainAccounts,
    getSidechainAccounts,
  } = useSidechainAccounts();
  const { localStorageAccount } = useUserContext();
  //const { pageLoading } = useBrowserHistoryContext();
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
              {tab ? tab : "transfer"} <DownOutlined />
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
      description={`Wallet Page | ${asset} ${tab}`}
      dexLayout={true}
    >
      {!loadingSidechainAssets && (
        <Styled.AssetCard>
          <Tabs
            renderTabBar={renderTabBar}
            activeKey={`${tab ? tab : "transfer"}`}
            tabBarExtraContent={<Link href="/wallet">Back to Assets</Link>}
            onTabClick={(key) => {
              router.push(`/wallet/${asset}?tab=${key}`);
              if (width < breakpoints.sm) setVisible(false);
            }}
          >
            <TabPane tab="Transfer" key="transfer">
              <AssetsTable showActions={false} fillterAsset={`${asset}`} />
              <TransferForm asset={`${asset}`} />
            </TabPane>
            {sidechainAssets
              .map((sideAsset) => sideAsset.symbol)
              .includes(asset as string) ? (
              <>
                <TabPane tab="Withdraw" key="withdraw">
                  <AssetsTable showActions={false} fillterAsset={`${asset}`} />
                  <Styled.WithdrawFormWrapper>
                    <WithdrawForm asset={`${asset}`} />
                  </Styled.WithdrawFormWrapper>
                </TabPane>
                <TabPane tab="Deposit" key="deposit">
                  <AssetsTable showActions={false} fillterAsset={`${asset}`} />
                  {!loadingSidechainAccounts ? (
                    <Styled.AssetFormWapper>
                      {asset === "BTC" ? (
                        hasBTCDepositAddress ? (
                          <AddressGenerated
                            bitcoinSidechainAccount={
                              bitcoinSidechainAccount as SidechainAcccount
                            }
                            getSidechainAccounts={getSidechainAccounts}
                          />
                        ) : (
                          <GenerateBitcoinAddress
                            isLoggedIn={!!localStorageAccount}
                            getSidechainAccounts={getSidechainAccounts}
                          />
                        )
                      ) : (
                        <HIVEAndHBDDeposit assetSymbol={asset as string} />
                      )}
                    </Styled.AssetFormWapper>
                  ) : (
                    ""
                  )}
                </TabPane>
              </>
            ) : (
              ""
            )}
          </Tabs>
        </Styled.AssetCard>
      )}
    </Layout>
  );
};

export default AssetPage;
