import { useRouter } from "next/router";
import React, { useState } from "react";

import { Layout } from "../../../../common/components";
import { DepositTab, MarketTab, WithdrawTab } from "../../components";
//import { SwapTab } from "../../components/SwapTab";

import * as Styled from "./Dashboard.styled";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { tab } = router.query;
  const [activeTab, setActiveTab] = useState<string>(
    tab ? (tab as string) : "Deposit"
  );

  const changeTab = (tab: string) => {
    setActiveTab(tab);
    router.push(`/dashboard?tab=${tab.toLowerCase()}`);
  };

  const Tabs = [
    { tabName: "Deposit" },
    { tabName: "Withdraw" },
    // { tabName: "Swap" },
    { tabName: "Market" },
  ];
  return (
    <Layout title="Dashboard">
      <Styled.HeaderContainer>
        <Styled.HeaderContainerItem>
          <Styled.Row gutter={4}>
            {Tabs.map((e, i) => (
              <Styled.Col key={i} className="gutter-row" span={6}>
                <Styled.Buttons
                  className={
                    activeTab.toLowerCase() === e.tabName.toLowerCase()
                      ? "active"
                      : ""
                  }
                  onClick={() => changeTab(e.tabName)}
                >
                  <Styled.ButtonNames>{e.tabName}</Styled.ButtonNames>
                </Styled.Buttons>
              </Styled.Col>
            ))}
          </Styled.Row>
        </Styled.HeaderContainerItem>
      </Styled.HeaderContainer>
      <Styled.BodyContainer>
        {!activeTab ||
          ((activeTab.toLowerCase() === "Deposit".toLowerCase() ||
            activeTab.toLowerCase() === "") && <DepositTab />)}
        {activeTab.toLowerCase() === "Withdraw".toLowerCase() && (
          <WithdrawTab />
        )}
        {/* {activeTab === "Swap" && <SwapTab />} */}
        {activeTab.toLowerCase() === "Market".toLowerCase() && <MarketTab />}
      </Styled.BodyContainer>
    </Layout>
  );
};

export default Dashboard;
