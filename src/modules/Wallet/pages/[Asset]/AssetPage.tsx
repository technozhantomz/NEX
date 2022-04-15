import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

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
} from "../../../../common/providers";
import { Tabs } from "../../../../ui/src";
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
            defaultActiveKey={`${tab}`}
            tabBarExtraContent={<Link href="/wallet">Back to Assets</Link>}
            onTabClick={(key) => {
              router.push(`/wallet/${asset}?tab=${key}`);
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
                  <WithdrawForm asset={`${asset}`} />
                </TabPane>
                <TabPane tab="Deposit" key="deposit">
                  <AssetsTable showActions={false} fillterAsset={`${asset}`} />
                  {!loadingSidechainAccounts ? (
                    <Styled.AssetFormWapper>
                      {asset === "BTC" ? (
                        hasBTCDepositAddress ? (
                          <AddressGenerated
                            bitcoinSidechainAccount={bitcoinSidechainAccount}
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
