import { Card, Tabs } from "antd";
import type { NextPage } from "next";

import Layout from "../../../../common/components/PageLayout/layout";
import AssetsTab from "../../componets/AssetsTab";

//import * as Styled from "./WalletPage.styled"

const { TabPane } = Tabs;

const WalletPage: NextPage = () => {
  return (
    <Layout
      title="Wallet"
      type="card-lrg"
      heading="Wallet"
      description="Wallet Page"
    >
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Asset" key="asset">
            <AssetsTab />
          </TabPane>
          <TabPane tab="Contacts" key="contacts">
            contacts
          </TabPane>
        </Tabs>
      </Card>
    </Layout>
  );
};

export default WalletPage;
