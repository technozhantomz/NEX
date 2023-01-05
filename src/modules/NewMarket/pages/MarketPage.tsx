import counterpart from "counterpart";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../../common/components";
import { Col } from "../../../ui/src";

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
        <Styled.FullHeightRow>
          <Col span={5}>Hello left</Col>
          <Col span={14}>Hello middle</Col>
          <Col span={5}>Hello Rigth</Col>
        </Styled.FullHeightRow>
      </Styled.Container>
    </Layout>
  );
};

export default MarketPage;
