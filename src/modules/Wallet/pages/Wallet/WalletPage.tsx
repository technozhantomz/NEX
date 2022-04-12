import { Skeleton } from "antd";
import type { NextPage } from "next";

import { ActivityTable, Layout } from "../../../../common/components";
import { useBrowserHistoryContext } from "../../../../common/providers";
import { AssetsTable } from "../../components/AssetsTable";

import * as Styled from "./WalletPage.styled";

const { TabPane } = Styled.Tabs;

const WalletPage: NextPage = () => {
  const { pageLoading } = useBrowserHistoryContext();

  return (
    <Layout
      title="Wallet"
      type="card-lrg"
      heading="Wallet"
      description="Wallet Page"
      dexLayout={true}
    >
      <Styled.WalletCard>
        {pageLoading ? (
          <Skeleton active />
        ) : (
          <Styled.Tabs defaultActiveKey="1" centered={true}>
            <TabPane tab="Assets" key="1">
              <AssetsTable />
            </TabPane>
            <TabPane tab="All Activity" key="activity">
              <ActivityTable />
            </TabPane>
          </Styled.Tabs>
        )}
      </Styled.WalletCard>
    </Layout>
  );
};

export default WalletPage;
