import counterpart from "counterpart";
import { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Layout,
  PasswordModal,
  TransactionModal,
} from "../../../common/components";
import { useViewportContext } from "../../../common/providers";
import { Col, Form } from "../../../ui/src";
import {
  HistoryTabs,
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
  const {
    //selectedAssets,
    //loadingSelectedPair,
    userOpenOrdersRows,
    userOrderHistoryRows,
    userOpenOrdersColumns,
    userOrdersHistoriesColumns,
    loadingUserOrders,
    transactionMessageState,
    selectedOrderId,
    isPasswordModalVisible,
    isTransactionModalVisible,
    hidePasswordModal,
    handleCancelLimitOrderFinish,
    hideTransactionModal,
    cancelOrderFeeAmount,
    localStorageAccount,
    tradeHistoryColumns,
    tradeHistoryRows,
    loadingTradeHistory,
    setIsPairModalVisible,
    isPairModalVisible,
    handleClickOnPair,
    exchanges,
    userTradeHistoryRows,
  } = useMarketPage({
    currentPair: pair as string,
  });

  const renderHistoryTabs = !xl ? (
    <Styled.RightBorderedVerticalFlexedCol xl={{ span: 5 }}>
      {/* Trade History Title */}
      <Styled.HistoryBox>
        <Styled.TradeHistoryContainer>
          <HistoryTabs
            tradeHistoryRows={tradeHistoryRows}
            loadingTradeHistory={loadingTradeHistory}
            userTradeHistoryRows={userTradeHistoryRows}
            loadingUserTradeHistory={loadingUserOrders}
            tradeHistoryColumns={tradeHistoryColumns}
          />
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
      <UsersOrdersTabs
        userOpenOrdersRows={userOpenOrdersRows}
        userOrderHistoryRows={userOrderHistoryRows}
        userOpenOrdersColumns={userOpenOrdersColumns}
        userOrdersHistoriesColumns={userOrdersHistoriesColumns}
        loadingUserOrders={loadingUserOrders}
      />
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
              <Styled.StatsBox>678 PPY</Styled.StatsBox>

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
            exchanges={exchanges}
          />
        </Styled.Container>
      )}

      {/* Cancel order form */}
      <Form.Provider onFormFinish={handleCancelLimitOrderFinish}>
        <TransactionModal
          visible={isTransactionModalVisible}
          onCancel={hideTransactionModal}
          transactionMessageState={transactionMessageState}
          account={localStorageAccount}
          fee={cancelOrderFeeAmount}
          orderId={selectedOrderId}
          transactionType="limit_order_cancel"
        />
        <PasswordModal
          visible={isPasswordModalVisible}
          onCancel={hidePasswordModal}
          neededKeyType="active"
        />
      </Form.Provider>
    </Layout>
  );
};

export default MarketPage;
