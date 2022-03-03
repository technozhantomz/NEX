import { Tabs } from "antd";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { Layout } from "../../../../common/components/PageLayout";
import { AssetsTable } from "../../componets/AssetsTable";

import * as Styled from "./AssetPage.styled";
import TransferTab from "./components/TransferTab";

const { TabPane } = Tabs;

const AssetPage: NextPage = () => {
  const router = useRouter();
  const { asset, tab } = router.query;
  return (
    <Layout
      title="Wallet"
      type="card-lrg"
      heading="Wallet"
      description={`Wallet Page | ${asset} ${tab}`}
      dexLayout={true}
    >
      <Styled.AssetCard>
        <Tabs
          defaultActiveKey={`${tab}`}
          tabBarExtraContent={<Link href="/wallet">Back to Assets</Link>}
        >
          <TabPane tab="Transfer" key="transfer">
            <AssetsTable showActions={false} fillterAsset={`${asset}`} />
            <TransferTab asset={`${asset}`} />
          </TabPane>
          <TabPane tab="Withdraw" key="withdraw">
            <AssetsTable showActions={false} fillterAsset={`${asset}`} />
            {/* <TransferTab asset={asset} /> */}
          </TabPane>
          <TabPane tab="Deposit" key="deposit">
            <AssetsTable showActions={false} fillterAsset={`${asset}`} />
            {/* <TransferTab asset={asset} /> */}
          </TabPane>
          <TabPane tab="All Activity" key="activity">
            {/* <TransferTab asset={asset} /> */}
          </TabPane>
        </Tabs>
      </Styled.AssetCard>
    </Layout>
  );
};

export default AssetPage;
