import counterpart from "counterpart";

import {
  BITCOIN_ASSET_SYMBOL,
  defaultToken,
} from "../../../../../../api/params";
import { utils } from "../../../../../../api/utils";
import {
  DashboardLoginButton,
  DownloadBitcoinKeys,
  GenerateBitcoinAddress,
  LoadingIndicator,
  LogoSelectOption,
  PasswordModal,
  TransactionModal,
} from "../../../../../../common/components";
import { useAsset, useTransactionForm } from "../../../../../../common/hooks";
import {
  useAssetsContext,
  useUserContext,
} from "../../../../../../common/providers";
import { Asset } from "../../../../../../common/types";
import { Form, Input } from "../../../../../../ui/src";
import BitcoinIcon from "../../../../../../ui/src/icons/Cryptocurrencies/BitcoinIcon.svg";
import HIVEIcon from "../../../../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";

import * as Styled from "./WithdrawForm.styled";
import { useWithdrawForm } from "./hooks";

type Props = {
  asset: string;
};

export const WithdrawForm = ({ asset }: Props): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const { sidechainAssets } = useAssetsContext();
  const { limitByPrecision } = useAsset();
  const {
    withdrawForm,
    formValidation,
    handleValuesChange,
    selectedAsset,
    handleAssetChange,
    transactionMessageState,
    dispatchTransactionMessage,
    handleWithdraw,
    amount,
    userBalance,
    withdrawFee,
    btcTransferFee,
    selectedAssetPrecision,
    bitcoinSidechainAccount,
    getSidechainAccounts,
    loadingSidechainAccounts,
  } = useWithdrawForm(asset);

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useTransactionForm({
    executeTransaction: handleWithdraw,
    dispatchTransactionMessage,
    neededKeyType: "active",
  });

  let withdrawAddress = "";
  if ((withdrawForm as any).__INTERNAL__.name) {
    // do form logic here
    const values = withdrawForm.getFieldsValue();
    withdrawAddress = values.withdrawAddress;
  }

  const precisedAmount = limitByPrecision(amount, selectedAssetPrecision);

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
    selectedAsset === BITCOIN_ASSET_SYMBOL
      ? counterpart.translate(`field.labels.estimated_fees_label`)
      : counterpart.translate(`field.labels.fees_label`);

  const feeSummary: (inTotal?: boolean) => string | JSX.Element = (
    inTotal = false
  ) => {
    const BtcFeeSummary = inTotal ? (
      <>
        <div>{`+ ${withdrawFee} ${defaultToken}`}</div>
        <div>+ {`${btcTransferFee} BTC`}</div>
      </>
    ) : (
      <>
        <div>{`${withdrawFee} ${defaultToken}`}</div>
        <div>+ {`${btcTransferFee} BTC`}</div>
      </>
    );

    const HiveFeeSummary = inTotal
      ? `+ ${withdrawFee}
    ${defaultToken}`
      : `${withdrawFee}
    ${defaultToken}`;

    return selectedAsset === BITCOIN_ASSET_SYMBOL
      ? BtcFeeSummary
      : HiveFeeSummary;
  };

  const transactionModalFee =
    selectedAsset === BITCOIN_ASSET_SYMBOL
      ? `${withdrawFee} ${defaultToken} + ${btcTransferFee} BTC`
      : `${withdrawFee}
  ${defaultToken}`;

  const totalTransaction = (
    <>
      <div>{`${precisedAmount} ${selectedAsset}`}</div>
      <>{feeSummary(true)}</>
    </>
  );

  const confirmationTime =
    selectedAsset === BITCOIN_ASSET_SYMBOL
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

  const btcFormBody =
    bitcoinSidechainAccount && bitcoinSidechainAccount.hasDepositAddress ? (
      <>
        <Form.Item
          name="from"
          rules={formValidation.from}
          validateFirst={true}
          initialValue={localStorageAccount}
          hidden={true}
        >
          <Input disabled={true} placeholder="From" />
        </Form.Item>
        <p className="label">
          {counterpart.translate(`field.labels.withdraw_public_key_address`)}
        </p>

        <Form.Item
          name="withdrawPublicKey"
          validateFirst={true}
          rules={formValidation.withdrawPublicKey}
        >
          <Input
            placeholder={counterpart.translate(
              `field.placeholder.withdraw_public_key`
            )}
            autoComplete="off"
            className="form-input"
            disabled={!isLoggedIn}
          />
        </Form.Item>
        <Form.Item
          name="withdrawAddress"
          validateFirst={true}
          rules={formValidation.withdrawAddress}
        >
          <Input
            placeholder={counterpart.translate(
              `field.placeholder.withdraw_address`
            )}
            className="form-input"
            disabled={localStorageAccount ? false : true}
            autoComplete="off"
          />
        </Form.Item>
        <Styled.WithdrawalInstruction>
          <Styled.IconWrapper>
            <BitcoinIcon height="30" width="30" />
          </Styled.IconWrapper>
          <span>
            {counterpart.translate(`field.labels.btc_withdraw_instruction`)}
          </span>
        </Styled.WithdrawalInstruction>
        <DownloadBitcoinKeys
          bitcoinSidechainAccount={bitcoinSidechainAccount.account}
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
        rules={formValidation.from}
        validateFirst={true}
        initialValue={localStorageAccount}
        hidden={true}
      >
        <Input disabled={true} placeholder="From" />
      </Form.Item>
      <p className="label">
        {counterpart.translate(`field.labels.hive_blockchain_account`)}
      </p>

      <Form.Item
        name="withdrawAddress"
        validateFirst={true}
        rules={formValidation.withdrawAddress}
      >
        <Input
          placeholder={counterpart.translate(
            `field.placeholder.hive_blockchain_account`
          )}
          className="form-input"
          disabled={localStorageAccount ? false : true}
        />
      </Form.Item>
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

  const formBody =
    selectedAsset === BITCOIN_ASSET_SYMBOL ? btcFormBody : hiveFormBody;

  const formBodyWithLoading = loadingSidechainAccounts ? (
    <Styled.LoadingIndicatorContainer>
      <LoadingIndicator type="three-bounce" />
    </Styled.LoadingIndicatorContainer>
  ) : (
    formBody
  );

  return (
    <>
      <Form.Provider onFormFinish={handleFormFinish}>
        <Styled.WithdrawForm
          form={withdrawForm}
          name="withdrawForm"
          onValuesChange={handleValuesChange}
          size="large"
          validateTrigger={["onChange", "onSubmit"]}
        >
          <Form.Item>
            <Input.Group compact>
              <Styled.WithdrawFormAsset>
                <LogoSelectOption
                  assets={sidechainAssets as Asset[]}
                  value={selectedAsset}
                  onChange={handleAssetChange}
                />
                {renderUserBalance}
              </Styled.WithdrawFormAsset>
              <Styled.WithdrawFormAssetAmount
                name="amount"
                validateFirst={true}
                rules={formValidation.amount}
                noStyle
              >
                <Input
                  placeholder="0.0"
                  type="number"
                  step="any"
                  min={0}
                  onKeyPress={utils.ensureInputNumberValidity}
                  disabled={!isLoggedIn}
                  autoComplete="off"
                />
              </Styled.WithdrawFormAssetAmount>
            </Input.Group>
          </Form.Item>

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
          transactionMessageState={transactionMessageState}
          account={localStorageAccount}
          fee={transactionModalFee}
          asset={selectedAsset}
          withdrawAddress={withdrawAddress}
          amount={amount}
          transactionType="withdraw"
        />
      </Form.Provider>
      {isLoggedIn &&
        selectedAsset === BITCOIN_ASSET_SYMBOL &&
        (!bitcoinSidechainAccount ||
          !bitcoinSidechainAccount.hasDepositAddress) &&
        !loadingSidechainAccounts && (
          <GenerateBitcoinAddress getSidechainAccounts={getSidechainAccounts} />
        )}
    </>
  );
};
