import counterpart from "counterpart";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../../common/components";

import * as Styled from "./MarketPage.styled";

const MarketPage: NextPage = () => {
  const router = useRouter();
  const { pair } = router.query;
  return (
    <Layout
      title="market"
      type="card-xlrg"
      heading={counterpart.translate(`pages.market.heading`)}
      description={`Market Page | ${pair}`}
    >
      <Styled.Container>
        <div>Hello New Market Page</div>
      </Styled.Container>
    </Layout>
  );
};

export default MarketPage;
