import React from "react";

import Layout from "../../../../components/layout";
import { SwapTab } from "../../components/SwapTab";
// import { DepositTab } from "../../components/DepositTab";
// import { WithdrawTab } from "../../components/WithdrawTab";

import * as Styled from "./Dashboard.styled";

const Dashboard: React.FC = () => {
  return (
    <Layout title="Deposit">
      <Styled.HeaderContainer>
        <Styled.HeaderContainerItem>
          <Styled.Btn>Deposit</Styled.Btn>
          <Styled.Btn>Wtihdraw</Styled.Btn>
          <Styled.Btn>Swap</Styled.Btn>
          <Styled.Btn>Market</Styled.Btn>
        </Styled.HeaderContainerItem>
      </Styled.HeaderContainer>
      <Styled.BodyContainer>
        {/* <DepositTab /> */}
        {/* <WithdrawTab /> */}
        <SwapTab />
      </Styled.BodyContainer>
    </Layout>
  );
};

export default Dashboard;
