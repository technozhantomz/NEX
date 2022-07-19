import counterpart from "counterpart";
import Link from "next/link";
import { useRouter } from "next/router";
import { KeyboardEvent } from "react";

import { defaultToken } from "../../../../api/params";
import { utils } from "../../../../api/utils";
import {
  LogoSelectOption,
  PasswordModal,
  TransactionModal,
} from "../../../../common/components";
import { useHandleTransactionForm } from "../../../../common/hooks";
import {
  CardFormButton,
  InfoCircleOutlined,
  Input,
  SwapOutlined,
} from "../../../../ui/src";

import * as Styled from "./SwapTab.styled";
import { useSwap } from "./hooks/useSwapTab";

export const SwapTab = (): JSX.Element => {
  const router = useRouter();
  const {
    swapForm,
    transactionErrorMessage,
    transactionSuccessMessage,
    loadingTransaction,
    selectedAssets,
    allAssets,
    handleSellAssetChange,
    handleBuyAssetChange,
    localStorageAccount,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    swapOrderFee,
    price,
    loadingSwapData,
    //loadingAssets,
    handleValuesChange,
    handleSwapAssets,
    buyAssetBalance,
    sellAssetBalance,
    transactionModalBuyAmount,
    transactionModalSellAmount,
    handleSwapSubmit,
  } = useSwap();

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: handleSwapSubmit,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
  });

  const InfoToolTip = (
    <Styled.TooltipPara>
      {<span>{counterpart.translate(`tooltips.swap_transaction_type`)}</span>}
      {
        <span>
          {counterpart.translate(`tableHead.fee`)} : {swapOrderFee}{" "}
          {defaultToken}
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
          onValuesChange={handleValuesChange}
          onFinish={showPasswordModal}
        >
          <Styled.SwapButton
            icon={<SwapOutlined />}
            shape="circle"
            onClick={handleSwapAssets}
          />
          <Styled.SwapSellItem
            name="sellAmount"
            //rules={formValidation.sellAmount}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="0.00000"
              onFocus={(e) => {
                e.target.select();
              }}
              onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                if (!utils.isNumberKey(e)) {
                  e.preventDefault();
                }
              }}
              prefix={
                <Styled.AssetSelectContainer>
                  <LogoSelectOption
                    id="sellAsset"
                    value={selectedAssets.sellAssetSymbol}
                    assets={allAssets.filter(
                      (asset) => asset.symbol !== selectedAssets.buyAssetSymbol
                    )}
                    onChange={handleSellAssetChange}
                  />
                  {localStorageAccount ? (
                    <Styled.Balance>{`${counterpart.translate(
                      `field.labels.balance`
                    )}: ${sellAssetBalance}`}</Styled.Balance>
                  ) : (
                    ""
                  )}
                </Styled.AssetSelectContainer>
              }
            />
          </Styled.SwapSellItem>
          <Styled.SwapItem
            name="buyAmount"
            //rules={formValidation.buyAmount}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="0.00000"
              onFocus={(e) => {
                e.target.select();
              }}
              onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                if (!utils.isNumberKey(e)) {
                  e.preventDefault();
                }
              }}
              prefix={
                <Styled.AssetSelectContainer>
                  <LogoSelectOption
                    id="buyAsset"
                    value={selectedAssets.buyAssetSymbol}
                    assets={allAssets.filter(
                      (asset) => asset.symbol !== selectedAssets.sellAssetSymbol
                    )}
                    onChange={handleBuyAssetChange}
                  />
                  {localStorageAccount ? (
                    <Styled.Balance>{`${counterpart.translate(
                      `field.labels.balance`
                    )}: ${buyAssetBalance}`}</Styled.Balance>
                  ) : (
                    ""
                  )}
                </Styled.AssetSelectContainer>
              }
            />
          </Styled.SwapItem>
          <Styled.PriceContainer>
            {loadingSwapData ? (
              <>
                <Styled.PriceLoadingOutlined></Styled.PriceLoadingOutlined>
                {`${counterpart.translate(`field.labels.fetching_price`)}...`}
              </>
            ) : price === 0 ? (
              ""
            ) : (
              <>
                <span>
                  {`1 ${selectedAssets.buyAssetSymbol} = ${price} ${selectedAssets.sellAssetSymbol}`}
                </span>
                <Styled.Tooltip
                  placement="left"
                  title={InfoToolTip}
                  color="#E3EBF8"
                >
                  <InfoCircleOutlined />
                </Styled.Tooltip>
              </>
            )}
          </Styled.PriceContainer>
          <Styled.SwapButtonFormItem>
            {localStorageAccount ? (
              <CardFormButton type="primary" htmlType="submit">
                {counterpart.translate(`buttons.swap_coins`)}
              </CardFormButton>
            ) : (
              <CardFormButton
                type="primary"
                htmlType="button"
                onClick={() => {
                  router.push("/login");
                }}
              >
                {counterpart.translate(`buttons.login_and_swap_coins`)}
              </CardFormButton>
            )}
          </Styled.SwapButtonFormItem>
        </Styled.SwapForm>
        {!localStorageAccount ? (
          <Styled.FormDisclamer>
            <span>
              {counterpart.translate(`buttons.dont_have_peerplays_account`)}
            </span>
            <Link href="/signup">
              <a>{counterpart.translate(`links.create_account`)}</a>
            </Link>
          </Styled.FormDisclamer>
        ) : (
          ""
        )}

        <TransactionModal
          visible={isTransactionModalVisible}
          onCancel={hideTransactionModal}
          transactionErrorMessage={transactionErrorMessage}
          transactionSuccessMessage={transactionSuccessMessage}
          loadingTransaction={loadingTransaction}
          account={localStorageAccount}
          fee={swapOrderFee}
          transactionType="swap_order_create"
          sell={`${transactionModalSellAmount} ${selectedAssets.sellAssetSymbol}`}
          buy={`${transactionModalBuyAmount} ${selectedAssets.buyAssetSymbol}`}
        />
        <PasswordModal
          visible={isPasswordModalVisible}
          onCancel={hidePasswordModal}
        />
      </Styled.SwapForm.Provider>
    </Styled.SwapContainer>
  );
};
