import Link from "next/link";
import React from "react";

import { defaultToken } from "../../../../api/params";
import { PasswordModal } from "../../../../common/components";

import * as Styled from "./MembershipTab.styled";
import { MembershipModal } from "./components/MembershipModal";
import { useMembershipTab } from "./hooks/useMembershipTab";

export const MembershipTab = (): JSX.Element => {
  const {
    handleMembershipModalCancel,
    handleMembershipModalConfirm,
    transactionErrorMessage,
    transactionSuccessMessage,
    loadingTransaction,
    isMembershipModalVisible,
    isPasswordModalVisible,
    submittingPassword,
    handlePasswordModalCancel,
    onFormFinish,
    membershipForm,
    confirm,
    name,
    feesCashback,
    membershipPrice,
    networkFee,
    lifetimeFee,
    referrerTotalFee,
    referrerFee,
    registrarFee,
    vestingThreshold,
    vestingPeriod,
    isLifetimeMember,
    maintenanceInterval,
    nextMaintenanceTime,
    lifetimeReferrerName,
    referrerName,
    registrarName,
    paidFees,
    expirationDate,
  } = useMembershipTab();

  const { origin } = window.location;
  const link = origin;

  return (
    <Styled.MembershipCard>
      <Styled.MembershipForm.Provider onFormFinish={onFormFinish}>
        <Styled.MembershipForm
          form={membershipForm}
          name="membershipForm"
          onFinish={confirm}
        >
          <MembershipModal
            visible={isMembershipModalVisible}
            onCancel={handleMembershipModalCancel}
            handleOk={handleMembershipModalConfirm}
            transactionErrorMessage={transactionErrorMessage}
            transactionSuccessMessage={transactionSuccessMessage}
            loadingTransaction={loadingTransaction}
            account={name}
            fee={membershipPrice}
          />
          <Styled.Space direction="vertical">
            {!isLifetimeMember ? (
              <Styled.Space direction="vertical">
                <Styled.Heading>
                  {`Upgrade for ${feesCashback}% Cashback`}
                </Styled.Heading>
                <Styled.Paragraph>
                  {`Lifetime Members get ${feesCashback}% cashback on every
                  transaction fee they pay and qualify to earn referral income
                  from users they register with or refer to the network. A
                  Lifetime Membership is just ${membershipPrice} ${defaultToken}.`}
                </Styled.Paragraph>
                <Styled.ButtonContainer>
                  <Styled.Button type="primary" htmlType="submit">
                    Buy lifetime subscription
                  </Styled.Button>
                </Styled.ButtonContainer>
              </Styled.Space>
            ) : (
              <Styled.Space direction="vertical">
                <Styled.Label>Your referral link</Styled.Label>
                <Styled.Paragraph>
                  {`Give this to link to people you want to refer to Peerplays: ${link}/signup/?r=${name}`}
                </Styled.Paragraph>
              </Styled.Space>
            )}
            <Styled.Heading>Fee Allocation</Styled.Heading>
            <Styled.Paragraph>
              Every time {name} pays a transaction fee, that fee is divided
              among several different accounts.
            </Styled.Paragraph>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>Network</Styled.Label> <br />
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>{networkFee}%</Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>Lifetime Referrer</Styled.Label> <br />
                <Link href={`/user/${lifetimeReferrerName}`}>
                  {lifetimeReferrerName}
                </Link>
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>{lifetimeFee}%</Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>Registrar</Styled.Label> <br />
                <Link href={`/user/${registrarName}`}>{registrarName}</Link>
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>{registrarFee}%</Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>Affiliate Referrer</Styled.Label> <br />
                <Link href={`/user/${referrerName}`}>{referrerName}</Link>
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>{referrerFee}%</Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>Membership expiration</Styled.Label> <br />
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>{expirationDate}</Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.Heading>Fee statistics</Styled.Heading>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>Total fees paid</Styled.Label> <br />
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>
                  {`${paidFees} ${defaultToken}`}
                </Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.Heading>Pending fees</Styled.Heading>
            <Styled.Paragraph>
              {`Fees paid by ${name} are divided among the network, referrers, and registrars 
              once every maintenance interval (${maintenanceInterval} seconds). 
              The next maintenance time is ${nextMaintenanceTime}.`}
            </Styled.Paragraph>
            <Styled.Heading>Vesting fees</Styled.Heading>
            <Styled.Paragraph>
              {`Most fees are made available immediately, 
              but fees over ${vestingThreshold} ${defaultToken} 
              (such as those paid to upgrade your membership or register a premium account name) 
              must vest for a total of ${vestingPeriod} days.`}
            </Styled.Paragraph>
          </Styled.Space>
          <PasswordModal
            visible={isPasswordModalVisible}
            onCancel={handlePasswordModalCancel}
            submitting={submittingPassword}
          />
        </Styled.MembershipForm>
      </Styled.MembershipForm.Provider>
    </Styled.MembershipCard>
  );
};
