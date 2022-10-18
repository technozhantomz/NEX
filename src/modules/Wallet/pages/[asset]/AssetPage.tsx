import counterpart from "counterpart";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import {
  AddressGenerated,
  DownloadBitcoinKeys,
  GenerateBitcoinAddress,
  HIVEAndHBDDeposit,
  Layout,
  TransferForm,
  WithdrawForm,
} from "../../../../common/components";
import {
  useAssetsContext,
  useUserContext,
  //useBrowserHistoryContext,
  useViewportContext,
} from "../../../../common/providers";
import { SidechainAcccount } from "../../../../common/types";
import {
  Button,
  DownOutlined,
  Menu,
  Tabs,
  UpOutlined,
} from "../../../../ui/src";
import BitcoinIcon from "../../../../ui/src/icons/Cryptocurrencies/BitcoinIcon.svg";
import { AssetsTable } from "../../components";

import * as Styled from "./AssetPage.styled";

const { TabPane } = Tabs;

const AssetPage: NextPage = () => {
  const router = useRouter();
  const { asset, tab } = router.query;
  const { loadingSidechainAssets, sidechainAssets } = useAssetsContext();
  const {
    bitcoinSidechainAccount,
    hasBTCDepositAddress,
    loadingSidechainAccounts,
    getSidechainAccounts,
  } = useUserContext();

  const [visible, setVisible] = useState<boolean>(false);
  const { sm } = useViewportContext();

  const isSidechainAsset = sidechainAssets
    .map((sideAsset) => sideAsset.symbol)
    .includes(asset as string);

  const sidechainAssetsTabBarItems = [
    {
      label: counterpart.translate(`buttons.transfer`),
      key: "transfer",
    },
    { label: counterpart.translate(`buttons.withdraw`), key: "withdraw" },
    { label: counterpart.translate(`buttons.deposit`), key: "deposit" },
  ];

  const tabBarItems = isSidechainAsset
    ? sidechainAssetsTabBarItems
    : [
        {
          label: counterpart.translate(`buttons.transfer`),
          key: "transfer",
        },
      ];

  const selectedTabText = tab
    ? counterpart.translate(`buttons.${tab}`)
    : counterpart.translate(`buttons.transfer`);

  const dropdownIcon = !visible ? <DownOutlined /> : <UpOutlined />;

  const renderMobileTabBar = (props: any) => (
    <Styled.MobileDropdownWrapper>
      <Styled.MobileDropdown
        visible={visible}
        overlay={
          <Styled.MobileTabsWrapper>
            <Menu
              onClick={(item: any) => {
                props.onTabClick(item.key);
              }}
              items={tabBarItems}
              selectedKeys={tab ? [tab as string] : ["transfer"]}
            />
          </Styled.MobileTabsWrapper>
        }
      >
        <Button type="text" onClick={() => setVisible(!visible)}>
          {selectedTabText} {dropdownIcon}
        </Button>
      </Styled.MobileDropdown>
      {props.extra}
    </Styled.MobileDropdownWrapper>
  );

  const nonSidechainAssetsSelectedTabKey = (node: any) =>
    node.key === "transfer" ? node : "";

  const renderDesktopTabBar = (props: any, DefaultTabBar: any) => (
    <DefaultTabBar {...props}>
      {(node: any) => {
        return (
          <>
            {isSidechainAsset ? node : nonSidechainAssetsSelectedTabKey(node)}
          </>
        );
      }}
    </DefaultTabBar>
  );

  const renderTabBar = (props: any, DefaultTabBar: any) => (
    <>
      {sm
        ? renderMobileTabBar(props)
        : renderDesktopTabBar(props, DefaultTabBar)}
    </>
  );

  const renderBTCDepositInstruction = (instruction: string) => {
    return (
      <Styled.BTCDepositInstructionContainer>
        <Styled.BTCIconWrapper>
          <BitcoinIcon width="30" height="30" />
        </Styled.BTCIconWrapper>
        <Styled.BTCDepositInstruction>
          {instruction}
        </Styled.BTCDepositInstruction>
      </Styled.BTCDepositInstructionContainer>
    );
  };

  const renderBtcDepositTab = (
    hasBTCDepositAddress: boolean,
    bitcoinSidechainAccount: SidechainAcccount
  ) => {
    if (hasBTCDepositAddress) {
      return (
        <>
          <AddressGenerated bitcoinSidechainAccount={bitcoinSidechainAccount} />
          {renderBTCDepositInstruction(
            counterpart.translate(`field.labels.deposit_btc`)
          )}
          <DownloadBitcoinKeys
            bitcoinSidechainAccount={
              bitcoinSidechainAccount as SidechainAcccount
            }
            getSidechainAccounts={getSidechainAccounts}
          />
        </>
      );
    } else {
      return (
        <>
          <GenerateBitcoinAddress getSidechainAccounts={getSidechainAccounts} />
          {renderBTCDepositInstruction(
            counterpart.translate(`field.labels.generate_btc_deposit_address`)
          )}
        </>
      );
    }
  };

  const renderDepositTab = (asset: string) => {
    if (asset === "BTC") {
      return renderBtcDepositTab(
        hasBTCDepositAddress,
        bitcoinSidechainAccount as SidechainAcccount
      );
    } else {
      return <HIVEAndHBDDeposit assetSymbol={asset} />;
    }
  };

  return (
    <Layout
      title="Wallet"
      type="card-lrg"
      heading={counterpart.translate(`pages.wallet.heading`)}
      description={`Wallet Page | ${asset} ${tab}`}
      dexLayout={true}
      onClick={() => {
        if (sm) {
          visible && setVisible(false);
        }
      }}
    >
      {!loadingSidechainAssets && (
        <Styled.AssetCard>
          <Tabs
            renderTabBar={renderTabBar}
            activeKey={`${tab ? tab : "transfer"}`}
            tabBarExtraContent={
              <span className="back-link">
                <Link href="/wallet">
                  <a>{counterpart.translate(`pages.wallet.back_to_assets`)}</a>
                </Link>
              </span>
            }
            onTabClick={(key) => {
              router.push(`/wallet/${asset}?tab=${key}`);
              if (sm) setVisible(false);
            }}
          >
            <TabPane
              tab={counterpart.translate(`transaction.trxTypes.transfer.title`)}
              key="transfer"
            >
              <AssetsTable showActions={false} fillterAsset={`${asset}`} />
              <TransferForm asset={`${asset}`} />
            </TabPane>
            {isSidechainAsset ? (
              <>
                <TabPane
                  tab={counterpart.translate(`buttons.withdraw`)}
                  key="withdraw"
                >
                  <AssetsTable showActions={false} fillterAsset={`${asset}`} />
                  <Styled.WithdrawFormWrapper>
                    <WithdrawForm asset={`${asset}`} />
                  </Styled.WithdrawFormWrapper>
                </TabPane>
                <TabPane
                  tab={counterpart.translate(`buttons.deposit`)}
                  key="deposit"
                >
                  <AssetsTable showActions={false} fillterAsset={`${asset}`} />
                  {!loadingSidechainAccounts ? (
                    <Styled.AssetFormWapper>
                      {renderDepositTab(asset as string)}
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
