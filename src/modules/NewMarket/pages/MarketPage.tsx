import counterpart from "counterpart";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../../common/components";
import { Col } from "../../../ui/src";
import { Balances } from "../components/Balances";

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
          {/* Left Section */}
          <Styled.RightBorderedFlexedCol span={5}>
            {/* Trade History Title */}
            <Styled.HistoryBox>
              <Styled.BoxHeader>Trade history</Styled.BoxHeader>
            </Styled.HistoryBox>

            {/* Trade History Table */}
            <Styled.TradeHistoryContainer>
              History data table
            </Styled.TradeHistoryContainer>
          </Styled.RightBorderedFlexedCol>

          {/* Middle Section */}
          <Styled.RightBorderedFlexedCol span={14}>
            {/* Stats Section */}
            <Styled.StatsBox>678 PPY</Styled.StatsBox>

            {/* Charts and Order book Section */}
            <Styled.ChartsAndOrderBookRow>
              {/* Charts Section */}
              <Styled.RightBorderedFlexedCol span={16}>
                <Styled.PriceChartContainer>
                  Price Chart Section
                </Styled.PriceChartContainer>
                <Styled.MarketDepthContainer>
                  Market Depth Chart Section
                </Styled.MarketDepthContainer>
              </Styled.RightBorderedFlexedCol>
              {/* Order Book section */}
              <Col span={8}>Order Book Section</Col>
            </Styled.ChartsAndOrderBookRow>

            {/* My Open order and My History section */}
            <Styled.UserOrdersContainer>
              My Open Orders and My Orders History
            </Styled.UserOrdersContainer>
          </Styled.RightBorderedFlexedCol>

          {/* Right section */}
          <Styled.FlexedCol span={5}>
            {/* Pair Selector */}
            <Styled.PairSelectorContainer>
              Pair selector
            </Styled.PairSelectorContainer>

            {/* Limit Order forms */}
            <Styled.LimitOrderFormContainer>
              Limit Order Form
            </Styled.LimitOrderFormContainer>

            {/* Wallet Sections */}
            <Styled.WalletContainer>
              Wallet Functionalities
              <Balances />
            </Styled.WalletContainer>
          </Styled.FlexedCol>
        </Styled.FullHeightRow>
      </Styled.Container>
    </Layout>
  );
};

export default MarketPage;
