import counterpart from "counterpart";
import { KeyboardEvent } from "react";

import {
  DashboardLoginButton,
  DownloadBitcoinKeys,
  GenerateBitcoinAddress,
  LoadingIndicator,
  LogoSelectOption,
  PasswordModal,
  TransactionModal,
} from "..";
import { utils } from "../../../api/utils";
import { Form, Input } from "../../../ui/src";
import BitcoinIcon from "../../../ui/src/icons/Cryptocurrencies/BitcoinIcon.svg";
import HIVEIcon from "../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import { useAsset, useHandleTransactionForm } from "../../hooks";
import { useAssetsContext, useUserContext } from "../../providers";
import { SidechainAcccount } from "../../types";

import * as Styled from "./WithdrawForm.styled";
import { useWithdrawForm } from "./hooks";

type Props = {
  asset: string;
  withAssetSelector?: boolean;
};

export const WithdrawForm = ({
  asset,
  withAssetSelector,
}: Props): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const { defaultAsset, sidechainAssets } = useAssetsContext();
  const { limitByPrecision } = useAsset();
  const {
    feeAmount,
    withdrawForm,
    formValdation,
    handleValuesChange,
    selectedAsset,
    handleAssetChange,
    transactionErrorMessage,
    setTransactionErrorMessage,
    transactionSuccessMessage,
    setTransactionSuccessMessage,
    handleWithdraw,
    loadingTransaction,
    amount,
    withdrawAddress,
    userBalance,
    withdrawFee,
    btcTransferFee,
    selectedAssetPrecission,
    hasBTCDepositAddress,
    bitcoinSidechainAccount,
    getSidechainAccounts,
    loadingSidechainAccounts,
  } = useWithdrawForm(asset);

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: handleWithdraw,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    neededKeyType: "active",
  });

  const precisedAmount = limitByPrecision(
    String(amount),
    selectedAssetPrecission
  );

  const isLoggedIn = localStorageAccount && localStorageAccount !== "";

  const renderUserBalance = isLoggedIn ? (
    <Styled.Balance>{`${counterpart.translate(
      `field.labels.balance`
    )}: ${userBalance}`}</Styled.Balance>
  ) : (
    ""
  );

  const submitButton = (
    <>
      <Styled.WithdrawFormButton type="primary" htmlType="submit">
        {counterpart.translate(`buttons.withdraw`)}
      </Styled.WithdrawFormButton>
    </>
  );

  const feeLabel =
    selectedAsset === "BTC"
      ? counterpart.translate(`field.labels.estimated_fees_label`)
      : counterpart.translate(`field.labels.fees_label`);

  const feeSummary: (inTotal?: boolean) => string | JSX.Element = (
    inTotal = false
  ) => {
    const BtcFeeSummary = inTotal ? (
      <>
        <div>{`+ ${withdrawFee} ${
          defaultAsset ? defaultAsset.symbol : ""
        }`}</div>
        <div>+ {`${btcTransferFee} BTC`}</div>
      </>
    ) : (
      <>
        <div>{`${withdrawFee} ${defaultAsset ? defaultAsset.symbol : ""}`}</div>
        <div>+ {`${btcTransferFee} BTC`}</div>
      </>
    );

    const HiveFeeSummary = inTotal
      ? `+ ${withdrawFee}
    ${defaultAsset ? defaultAsset.symbol : ""}`
      : `${withdrawFee}
    ${defaultAsset ? defaultAsset.symbol : ""}`;

    return selectedAsset === "BTC" ? BtcFeeSummary : HiveFeeSummary;
  };

  const totalTransaction = (
    <>
      <div>{`${precisedAmount} ${selectedAsset}`}</div>
      <>{feeSummary(true)}</>
    </>
  );
  const confirmationTime =
    selectedAsset === "BTC"
      ? counterpart.translate(`field.labels.btc_withdrawal_confirmation_time`)
      : counterpart.translate(`field.labels.hive_withdrawal_confirmation_time`);

  const transactionDetails = (
    <Styled.TransactionDetails>
      <Styled.DetailsWrapper>
        <Styled.DetailsLabelWrapper>{feeLabel}</Styled.DetailsLabelWrapper>
        <Styled.AmountsWrapper>{feeSummary()}</Styled.AmountsWrapper>
      </Styled.DetailsWrapper>
      <Styled.DetailsWrapper>
        <Styled.DetailsLabelWrapper>
          {counterpart.translate(`field.labels.total_transaction`)}
        </Styled.DetailsLabelWrapper>
        <Styled.AmountsWrapper>{totalTransaction}</Styled.AmountsWrapper>
      </Styled.DetailsWrapper>
      <Styled.DetailsWrapper>
        <Styled.DetailsLabelWrapper>
          {counterpart.translate(`field.labels.withdrawal_confirmation_time`)}
        </Styled.DetailsLabelWrapper>
        <Styled.AmountsWrapper>{confirmationTime}</Styled.AmountsWrapper>
      </Styled.DetailsWrapper>
    </Styled.TransactionDetails>
  );

  const btcFormBody = hasBTCDepositAddress ? (
    <>
      <Form.Item
        name="from"
        rules={formValdation.from}
        validateFirst={true}
        initialValue={localStorageAccount}
        hidden={withAssetSelector ? true : false}
      >
        <Input disabled={true} placeholder="From" />
      </Form.Item>
      {/* fieldLabel */}
      {withAssetSelector ? (
        <p className="label">
          {counterpart.translate(`field.labels.withdraw_public_key_address`)}
        </p>
      ) : (
        ""
      )}
      <Form.Item
        name="withdrawPublicKey"
        validateFirst={true}
        rules={formValdation.withdrawPublicKey}
      >
        <Input
          placeholder={counterpart.translate(
            `field.placeholder.withdraw_public_key`
          )}
          autoComplete="new-password"
          className="form-input"
          disabled={!isLoggedIn}
        />
      </Form.Item>
      <Form.Item
        name="withdrawAddress"
        validateFirst={true}
        rules={formValdation.withdrawAddress}
      >
        <Input
          placeholder={counterpart.translate(
            `field.placeholder.hive_blockchain_account`
          )}
          className="form-input"
          disabled={localStorageAccount ? false : true}
        />
      </Form.Item>
      {!withAssetSelector ? (
        <Form.Item
          name="amount"
          validateFirst={true}
          rules={formValdation.amount}
        >
          <Input
            placeholder={counterpart.translate(`field.placeholder.amount`)}
            type="number"
            step="any"
            min={0}
            onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
              if (!utils.isNumberKey(e)) {
                e.preventDefault();
              }
            }}
            disabled={localStorageAccount ? false : true}
          />
        </Form.Item>
      ) : (
        ""
      )}
      <Styled.WithdrawalInstruction>
        <Styled.IconWrapper>
          <BitcoinIcon height="30" width="30" />
        </Styled.IconWrapper>
        <span>
          {counterpart.translate(`field.labels.btc_withdraw_instruction`)}
        </span>
      </Styled.WithdrawalInstruction>
      <DownloadBitcoinKeys
        bitcoinSidechainAccount={bitcoinSidechainAccount as SidechainAcccount}
        getSidechainAccounts={getSidechainAccounts}
      />
      {transactionDetails}
      {submitButton}
    </>
  ) : (
    ""
  );

  const hiveFormBody = (
    <>
      <Form.Item
        name="from"
        rules={formValdation.from}
        validateFirst={true}
        initialValue={localStorageAccount}
        hidden={withAssetSelector ? true : false}
      >
        <Input disabled={true} placeholder="From" />
      </Form.Item>
      {withAssetSelector ? (
        <p className="label">
          {counterpart.translate(`field.labels.hive_blockchain_account`)}
        </p>
      ) : (
        ""
      )}
      <Form.Item
        name="withdrawAddress"
        validateFirst={true}
        rules={formValdation.withdrawAddress}
      >
        <Input
          placeholder={counterpart.translate(
            `field.placeholder.hive_blockchain_account`
          )}
          className="form-input"
          disabled={localStorageAccount ? false : true}
        />
      </Form.Item>
      {!withAssetSelector ? (
        <Form.Item
          name="amount"
          validateFirst={true}
          rules={formValdation.amount}
        >
          <Input
            placeholder={counterpart.translate(`field.placeholder.amount`)}
            type="number"
            step="any"
            min={0}
            onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
              if (!utils.isNumberKey(e)) {
                e.preventDefault();
              }
            }}
            disabled={localStorageAccount ? false : true}
          />
        </Form.Item>
      ) : (
        ""
      )}
      <Styled.WithdrawalInstruction>
        <Styled.IconWrapper>
          <HIVEIcon width="30" height="30" />
        </Styled.IconWrapper>
        <span>
          {counterpart.translate(`field.labels.hive_withdraw_instruction`, {
            asset: selectedAsset,
          })}
        </span>
      </Styled.WithdrawalInstruction>
      {transactionDetails}
      {submitButton}
    </>
  );

  const formBody = selectedAsset === "BTC" ? btcFormBody : hiveFormBody;

  const formBodyWithLoading = loadingSidechainAccounts ? (
    <LoadingIndicator />
  ) : (
    formBody
  );

  return (
    <>
      <Form.Provider onFormFinish={handleFormFinish}>
        <Styled.WithdrawForm
          form={withdrawForm}
          name="withdrawForm"
          onFinish={showPasswordModal}
          onValuesChange={handleValuesChange}
          size="large"
          validateTrigger={["onChange", "onSubmit"]}
        >
          {withAssetSelector ? (
            <>
              <Styled.WithdrawFormAssetAmount
                name="amount"
                validateFirst={true}
                rules={formValdation.amount}
                withassetselector={withAssetSelector}
              >
                <Input
                  placeholder="0.0"
                  type="number"
                  step="any"
                  min={0}
                  onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (!utils.isNumberKey(e)) {
                      e.preventDefault();
                    }
                  }}
                  prefix={
                    <Styled.WithdrawFormAsset>
                      <LogoSelectOption
                        assets={sidechainAssets}
                        value={selectedAsset}
                        onChange={handleAssetChange}
                      />
                      {renderUserBalance}
                    </Styled.WithdrawFormAsset>
                  }
                  disabled={!isLoggedIn}
                  autoComplete="new-password"
                />
              </Styled.WithdrawFormAssetAmount>
            </>
          ) : (
            ""
          )}

          {isLoggedIn ? (
            <>{formBodyWithLoading}</>
          ) : (
            <DashboardLoginButton
              buttonText={counterpart.translate(`buttons.log_in_withdraw`, {
                selectedAsset: selectedAsset,
              })}
            />
          )}
        </Styled.WithdrawForm>

        <PasswordModal
          neededKeyType="active"
          visible={isPasswordModalVisible}
          onCancel={hidePasswordModal}
        />
        <TransactionModal
          visible={isTransactionModalVisible}
          onCancel={hideTransactionModal}
          transactionErrorMessage={transactionErrorMessage}
          transactionSuccessMessage={transactionSuccessMessage}
          loadingTransaction={loadingTransaction}
          account={localStorageAccount}
          fee={feeAmount}
          asset={selectedAsset}
          withdrawAddress={withdrawAddress}
          amount={amount}
          transactionType="withdraw"
        />
      </Form.Provider>
      {isLoggedIn &&
        selectedAsset === "BTC" &&
        !hasBTCDepositAddress &&
        !loadingSidechainAccounts && (
          <GenerateBitcoinAddress getSidechainAccounts={getSidechainAccounts} />
        )}
    </>
  );
};
