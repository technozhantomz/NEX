import React from "react";

import Layout from "../../../../components/layout";
import { DepositTab } from "../../components/DepositTab";

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
        <DepositTab />
      </Styled.BodyContainer>
    </Layout>
  );
};

export default Dashboard;
