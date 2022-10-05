import counterpart from "counterpart";
import Link from "next/link";
import React from "react";

import { defaultToken } from "../../../../api/params";
import { PasswordModal, TransactionModal } from "../../../../common/components";
import { useHandleTransactionForm } from "../../../../common/hooks";
import { InfoCircleOutlined } from "../../../../ui/src";

import * as Styled from "./MembershipTab.styled";
import { MembershipInfo } from "./components";
import { useMembershipTab } from "./hooks/useMembershipTab";

export const MembershipTab = (): JSX.Element => {
  const {
    transactionErrorMessage,
    transactionSuccessMessage,
    loadingTransaction,
    membershipForm,
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
    loadingAccountMembership,
    handleMembershipUpgrade,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
  } = useMembershipTab();

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: handleMembershipUpgrade,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    neededKeyType: "active",
  });

  return (
    <Styled.MembershipCard>
      <Styled.MembershipForm.Provider onFormFinish={handleFormFinish}>
        <Styled.MembershipForm
          form={membershipForm}
          name="membershipForm"
          onFinish={showPasswordModal}
        >
          <Styled.InfoContainer>
            <>
              {!isLifetimeMember ? (
                <>
                  {" "}
                  <Styled.Heading>
                    {counterpart.translate(
                      `pages.settings.membership.upgrade_title`,
                      { feesCashback }
                    )}
                  </Styled.Heading>
                  <Styled.Paragraph>
                    {counterpart.translate(
                      `pages.settings.membership.upgrade_description`,
                      { feesCashback, membershipPrice, defaultToken }
                    )}
                    {/* <InfoCircleOutlined /> */}
                  </Styled.Paragraph>
                  <Styled.ButtonContainer>
                    <Styled.Button
                      type="primary"
                      htmlType="submit"
                      disabled={
                        isLifetimeMember
                          ? isLifetimeMember
                          : loadingAccountMembership
                      }
                    >
                      {counterpart.translate(`buttons.buy_membership`)}
                    </Styled.Button>
                  </Styled.ButtonContainer>
                </>
              ) : (
                <>
                  <Styled.Heading>
                    {counterpart.translate(
                      `pages.settings.membership.upgraded_title`,
                      { feesCashback }
                    )}
                  </Styled.Heading>
                  <Styled.Paragraph>
                    {counterpart.translate(
                      `pages.settings.membership.upgraded_description`,
                      { feesCashback }
                    )}
                    {/* <InfoCircleOutlined /> */}
                  </Styled.Paragraph>
                </>
              )}
            </>

            <Styled.Heading>
              {counterpart.translate(
                `pages.settings.membership.fee_allocation`
              )}
              <InfoCircleOutlined />
            </Styled.Heading>
            <Styled.Paragraph>
              <MembershipInfo
                infoString={counterpart.translate(
                  `pages.settings.membership.fee_allocation_description`,
                  {
                    name: `[userlink = ${name}]`,
                    networkFee,
                    lifetimeFee,
                    referrerTotalFee,
                    referrerFee,
                    registrarFee,
                  }
                )}
              />
            </Styled.Paragraph>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>
                  {counterpart.translate(`pages.settings.membership.network`)}
                </Styled.Label>
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>{networkFee}%</Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>
                  {counterpart.translate(
                    `pages.settings.membership.lifetime_reviewer`
                  )}
                </Styled.Label>
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
                <Styled.Label>
                  {counterpart.translate(`pages.settings.membership.registrar`)}
                </Styled.Label>
                <Link href={`/user/${registrarName}`}>{registrarName}</Link>
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>{registrarFee}%</Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>
                  {counterpart.translate(
                    `pages.settings.membership.affiliate_referrer`
                  )}
                </Styled.Label>
                <Link href={`/user/${referrerName}`}>{referrerName}</Link>
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>{referrerFee}%</Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>
                  {counterpart.translate(
                    `pages.settings.membership.expiration`
                  )}
                </Styled.Label>
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>{expirationDate}</Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.Heading>
              {counterpart.translate(
                `pages.settings.membership.fee_statistics`
              )}
            </Styled.Heading>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>
                  {counterpart.translate(
                    `pages.settings.membership.total_fee_paid`
                  )}
                </Styled.Label>
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>
                  {`${paidFees} ${defaultToken}`}
                </Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.Heading>
              {counterpart.translate(`pages.settings.membership.pending_fees`)}
            </Styled.Heading>
            <Styled.Paragraph>
              <MembershipInfo
                infoString={counterpart.translate(
                  `pages.settings.membership.pending_fee_description`,
                  {
                    name: `[userlink = ${name}]`,
                    maintenanceInterval,
                    nextMaintenanceTime,
                  }
                )}
              />
            </Styled.Paragraph>
            <Styled.Heading>
              {counterpart.translate(`pages.settings.membership.vesting_fees`)}
            </Styled.Heading>
            <Styled.Paragraph>
              {counterpart.translate(
                `pages.settings.membership.vesting_description`,
                { vestingThreshold, defaultToken, vestingPeriod }
              )}
            </Styled.Paragraph>
          </Styled.InfoContainer>
          <PasswordModal
            visible={isPasswordModalVisible}
            onCancel={hidePasswordModal}
            neededKeyType="active"
          />
          <TransactionModal
            visible={isTransactionModalVisible}
            onCancel={hideTransactionModal}
            transactionErrorMessage={transactionErrorMessage}
            transactionSuccessMessage={transactionSuccessMessage}
            loadingTransaction={loadingTransaction}
            account={name}
            fee={membershipPrice}
            transactionType="account_upgrade"
          />
        </Styled.MembershipForm>
      </Styled.MembershipForm.Provider>
    </Styled.MembershipCard>
  );
};
