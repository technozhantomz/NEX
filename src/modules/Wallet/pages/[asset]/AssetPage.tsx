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
  const { sm } = useViewportContext();
  const dropdownItems = [
    { label: "Transfer", key: "transfer" },
    { label: "Withdraw", key: "withdraw" },
    { label: "Deposit", key: "deposit" },
  ];
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
                  items={
                    sidechainAssets
                      .map((sideAsset) => sideAsset.symbol)
                      .includes(asset as string)
                      ? dropdownItems
                      : [{ label: "Transfer", key: "transfer" }]
                  }
                />
              </Styled.MobileTabsWrapper>
            }
          >
            <Button type="text" onClick={() => setVisible(!visible)}>
              {tab ? tab : "transfer"} <DownOutlined />
            </Button>
          </Styled.MobileDropdown>
          {props.extra}
        </Styled.MobileDropdownWrapper>
      ) : (
        <DefaultTabBar {...props}>
          {(node: any) => (
            <>
              {sidechainAssets
                .map((sideAsset) => sideAsset.symbol)
                .includes(asset as string)
                ? node
                : node.key === "transfer"
                ? node
                : ""}
            </>
          )}
        </DefaultTabBar>
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
            tabBarExtraContent={
              <span className="back-link">
                <Link href="/wallet">Back to Assets</Link>
              </span>
            }
            onTabClick={(key) => {
              router.push(`/wallet/${asset}?tab=${key}`);
              if (sm) setVisible(false);
            }}
          >
            <TabPane tab="Transfer" key="transfer">
              <AssetsTable showActions={false} fillterAsset={`${asset}`} />
              <TransferForm asset={`${asset}`} />
            </TabPane>
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
          </Tabs>
        </Styled.AssetCard>
      )}
    </Layout>
  );
};

export default AssetPage;
