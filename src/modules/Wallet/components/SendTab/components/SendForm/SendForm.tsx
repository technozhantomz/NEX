import counterpart from "counterpart";

import {
  BITCOIN_NETWORK,
  defaultNetwork,
  defaultToken,
  HIVE_NETWORK,
} from "../../../../../../api/params";
import { utils } from "../../../../../../api/utils";
import {
  PasswordModal,
  TransactionModal,
} from "../../../../../../common/components";
import { useAsset, useTransactionForm } from "../../../../../../common/hooks";
import { Form, Input, Progress } from "../../../../../../ui/src";
import BitcoinIcon from "../../../../../../ui/src/icons/Cryptocurrencies/BitcoinIcon.svg";
import HIVEIcon from "../../../../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import PPYIcon from "../../../../../../ui/src/icons/Cryptocurrencies/PPYIcon.svg";

import * as Styled from "./SendForm.styled";
import { useSendForm } from "./hooks";

type Props = {
  assetSymbol?: string;
};

export const SendForm = ({ assetSymbol }: Props): JSX.Element => {
  const {
    assets,
    onAssetChange,
    assetBlockchains,
    sendForm,
    selectedAssetSymbol,
    userAsset,
    handleValuesChange,
    onBlockchainChange,
    selectedBlockchain,
    formValidation,
    feeAmount,
    send,
    dispatchTransactionMessage,
    transactionMessageState,
    localStorageAccount,
    amount,
    toAccount,
    selectedAssetPrecision,
    btcTransferFee,
    afterTransactionModalClose,
  } = useSendForm({
    assetSymbol,
  });
  const { limitByPrecision } = useAsset();
  const icons: {
    [blockchain: string]: JSX.Element;
  } = {
    Peerplays: <PPYIcon height="20" width="20" />,
    Hive: <HIVEIcon height="20" width="20" />,
    Bitcoin: <BitcoinIcon height="20" width="20" />,
  };

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useTransactionForm({
    executeTransaction: send,
    dispatchTransactionMessage,
    neededKeyType: "active",
  });

  const precisedAmount = limitByPrecision(amount, selectedAssetPrecision);

  const feeLabel =
    selectedBlockchain === BITCOIN_NETWORK
      ? counterpart.translate(`field.labels.estimated_fees_label`)
      : counterpart.translate(`field.labels.fees_label`);

  const feeSummary: (inTotal?: boolean) => string | JSX.Element = (
    inTotal = false
  ) => {
    const bitcoinNetworkFeeSummary = inTotal ? (
      <>
        <div>{`+ ${feeAmount} ${defaultToken}`}</div>
        <div>+ {`${btcTransferFee} BTC`}</div>
      </>
    ) : (
      <>
        <div>{`${feeAmount} ${defaultToken}`}</div>
        <div>+ {`${btcTransferFee} BTC`}</div>
      </>
    );

    const otherNetworksFeeSummary = inTotal
      ? `+ ${feeAmount}
    ${defaultToken}`
      : `${feeAmount}
    ${defaultToken}`;

    return selectedBlockchain === BITCOIN_NETWORK
      ? bitcoinNetworkFeeSummary
      : otherNetworksFeeSummary;
  };

  const transactionModalFee =
    selectedBlockchain === BITCOIN_NETWORK
      ? `${feeAmount} ${defaultToken} + ${btcTransferFee} BTC`
      : `${feeAmount}
  ${defaultToken}`;

  const totalTransaction = (
    <>
      <div>{`${precisedAmount} ${
        selectedAssetSymbol !== undefined ? selectedAssetSymbol : ""
      }`}</div>
      <>{feeSummary(true)}</>
    </>
  );

  const sideChainConfirmationTime =
    selectedBlockchain === BITCOIN_NETWORK
      ? counterpart.translate(`field.labels.btc_withdrawal_confirmation_time`)
      : counterpart.translate(`field.labels.hive_withdrawal_confirmation_time`);
  const confirmationTime =
    selectedBlockchain === HIVE_NETWORK ||
    selectedBlockchain === BITCOIN_NETWORK
      ? sideChainConfirmationTime
      : counterpart.translate(`field.labels.peerplays_confirmation_time`);

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

  return (
    <Form.Provider onFormFinish={handleFormFinish}>
      <Styled.SendForm
        name="sendForm"
        size="large"
        form={sendForm}
        onValuesChange={handleValuesChange}
        validateTrigger={["onChange", "onBlur", "onSubmit"]}
        initialValues={{
          asset: assetSymbol,
        }}
      >
        <div className="two-input-row">
          <Form.Item
            name="asset"
            rules={formValidation.asset}
            validateFirst={true}
          >
            <Styled.AssetSelector
              placeholder={counterpart.translate(`pages.wallet.select_asset`)}
              value={selectedAssetSymbol}
              onChange={onAssetChange}
            >
              {assets.map((asset) => {
                return (
                  <Styled.AssetOption key={asset.id} value={asset.symbol}>
                    {`${
                      asset.symbol
                    } - ${utils.getNativeBlockchainFromAssetSymbol(
                      asset.symbol
                    )}`}
                  </Styled.AssetOption>
                );
              })}
            </Styled.AssetSelector>
          </Form.Item>

          <Form.Item
            name="blockchain"
            rules={formValidation.blockchain}
            validateFirst={true}
          >
            <Styled.BlockchainSelector
              placeholder={counterpart.translate(
                `pages.wallet.select_blockchain`
              )}
              onChange={onBlockchainChange}
              disabled={assetSymbol ? false : true}
              value={selectedBlockchain}
            >
              {assetBlockchains.map((blockchain, index) => {
                const key = `${blockchain}-${index}`;
                return (
                  <Styled.BlockchainOption key={key} value={blockchain}>
                    <Styled.contentWrapper>
                      <Styled.IconWrapper>
                        {icons[blockchain]}
                      </Styled.IconWrapper>
                      <div>{blockchain}</div>
                    </Styled.contentWrapper>
                  </Styled.BlockchainOption>
                );
              })}
            </Styled.BlockchainSelector>
          </Form.Item>
        </div>
        <Styled.AvailableAssetAndProgressWrapper>
          <Styled.AvailableAssetWrapper>
            <Styled.AvailableAssetLabel>
              {counterpart.translate(`pages.wallet.available_to_send`)}
            </Styled.AvailableAssetLabel>
            <Styled.AvailableAssetAmount>
              {userAsset ? userAsset.amount : 0}
            </Styled.AvailableAssetAmount>
          </Styled.AvailableAssetWrapper>
          <Progress
            status="normal"
            percent={
              userAsset && userAsset.amount && amount
                ? Number(((Number(amount) / userAsset.amount) * 100).toFixed(1))
                : 0
            }
          />
        </Styled.AvailableAssetAndProgressWrapper>
        <div className="two-input-row">
          <Form.Item
            name="amount"
            validateFirst={true}
            rules={formValidation.amount}
          >
            <Input
              placeholder={counterpart.translate(
                `field.placeholder.enter_amount`
              )}
              type="number"
              min={0}
              onKeyPress={utils.ensureInputNumberValidity}
              onPaste={utils.numberedInputsPasteHandler}
              step="any"
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item name="to" validateFirst={true} rules={formValidation.to}>
            <Input
              placeholder={counterpart.translate(
                `field.placeholder.enter_recipient`
              )}
              autoComplete="off"
              disabled={selectedBlockchain === BITCOIN_NETWORK}
            />
          </Form.Item>
        </div>
        {selectedBlockchain === undefined ||
        selectedBlockchain === defaultNetwork ? (
          <>
            <p>{counterpart.translate(`field.comments.public_memo`)}</p>
            <Styled.MemoWrapper>
              <Styled.MemoFormItem
                name="memo"
                validateFirst={true}
                validateTrigger="onChange"
              >
                <Styled.Memo
                  placeholder={counterpart.translate(`field.placeholder.memo`)}
                  maxLength={256}
                  disabled={selectedBlockchain !== defaultNetwork}
                />
              </Styled.MemoFormItem>
            </Styled.MemoWrapper>
          </>
        ) : (
          <Styled.WithdrawAlertWrapper>
            <Styled.AlertIcon />
            <Styled.AlertText>
              {counterpart.translate("pages.wallet.withdraw_alert")}
            </Styled.AlertText>
          </Styled.WithdrawAlertWrapper>
        )}

        {transactionDetails}
        <Styled.FormItem>
          <Styled.TransferFormButton type="primary" htmlType="submit">
            {counterpart.translate(`buttons.send`)}
          </Styled.TransferFormButton>
        </Styled.FormItem>
      </Styled.SendForm>
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
        asset={selectedAssetSymbol}
        to={toAccount}
        amount={amount}
        blockchain={selectedBlockchain}
        transactionType="transfer"
        afterClose={afterTransactionModalClose}
      />
    </Form.Provider>
  );
};
