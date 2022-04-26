import type { NextPage } from "next";
import { useRouter } from "next/router";

import { ActivityTable, Layout } from "../../../../common/components";
//import { useBrowserHistoryContext } from "../../../../common/providers";
import { AssetsTable } from "../../components/AssetsTable";

import * as Styled from "./WalletPage.styled";

const { TabPane } = Styled.Tabs;

const WalletPage: NextPage = () => {
  //const { pageLoading } = useBrowserHistoryContext();
  const router = useRouter();
  const { tab } = router.query;
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
          defaultActiveKey={`${tab ? tab : "assets"}`}
          centered={true}
          onTabClick={(key) => {
            router.push(`/wallet?tab=${key}`);
          }}
        >
          <TabPane tab="Assets" key="assets">
            <AssetsTable />
          </TabPane>
          <TabPane tab="Activities" key="activities">
            <ActivityTable />
          </TabPane>
        </Styled.Tabs>
      </Styled.WalletCard>
    </Layout>
  );
};

export default WalletPage;
