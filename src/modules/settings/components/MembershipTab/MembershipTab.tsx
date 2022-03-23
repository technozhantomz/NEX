import { Form } from "antd";
import Link from "next/link";
import React from "react";

import { MembershipModal, PasswordModal } from "../../../../common/components";
import { CardFormButton } from "../../../../ui/src";

import * as Styled from "./MembershipTab.styled";
import { useMembershipTab } from "./hooks/useMembershipTab";

const allocationKeyLabels = [
  "Network",
  "Lifetime Reviewer",
  "Registrar",
  "Affiliate Referrer",
  "Membership Expiration",
];
const allocationKeys = [
  "network",
  "reviewer",
  "registrar",
  "referrer",
  "expiration",
];
export const MembershipTab = (): JSX.Element => {
  const {
    handleCancel,
    handleOk,
    confirmLoading,
    modalText,
    isMembershipModalVisible,
    visible,
    onCancel,
    onFormFinish,
    membershipForm,
    isEnableToPay,
    confirm,
    hideFooter,
    name,
    membershipData,
  } = useMembershipTab();

  const { origin } = window.location;
  const link = origin;

  return (
    <Styled.MembershipCard>
      <Form.Provider onFormFinish={onFormFinish}>
        <Form form={membershipForm} name="membershipForm" onFinish={confirm}>
          <MembershipModal
            visible={isMembershipModalVisible}
            onCancel={handleCancel}
            handleOk={handleOk}
            modalText={modalText}
            confirmLoading={confirmLoading}
            isEnableToPay={isEnableToPay}
            hideFooter={hideFooter}
          />

          <Styled.Space direction="vertical">
            {!membershipData?.isLifetimeMember ? (
              <Styled.Space direction="vertical">
                <Styled.TextHeader strong>
                  Upgrade for 80% Cashback
                </Styled.TextHeader>
                <Styled.Paragraph>
                  Lifetime Members get 80% cashback on every transaction fee
                  they pay and qualify to earn referral income from users they
                  register with or refer to the network. A Lifetime Membership
                  is just 5 PPY.
                </Styled.Paragraph>

                <Styled.BtnDiv>
                  <Form.Item>
                    <CardFormButton type="primary" htmlType="submit">
                      Buy lifetime subscription
                    </CardFormButton>
                  </Form.Item>
                </Styled.BtnDiv>
              </Styled.Space>
            ) : (
              <Styled.Space direction="vertical">
                <Styled.TextHeader strong>Your referral link</Styled.TextHeader>
                <Styled.Paragraph>
                  Give this to link to people you want to refer to BitShares:{" "}
                  {`${link}s/?r=${name}`}
                </Styled.Paragraph>
              </Styled.Space>
            )}

            <Styled.TextHeader strong>Fee Allocation</Styled.TextHeader>
            <Styled.Paragraph>
              Every time {`< ${name} >`} pays a transaction fee, that fee is
              divided among several different accounts
            </Styled.Paragraph>

            {allocationKeys.map((key, id) => {
              const item = membershipData?.allocation[key];
              return (
                <Styled.ListDiv key={id}>
                  <Styled.HeaderDiv>
                    <Styled.TextHeader>
                      {allocationKeyLabels[id]}
                    </Styled.TextHeader>{" "}
                    <br />
                    {item?.user && (
                      <Link href={`/user/${item.user}`}>{item.user}</Link>
                    )}
                  </Styled.HeaderDiv>
                  <Styled.PercentageDiv>
                    <Styled.PercentageText>
                      {item?.percent || item?.percent === 0
                        ? `${item.percent}%`
                        : item?.date}
                    </Styled.PercentageText>
                  </Styled.PercentageDiv>
                </Styled.ListDiv>
              );
            })}

            <Styled.TextHeader strong>Fee statistics</Styled.TextHeader>
            <Styled.ListDiv>
              <Styled.HeaderDiv>
                <Styled.TextHeader>Total fees paid</Styled.TextHeader> <br />
              </Styled.HeaderDiv>

              <Styled.PercentageDiv>
                <Styled.PercentageText>10 PPY</Styled.PercentageText>
              </Styled.PercentageDiv>
            </Styled.ListDiv>

            <Styled.TextHeader strong>Pending fees</Styled.TextHeader>
            <Styled.Paragraph>
              Fees paid by {`< ${name} >`} are divided among the network,
              referrers, and registrars once every maintenance interval (3600
              seconds). The next maintenance time is 24 Feb 2022 16:00:00.
            </Styled.Paragraph>

            <Styled.TextHeader strong>Vesting fees</Styled.TextHeader>
            <Styled.Paragraph>
              Most fees are made available immediately, but fees over 100 TEST
              (such as those paid to upgrade your membership or register a
              premium account name) must vest for a total of 90 days.
            </Styled.Paragraph>
          </Styled.Space>
          <PasswordModal visible={visible} onCancel={onCancel} />
        </Form>
      </Form.Provider>
    </Styled.MembershipCard>
  );
};
