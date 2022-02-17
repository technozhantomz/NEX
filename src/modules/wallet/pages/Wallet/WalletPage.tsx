import type { NextPage } from "next";

import Layout from "../../../../common/components/PageLayout/layout";
import AssetsTab from "../../componets/AssetsTab";

import * as Styled from "./WalletPage.styled"

const WalletPage: NextPage = () => {
  return (
    <Layout
      title="Wallet"
      type="card-lrg"
      heading="Wallet"
      description="Wallet Page"
    >
      <Styled.WalletCard>
        <AssetsTab />
      </Styled.WalletCard>
    </Layout>
  );
};

export default WalletPage;
