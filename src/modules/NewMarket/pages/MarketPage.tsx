import counterpart from "counterpart";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../../common/components";
import {
  // useMarketContext,
  useViewportContext,
} from "../../../common/providers";
import { Col } from "../../../ui/src";
import {
  HistoryTabs,
  MarketStats,
  PairModal,
  PairSelect,
  UsersOrdersTabs,
  Wallet,
} from "../components";

import * as Styled from "./MarketPage.styled";
import { useMarketPage } from "./hooks";

const MarketPage: NextPage = () => {
  const router = useRouter();
  const { pair } = router.query;
  const { md, xl } = useViewportContext();
  // const { ticker } = useMarketContext();
  const {
    // selectedPair,
    isPairModalVisible,
    handleClickOnPair,
    setIsPairModalVisible,
  } = useMarketPage({
    currentPair: pair as string,
  });

  const renderHistoryTabs = !xl ? (
    <Styled.RightBorderedVerticalFlexedCol xl={{ span: 5 }}>
      {/* Trade History Title */}
      <Styled.HistoryBox>
        <Styled.TradeHistoryContainer>
          <HistoryTabs />
        </Styled.TradeHistoryContainer>
      </Styled.HistoryBox>
    </Styled.RightBorderedVerticalFlexedCol>
  ) : (
    ""
  );

  const renderChartAndOrderBook = (
    <Styled.ChartsAndOrderBookRow>
      {/* Charts Section */}
      {!xl ? (
        <>
          <Styled.RightBorderedVerticalFlexedCol md={24} xl={16}>
            <Styled.PriceChartContainer>
              Price Chart Section
            </Styled.PriceChartContainer>
            <Styled.MarketDepthContainer>
              Market Depth Chart Section
            </Styled.MarketDepthContainer>
          </Styled.RightBorderedVerticalFlexedCol>
          {/* Order Book section */}
          <Col xl={8}>Order Book Section</Col>
        </>
      ) : (
        <Styled.VerticalFlexedCol md={24} xl={16}>
          <Styled.PriceChartContainer>
            Price Chart Section
          </Styled.PriceChartContainer>
        </Styled.VerticalFlexedCol>
      )}
    </Styled.ChartsAndOrderBookRow>
  );

  const renderTabs = !xl ? (
    <Styled.UserOrdersContainer>
      <UsersOrdersTabs />
    </Styled.UserOrdersContainer>
  ) : (
    <Styled.TabletTabsContainer>Tablet tabs</Styled.TabletTabsContainer>
  );

  return (
    <Layout
      title="market"
      type="card-xlrg"
      heading={counterpart.translate(`pages.market.heading`)}
      description={`Market Page | ${pair}`}
    >
      {/* Mobile view */}
      {md ? (
        <>
          <Styled.MobileAssetSelectorContainer>
            Asset Selector
          </Styled.MobileAssetSelectorContainer>
          <Styled.MobileStatsContainer>Stats</Styled.MobileStatsContainer>
          <Styled.MobileChartContainer>Chart</Styled.MobileChartContainer>
          <Styled.MobileTabsContainer>Tabs</Styled.MobileTabsContainer>
        </>
      ) : (
        <Styled.Container>
          <Styled.FullHeightRow>
            {/* Left Section */}
            {renderHistoryTabs}

            {/* Middle Section */}
            <Styled.RightBorderedVerticalFlexedCol
              md={{ span: 16 }}
              xl={{ span: 14 }}
            >
              {/* Stats Section */}
              <Styled.StatsBox>
                <MarketStats />
                {/* {tradingPairStats.volume}
                {tradingPairStats.latest}
                {tradingPairStats.percentChange} */}
              </Styled.StatsBox>

              {/* Charts and Order book Section */}
              {renderChartAndOrderBook}

              {/* Tabs section */}
              {renderTabs}
            </Styled.RightBorderedVerticalFlexedCol>

            {/* Right section */}
            <Styled.VerticalFlexedCol md={{ span: 8 }} xl={{ span: 5 }}>
              {/* Pair Selector */}
              <Styled.PairSelectorContainer>
                <PairSelect
                  handleClickOnPair={handleClickOnPair}
                  currentPair={pair as string}
                />
              </Styled.PairSelectorContainer>

              {/* Limit Order forms */}
              <Styled.LimitOrderFormContainer>
                Limit Order Form
              </Styled.LimitOrderFormContainer>

              {/* Wallet Sections */}
              <Styled.WalletContainer>
                <Wallet currentPair={pair as string} />
              </Styled.WalletContainer>
            </Styled.VerticalFlexedCol>
          </Styled.FullHeightRow>
          <PairModal
            isVisible={isPairModalVisible}
            setIsVisible={setIsPairModalVisible}
            currentPair={pair as string}
          />
        </Styled.Container>
      )}
    </Layout>
  );
};

export default MarketPage;
