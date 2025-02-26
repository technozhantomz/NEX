import counterpart from "counterpart";
import { useRouter } from "next/router";

import { Layout } from "../../../../common/components";
import { DepositTab, MarketTab, SwapTab, WithdrawTab } from "../../components";

import * as Styled from "./Dashboard.styled";

const Dashboard = (): JSX.Element => {
  const router = useRouter();
  const { tab } = router.query;
  const changeTab = (tab: string) => {
    router.push(`/?tab=${tab}`);
  };
  const activeTab = tab ? (tab as string).toLowerCase() : "market";
  const tabs = ["market", "swap", "deposit", "withdraw"];

  return (
    <Layout title="Dashboard">
      <Styled.HeaderContainer>
        <Styled.HeaderContainerItem>
          <Styled.Row gutter={4}>
            {tabs.map((tab) => (
              <Styled.Col key={tab} className="gutter-row" span={6}>
                <Styled.Buttons
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => changeTab(tab)}
                >
                  <Styled.ButtonNames>
                    {counterpart.translate(`buttons.${tab}`)}
                  </Styled.ButtonNames>
                </Styled.Buttons>
              </Styled.Col>
            ))}
          </Styled.Row>
        </Styled.HeaderContainerItem>
      </Styled.HeaderContainer>
      <Styled.BodyContainer>
        {activeTab === "market" && <MarketTab />}
        {activeTab === "swap" && <SwapTab />}
        {activeTab === "deposit" && <DepositTab />}
        {activeTab === "withdraw" && <WithdrawTab />}
      </Styled.BodyContainer>
    </Layout>
  );
};

export default Dashboard;
