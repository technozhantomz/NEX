import { defaultToken } from "../../../../api/params/networkparams";
import { PasswordModal, TransactionModal } from "../../../../common/components";
import { LogoSelectOption } from "../../../../common/components/LogoSelectOption/LogoSelectOption";
import { useHandleTransactionForm } from "../../../../common/hooks";
import { useAssetsContext } from "../../../../common/providers";
import {
  CardFormButton,
  Form,
  InfoCircleOutlined,
  Input,
  SwapOutlined,
} from "../../../../ui/src";

import * as Styled from "./SwapTab.styled";
import { useSwap } from "./hooks/useSwapTab";

export const SwapTab = (): JSX.Element => {
  const { defaultAsset, sidechainAssets } = useAssetsContext();

  const {
    status,
    handleAssetChange,
    swapForm,
    formValidation,
    swapOrderFee,
    swapAsset,
    swapInfo,
    assetValueInfo,
    selectedAssets,
    localStorageAccount,
    transactionErrorMessage,
    setTransactionErrorMessage,
    transactionSuccessMessage,
    setTransactionSuccessMessage,
    loadingTransaction,
    feeAmount,
    handleSwap,
  } = useSwap();

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: handleSwap,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
  });

  const InfoToolTip = (
    <Styled.TooltipPara>
      {<span>{status === "" ? "" : status}</span>}
      {<span>Transaction Type : Trade</span>}
      {
        <span>
          Fee : {swapOrderFee?.fee ? swapOrderFee.fee : "0"} {defaultToken}
        </span>
      }
    </Styled.TooltipPara>
  );

  return (
    <Styled.SwapContainer>
      <Styled.SwapForm.Provider onFormFinish={handleFormFinish}>
        <Styled.SwapForm
          form={swapForm}
          name="swapForm"
          onFinish={showPasswordModal}
        >
          <Styled.button
            icon={<SwapOutlined />}
            shape="circle"
            onClick={swapAsset}
          />
          <Styled.SwapSellItem
            name="sellAmount"
            rules={formValidation.sellAmount}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="0.00000"
              type="number"
              min={0}
              //controls={false}
              prefix={
                <Styled.SwapFormItem
                  name="sellAsset"
                  rules={formValidation.sellAsset}
                  validateFirst={true}
                  validateTrigger="onBlur"
                >
                  <LogoSelectOption
                    id="sellAsset"
                    defaultValue={selectedAssets.sellAsset}
                    assets={sidechainAssets.concat(defaultAsset ?? [])}
                    labelInValue
                    key={selectedAssets.sellAsset}
                    onChange={handleAssetChange}
                  />
                </Styled.SwapFormItem>
              }
            />
          </Styled.SwapSellItem>
          <Styled.SwapItem
            name="buyAmount"
            rules={formValidation.buyAmount}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="0.00000"
              type="number"
              min={0}
              prefix={
                <Styled.SwapFormItem
                  name="buyAsset"
                  rules={formValidation.buyAsset}
                  validateFirst={true}
                  validateTrigger="onBlur"
                >
                  <LogoSelectOption
                    id="buyAsset"
                    defaultValue={selectedAssets.buyAsset}
                    assets={sidechainAssets.concat(defaultAsset ?? [])}
                    key={selectedAssets.buyAsset}
                    labelInValue
                    onChange={handleAssetChange}
                  />
                </Styled.SwapFormItem>
              }
            />
          </Styled.SwapItem>
          <Styled.InfoDiv>
            <Styled.InfoPara>
              {assetValueInfo}
              <Styled.Tooltip
                placement="left"
                title={InfoToolTip}
                color="#E3EBF8"
              >
                <InfoCircleOutlined />
              </Styled.Tooltip>
            </Styled.InfoPara>
          </Styled.InfoDiv>
          <Form.Item>
            <CardFormButton type="primary" htmlType="submit">
              Swap Coins
            </CardFormButton>
          </Form.Item>
        </Styled.SwapForm>
        <TransactionModal
          visible={isTransactionModalVisible}
          onCancel={hideTransactionModal}
          transactionErrorMessage={transactionErrorMessage}
          transactionSuccessMessage={transactionSuccessMessage}
          loadingTransaction={loadingTransaction}
          account={localStorageAccount}
          fee={feeAmount || 0}
          transactionType="swap_order_create"
          swap={swapInfo}
        />
        <PasswordModal
          visible={isPasswordModalVisible}
          onCancel={hidePasswordModal}
        />
      </Styled.SwapForm.Provider>
      {/*<DashboardButton label="Swap Coins" />
      <Styled.HistoryLinkDiv>
        <Styled.HistoryLink>See My Swap History</Styled.HistoryLink>
      </Styled.HistoryLinkDiv> 
      <Styled.FooterPara>
        {status === "" ? "" : status}
        {status === "" ? "" : "Transaction Type : Trade"}
        Fees : {swapOrderFee ? swapOrderFee.amount : 0} {defaultToken}
      </Styled.FooterPara>
      */}
    </Styled.SwapContainer>
  );
};
