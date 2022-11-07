import counterpart from "counterpart";

import { utils } from "../../../../../../api/utils";
import { Form, Input } from "../../../../../../ui/src";
import BitcoinIcon from "../../../../../../ui/src/icons/Cryptocurrencies/BitcoinIcon.svg";
import HIVEIcon from "../../../../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import PPYIcon from "../../../../../../ui/src/icons/Cryptocurrencies/PPYIcon.svg";

import * as Styled from "./SendForm.styled";
import { useSendForm } from "./hooks";

// import { utils } from "../../../api/utils";
// import { Form, Input } from "../../../ui/src";
// import { useHandleTransactionForm } from "../../hooks";
// import { useAssetsContext, useUserContext } from "../../providers";
// import { PasswordModal } from "../PasswordModal";
// import { TransactionModal } from "../TransactionModal";

// import * as Styled from "./TransferForm.styled";
//import { useTransferForm } from "./hooks";

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
  //   const { localStorageAccount } = useUserContext();
  //   const {
  //     isPasswordModalVisible,
  //     isTransactionModalVisible,
  //     showPasswordModal,
  //     hidePasswordModal,
  //     handleFormFinish,
  //     hideTransactionModal,
  //   } = useHandleTransactionForm({
  //     handleTransactionConfirmation: transfer,
  //     setTransactionErrorMessage,
  //     setTransactionSuccessMessage,
  //     neededKeyType: "active",
  //   });
  console.log("assetSymbol", assetSymbol);
  return (
    <Form.Provider>
      <Styled.SendForm
        size="large"
        form={sendForm}
        // onValuesChange={handleValuesChange}
        // validateTrigger={["onBlur", "onSubmit"]}
        initialValues={{
          asset: assetSymbol,
        }}
      >
        <div className="two-input-row">
          <Form.Item
            name="asset"
            // rules={formValdation.from}
            validateFirst={true}
            validateTrigger="onBlur"
            // initialValue={localStorageAccount}
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
            name="amount"
            validateFirst={true}
            //rules={formValdation.amount}
            validateTrigger="onBlur"
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
            name="to"
            validateFirst={true}
            //rules={formValdation.to}
            validateTrigger="onBlur"
          >
            <Input
              placeholder={counterpart.translate(`field.placeholder.to`)}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name="blockchain"
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Styled.BlockchainSelector
              placeholder={counterpart.translate(
                `pages.wallet.select_blockchain`
              )}
              //onChange={onAssetChange}
              disabled={assetSymbol ? false : true}
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
        {/* <p>{counterpart.translate(`field.comments.public_memo`)}</p>
        <Styled.MemoFormItem
          name="memo"
          validateFirst={true}
          rules={formValdation.memo}
          validateTrigger="onChange"
        >
          <Styled.Memo
            placeholder={counterpart.translate(`field.placeholder.memo`)}
            maxLength={256}
          />
        </Styled.MemoFormItem>
        <p>
          {counterpart.translate(`field.labels.fees`, {
            feeAmount: transferFee,
            defaultAsset: defaultAsset ? defaultAsset.symbol : "",
          })}
        </p>

        <Styled.FormItem>
          <Styled.TransferFormButton type="primary" htmlType="submit">
            {counterpart.translate(`buttons.send`)}
          </Styled.TransferFormButton>
        </Styled.FormItem>*/}
      </Styled.SendForm>
    </Form.Provider>
  );
};
