import counterpart from "counterpart";

import { BITCOIN_NETWORK, defaultNetwork } from "../../../../../../api/params";
import { utils } from "../../../../../../api/utils";
import {
  PasswordModal,
  TransactionModal,
} from "../../../../../../common/components";
import { useHandleTransactionForm } from "../../../../../../common/hooks";
import { Form, Input } from "../../../../../../ui/src";
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
    selectedAsset,
    handleValuesChange,
    onBlockchainChange,
    selectedBlockchain,
    formValdation,
    feeAmount,
    send,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    transactionErrorMessage,
    transactionSuccessMessage,
    loadingTransaction,
    localStorageAccount,
    amount,
    toAccount,
  } = useSendForm({
    assetSymbol,
  });
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
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: send,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    neededKeyType: "active",
  });
  return (
    <Form.Provider onFormFinish={handleFormFinish}>
      <Styled.SendForm
        size="large"
        form={sendForm}
        onFinish={showPasswordModal}
        onValuesChange={handleValuesChange}
        validateTrigger={["onChange", "onBlur", "onSubmit"]}
        initialValues={{
          asset: assetSymbol,
        }}
      >
        <div className="two-input-row">
          <Form.Item
            name="asset"
            rules={formValdation.asset}
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
                    {`${asset.symbol} - ${utils.getBlockchainFromSymbol(
                      asset.symbol
                    )}`}
                  </Styled.AssetOption>
                );
              })}
            </Styled.AssetSelector>
          </Form.Item>

          <Form.Item
            name="blockchain"
            rules={formValdation.blockchain}
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
                return (
                  <Styled.BlockchainOption key={index} value={blockchain}>
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

        <Styled.AvailableAssetWrapper>
          <Styled.AvailableAssetLabel>
            {counterpart.translate(`pages.wallet.available_to_send`)}
          </Styled.AvailableAssetLabel>
          <Styled.AvailableAssetAmount>
            {selectedAsset ? selectedAsset.amount : 0}
          </Styled.AvailableAssetAmount>
        </Styled.AvailableAssetWrapper>

        <div className="two-input-row">
          <Form.Item
            name="amount"
            validateFirst={true}
            rules={formValdation.amount}
          >
            <Input
              placeholder={counterpart.translate(`field.placeholder.amount`)}
              type="number"
              min={0}
              onKeyPress={utils.ensureInputNumberValidity}
              step="any"
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item name="to" validateFirst={true} rules={formValdation.to}>
            <Input
              placeholder={counterpart.translate(`field.placeholder.to`)}
              autoComplete="off"
              disabled={selectedBlockchain === BITCOIN_NETWORK}
            />
          </Form.Item>
        </div>
        <p>{counterpart.translate(`field.comments.public_memo`)}</p>
        <Styled.MemoWrapper>
          <Styled.MemoFormItem
            name="memo"
            validateFirst={true}
            rules={formValdation.memo}
            validateTrigger="onChange"
          >
            <Styled.Memo
              placeholder={counterpart.translate(`field.placeholder.memo`)}
              maxLength={256}
              disabled={selectedBlockchain !== defaultNetwork}
            />
          </Styled.MemoFormItem>
        </Styled.MemoWrapper>
        {/* <p>
          {counterpart.translate(`field.labels.fees`, {
            feeAmount: transferFee,
            defaultAsset: defaultAsset ? defaultAsset.symbol : "",
          })}
        </p> */}

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
        transactionErrorMessage={transactionErrorMessage}
        transactionSuccessMessage={transactionSuccessMessage}
        loadingTransaction={loadingTransaction}
        account={localStorageAccount}
        fee={feeAmount}
        asset={selectedAssetSymbol}
        to={toAccount}
        amount={amount}
        blockchain={selectedBlockchain}
        transactionType="transfer"
      />
    </Form.Provider>
  );
};
