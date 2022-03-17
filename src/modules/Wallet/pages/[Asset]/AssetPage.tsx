import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  AddressGenerated,
  GenerateBitcoinAddress,
  Layout,
  TransferForm,
  WithdrawForm,
} from "../../../../common/components";
import { useAsset, useSidechainAccounts } from "../../../../common/hooks";
import { Tabs } from "../../../../ui/src";
import { AssetsTable } from "../../components/AssetsTable";

import * as Styled from "./AssetPage.styled";

const { TabPane } = Tabs;

const AssetPage: NextPage = () => {
  const router = useRouter();
  const { asset, tab } = router.query;
  const { loadingSidechainAssets, sidechainAssets } = useAsset();
  const { hasBTCDepositAddress } = useSidechainAccounts();

  return (
    <Layout
      title="Wallet"
      type="card-lrg"
      heading="Wallet"
      description={`Wallet Page | ${asset} ${tab}`}
      dexLayout={true}
    >
      <Styled.AssetCard>
        {!loadingSidechainAssets && (
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
                  <Styled.AssetFormWapper>
                    {hasBTCDepositAddress ? (
                      <AddressGenerated />
                    ) : (
                      <GenerateBitcoinAddress
                        hideDisclamer={true}
                        onAssetChange={(value) => {
                          router.push(`/wallet/${value}?tab=deposit`);
                        }}
                        hideDefultToken={true}
                      />
                    )}
                  </Styled.AssetFormWapper>
                </TabPane>
              </>
            ) : (
              ""
            )}

            <TabPane tab="All Activity" key="activity">
              {/* <TransferTab asset={asset} /> */}
            </TabPane>
          </Tabs>
        )}
      </Styled.AssetCard>
    </Layout>
  );
};

export default AssetPage;
