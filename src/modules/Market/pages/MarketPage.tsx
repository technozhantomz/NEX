import counterpart from "counterpart";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../../common/components";
import { useViewportContext } from "../../../common/providers";
import { Col } from "../../../ui/src";
import {
  ControlsTabs,
  HistoryTabs,
  MarketStats,
  OrderBook,
  PairModal,
  PairSelect,
  PriceChart,
  UsersOrdersTabs,
  Wallet,
} from "../components";

import * as Styled from "./MarketPage.styled";
import { useMarketPage } from "./hooks";

const MarketPage: NextPage = () => {
  const router = useRouter();
  const { pair } = router.query;
  const { md, xxl } = useViewportContext();
  const { isPairModalVisible, handleClickOnPair, setIsPairModalVisible } =
    useMarketPage({
      currentPair: pair as string,
    });

  const renderHistoryTabs = !xxl ? (
    <Styled.RightBorderedVerticalFlexedCol xxl={{ span: 5 }}>
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
      {!xxl ? (
        <>
          <Styled.RightBorderedVerticalFlexedCol md={24} xxl={16}>
            <Styled.PriceChartContainer>
              <PriceChart />
            </Styled.PriceChartContainer>
            <Styled.MarketDepthContainer>
              Market Depth Chart Section
            </Styled.MarketDepthContainer>
          </Styled.RightBorderedVerticalFlexedCol>
          {/* Order Book section */}
          <Col xxl={8}>
            <OrderBook currentPair={pair as string} />
          </Col>
        </>
      ) : (
        <Styled.VerticalFlexedCol md={24} xxl={16}>
          <Styled.PriceChartContainer>
            <PriceChart />
          </Styled.PriceChartContainer>
        </Styled.VerticalFlexedCol>
      )}
    </Styled.ChartsAndOrderBookRow>
  );

  const renderTabs = !xxl ? (
    <Styled.UserOrdersContainer>
      <UsersOrdersTabs />
    </Styled.UserOrdersContainer>
  ) : (
    <Styled.TabletTabsContainer>
      <UsersOrdersTabs />
    </Styled.TabletTabsContainer>
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
            <PairSelect
              handleClickOnPair={handleClickOnPair}
              currentPair={pair as string}
            />
          </Styled.MobileAssetSelectorContainer>
          <Styled.MobileStatsContainer>
            <MarketStats />
          </Styled.MobileStatsContainer>
          <Styled.MobileChartContainer>
            <PriceChart />
          </Styled.MobileChartContainer>
          <Styled.MobileTabsContainer>
            <UsersOrdersTabs />
          </Styled.MobileTabsContainer>
        </>
      ) : (
        <Styled.Container>
          <Styled.FullHeightRow>
            {/* Left Section */}
            {renderHistoryTabs}

            {/* Middle Section */}
            <Styled.RightBorderedVerticalFlexedCol
              md={{ span: 16 }}
              xxl={{ span: 14 }}
            >
              {/* Stats Section */}
              <Styled.StatsBox>
                <MarketStats />
              </Styled.StatsBox>

              {/* Charts and Order book Section */}
              {renderChartAndOrderBook}

              {/* Tabs section */}
              {renderTabs}
            </Styled.RightBorderedVerticalFlexedCol>

            {/* Right section */}
            <Styled.VerticalFlexedCol md={{ span: 8 }} xxl={{ span: 5 }}>
              {/* Pair Selector */}
              <Styled.PairSelectorContainer>
                <PairSelect
                  handleClickOnPair={handleClickOnPair}
                  currentPair={pair as string}
                />
              </Styled.PairSelectorContainer>

              {/* Limit Order forms */}
              <Styled.LimitOrderFormContainer>
                <ControlsTabs />
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
