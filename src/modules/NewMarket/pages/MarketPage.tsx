import counterpart from "counterpart";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../../common/components";
import { Col } from "../../../ui/src";
import { TradeHistory, OrderBook } from "../componets";

import * as Styled from "./MarketPage.styled";
import { useMarketPage } from "./hooks";

const MarketPage: NextPage = () => {
  const router = useRouter();
  const { pair } = router.query;
  const {
    // tradingPairsStats,
    // loadingTradingPairsStats,
    // handleClickOnPair,
    selectedAssets,
    loadingSelectedPair,
    // isPairModalVisible,
    // setIsPairModalVisible,
    // exchanges,
    asks,
    bids,
    loadingAsksBids,
    // userOrdersRows,
    // loadingUserOrderRows,
    orderHistoryRows,
    loadingOrderHistoryRows,
    userOrderHistoryRows,
    loadingUserHistoryRows,
    // buyOrderForm,
    // sellOrderForm,
    // onOrderBookRowClick,
    // pageLoaded,
  } = useMarketPage({ currentPair: pair as string });
  const historyTabItems = [
    {
      label: counterpart.translate(`pages.market.tabs.history.all`),
      key: "all",
      children: (
        <Styled.TradeHistoryContainer>
          <TradeHistory
            selectedAssets={selectedAssets}
            loadingSelectedPair={loadingSelectedPair}
            orderHistoryRows={orderHistoryRows}
            loadingOrderHistoryRows={loadingOrderHistoryRows}
            userOrderHistoryRows={userOrderHistoryRows}
            loadingUserHistoryRows={loadingUserHistoryRows}
          />
        </Styled.TradeHistoryContainer>
      ),
    },
    {
      label: counterpart.translate(`pages.market.tabs.history.user`),
      key: "user",
      children: (
        <Styled.TradeHistoryContainer>
          <TradeHistory
            forUser={true}
            selectedAssets={selectedAssets}
            loadingSelectedPair={loadingSelectedPair}
            orderHistoryRows={orderHistoryRows}
            loadingOrderHistoryRows={loadingOrderHistoryRows}
            userOrderHistoryRows={userOrderHistoryRows}
            loadingUserHistoryRows={loadingUserHistoryRows}
          />
        </Styled.TradeHistoryContainer>
      ),
    },
  ];

  
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
              {/* <Styled.BoxHeader> */}
              <Styled.Tabs
                defaultActiveKey="1"
                centered={true}
                items={historyTabItems}
              />
              {/* </Styled.BoxHeader> */}
            </Styled.HistoryBox>
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
              <Col span={8}>
                <OrderBook 
                  selectedAssets={selectedAssets}
                  bids={bids}
                  asks={asks}
                  loadingAsksBids={loadingAsksBids}
                  loadingSelectedPair={loadingSelectedPair} 
                />
              </Col>
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
            </Styled.WalletContainer>
          </Styled.FlexedCol>
        </Styled.FullHeightRow>
      </Styled.Container>
    </Layout>
  );
};

export default MarketPage;
