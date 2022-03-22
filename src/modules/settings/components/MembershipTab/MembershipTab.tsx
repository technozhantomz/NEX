import { Form } from "antd";
import React from "react";

import { MembershipModal, PasswordModal } from "../../../../common/components";
import { CardFormButton } from "../../../../ui/src";

import * as Styled from "./MembershipTab.styled";
import { useMembershipTab } from "./hooks/useMembershipTab";

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
    inProgress,
    name,
  } = useMembershipTab();

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
            inProgress={inProgress}
          />

          <Styled.Space direction="vertical">
            <Styled.TextHeader strong>
              Upgrade for 80% Cashback
            </Styled.TextHeader>
            <Styled.Paragraph>
              Lifetime Members get 80% cashback on every transaction fee they
              pay and qualify to earn referral income from users they register
              with or refer to the network. A Lifetime Membership is just 5 PPY.
            </Styled.Paragraph>
            <Styled.BtnDiv>
              <Form.Item>
                <CardFormButton type="primary" htmlType="submit">
                  Buy lifetime subscription
                </CardFormButton>
              </Form.Item>
            </Styled.BtnDiv>

            <Styled.TextHeader strong>Fee Allocation</Styled.TextHeader>
            <Styled.Paragraph>
              Every time {`< ${name} >`} pays a transaction fee, that fee is
              divided among several different accounts
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
                <Styled.TextHeader>Lifetime reviewer</Styled.TextHeader> <br />
                <a>pbsa-official</a>
              </Styled.HeaderDiv>

              <Styled.PercentageDiv>
                <Styled.PercentageText>0%</Styled.PercentageText>
              </Styled.PercentageDiv>
            </Styled.ListDiv>

            <Styled.ListDiv>
              <Styled.HeaderDiv>
                <Styled.TextHeader>Registrar</Styled.TextHeader> <br />
                <a>pbsa-official</a>
              </Styled.HeaderDiv>

              <Styled.PercentageDiv>
                <Styled.PercentageText>0%</Styled.PercentageText>
              </Styled.PercentageDiv>
            </Styled.ListDiv>

            <Styled.ListDiv>
              <Styled.HeaderDiv>
                <Styled.TextHeader>Affiliate referrer</Styled.TextHeader> <br />
                <a>pbsa-official</a>
              </Styled.HeaderDiv>

              <Styled.PercentageDiv>
                <Styled.PercentageText>0%</Styled.PercentageText>
              </Styled.PercentageDiv>
            </Styled.ListDiv>

            <Styled.ListDiv>
              <Styled.HeaderDiv>
                <Styled.TextHeader>Membership expiration</Styled.TextHeader>{" "}
                <br />
                <a>pbsa-official</a>
              </Styled.HeaderDiv>

              <Styled.PercentageDiv>
                <Styled.PercentageText>NA</Styled.PercentageText>
              </Styled.PercentageDiv>
            </Styled.ListDiv>

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
