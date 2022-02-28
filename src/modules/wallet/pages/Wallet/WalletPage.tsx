import type { NextPage } from "next";

import Layout from "../../../../common/components/PageLayout/layout";
import AssetsTable from "../../componets/AssetsTable";

import * as Styled from "./WalletPage.styled";

const WalletPage: NextPage = () => {
  return (
    <Layout
      title="Wallet"
      type="card-lrg"
      heading="Wallet"
      description="Wallet Page"
      dexLayout={true}
    >
      <Styled.WalletCard>
        <AssetsTable  />
      </Styled.WalletCard>
    </Layout>
  );
};

export default WalletPage;
