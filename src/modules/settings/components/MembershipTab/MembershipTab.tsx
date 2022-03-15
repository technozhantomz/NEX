import React from "react";

import { DashboardButton } from "../../../../common/components/DashboardButton";

import * as Styled from "./MembershipTab.styled";

export const MembershipTab = (): JSX.Element => {
  return (
    <Styled.MembershipCard>
      <Styled.Space direction="vertical">
        <Styled.TextHeader strong>Upgrade for 80% Cashback</Styled.TextHeader>
        <Styled.Paragraph>
          Lifetime Members get 80% cashback on every transaction fee they pay
          and qualify to earn referral income from users they register with or
          refer to the network. A Lifetime Membership is just 5 PPY.
        </Styled.Paragraph>
        <DashboardButton label="Buy lifetime subscription" />
        <Styled.TextHeader strong>Fee Allocation</Styled.TextHeader>
        <Styled.Paragraph>
          Every time pays a transaction fee, that fee is divided among several
          different accounts
        </Styled.Paragraph>

        <Styled.ListDiv>
          <Styled.HeaderDiv>
            <Styled.TextHeader>Network reviewer</Styled.TextHeader> <br />
          </Styled.HeaderDiv>

          <Styled.PercentageDiv>
            <Styled.PercentageText>100%</Styled.PercentageText>
          </Styled.PercentageDiv>
        </Styled.ListDiv>

        <Styled.ListDiv>
          <Styled.HeaderDiv>
            <Styled.TextHeader>Network reviewer</Styled.TextHeader> <br />
            <Styled.TextHeader>Lifetime reviewer</Styled.TextHeader>
          </Styled.HeaderDiv>

          <Styled.PercentageDiv>
            <Styled.PercentageText>100%</Styled.PercentageText>
          </Styled.PercentageDiv>
        </Styled.ListDiv>

        <Styled.ListDiv>
          <Styled.HeaderDiv>
            <Styled.TextHeader>Network reviewer</Styled.TextHeader> <br />
            <Styled.TextHeader>Lifetime reviewer</Styled.TextHeader>
          </Styled.HeaderDiv>

          <Styled.PercentageDiv>
            <Styled.PercentageText>100%</Styled.PercentageText>
          </Styled.PercentageDiv>
        </Styled.ListDiv>

        <Styled.ListDiv>
          <Styled.HeaderDiv>
            <Styled.TextHeader>Network reviewer</Styled.TextHeader> <br />
            <Styled.TextHeader>Lifetime reviewer</Styled.TextHeader>
          </Styled.HeaderDiv>

          <Styled.PercentageDiv>
            <Styled.PercentageText>100%</Styled.PercentageText>
          </Styled.PercentageDiv>
        </Styled.ListDiv>

        <Styled.ListDiv>
          <Styled.HeaderDiv>
            <Styled.TextHeader>Network reviewer</Styled.TextHeader> <br />
            <Styled.TextHeader>Lifetime reviewer</Styled.TextHeader>
          </Styled.HeaderDiv>

          <Styled.PercentageDiv>
            <Styled.PercentageText>100%</Styled.PercentageText>
          </Styled.PercentageDiv>
        </Styled.ListDiv>

        <Styled.ListDiv>
          <Styled.HeaderDiv>
            <Styled.TextHeader>Network reviewer</Styled.TextHeader> <br />
            <Styled.TextHeader>Lifetime reviewer</Styled.TextHeader>
          </Styled.HeaderDiv>

          <Styled.PercentageDiv>
            <Styled.PercentageText>100%</Styled.PercentageText>
          </Styled.PercentageDiv>
        </Styled.ListDiv>
      </Styled.Space>
    </Styled.MembershipCard>
  );
};
