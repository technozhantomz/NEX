import { Tabs } from "antd";
import type { NextPage } from "next";

import { Layout } from "../../../../common/components/PageLayout";
import AssetsTab from "../../componets/AssetsTab";

import * as Styled from "./WalletPage.styled";

const { TabPane } = Tabs;

const WalletPage: NextPage = () => {
  return (
    <Layout
      title="Wallet"
      type="card-lrg"
      heading="Wallet"
      description="Wallet Page"
    >
      <Styled.WalletCard>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Asset" key="asset">
            <AssetsTab />
          </TabPane>
        </Tabs>
      </Styled.WalletCard>
    </Layout>
  );
};

export default WalletPage;
