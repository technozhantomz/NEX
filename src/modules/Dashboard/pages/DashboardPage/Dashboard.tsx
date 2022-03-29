import React, { useState } from "react";

import { Layout } from "../../../../common/components";
import { DepositTab, WithdrawTab } from "../../components";
//import { MarketTab } from "../../components/MarketTab";
//import { SwapTab } from "../../components/SwapTab";
//import { WithdrawTab } from "../../components/WithdrawTab";

import * as Styled from "./Dashboard.styled";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Deposit");

  const changeTab = (tab: string) => {
    setActiveTab(tab);
  };

  const Tabs = [
    { tabName: "Deposit" },
    { tabName: "Withdraw" },
    // { tabName: "Swap" },
    // { tabName: "Market" },
  ];
  return (
    <Layout title="Deposit">
      <Styled.HeaderContainer>
        <Styled.HeaderContainerItem>
          <Styled.Row gutter={4}>
            {Tabs.map((e, i) => (
              <Styled.Col key={i} className="gutter-row" span={6}>
                <Styled.Buttons onClick={() => changeTab(e.tabName)}>
                  <Styled.ButtonNames> {e.tabName}</Styled.ButtonNames>
                </Styled.Buttons>
              </Styled.Col>
            ))}
          </Styled.Row>
        </Styled.HeaderContainerItem>
      </Styled.HeaderContainer>
      <Styled.BodyContainer>
        {activeTab === "Deposit" && <DepositTab />}
        {activeTab === "Withdraw" && <WithdrawTab />}
        {/* {activeTab === "Swap" && <SwapTab />}
        {activeTab === "Market" && <MarketTab />} */}
      </Styled.BodyContainer>
    </Layout>
  );
};

export default Dashboard;
