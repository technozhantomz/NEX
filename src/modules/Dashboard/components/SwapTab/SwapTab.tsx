import counterpart from "counterpart";
import { KeyboardEvent, useState } from "react";

//import { defaultToken } from "../../../../api/params";
import { utils } from "../../../../api/utils";
import {
  DashboardLoginButton,
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
  const {
    swapForm,
    transactionErrorMessage,
    transactionSuccessMessage,
    loadingTransaction,
    selectedAssetsSymbols,
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
    handleSwapSubmit,
    formValidation,
    sellAmountErrors,
    buyAmountErrors,
    lastChangedField,
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
    neededKeyType: "active",
  });

  const [transactionModalSellAmount, setTransactionModalSellAmount] =
    useState<string>("");
  const [transactionModalBuyAmount, setTransactionModalBuyAmount] =
    useState<string>("");

  const isLoggedIn = localStorageAccount ? true : false;
  const renderUserSellAssetBalance = isLoggedIn ? (
    <Styled.Balance>{`${counterpart.translate(
      `field.labels.balance`
    )}: ${sellAssetBalance}`}</Styled.Balance>
  ) : (
    ""
  );
  const renderUserBuyAssetBalance = localStorageAccount ? (
    <Styled.Balance>{`${counterpart.translate(
      `field.labels.balance`
    )}: ${buyAssetBalance}`}</Styled.Balance>
  ) : (
    ""
  );

  const renderPriceLeftSideEquality =
    "1 " + selectedAssetsSymbols.buyAssetSymbol;
  const renderPriceRightSideEquality =
    `${price} ` + selectedAssetsSymbols.sellAssetSymbol;
  const renderPriceAmount =
    price === 0 ? (
      ""
    ) : (
      <>
        <span>
          {renderPriceLeftSideEquality} &#8776; {renderPriceRightSideEquality}
        </span>
        <InfoCircleOutlined />
      </>
    );
  const renderPrice = loadingSwapData ? (
    <>
      <Styled.PriceLoadingOutlined></Styled.PriceLoadingOutlined>
      {counterpart.translate(`field.labels.fetching_price`) + "..."}
    </>
  ) : (
    renderPriceAmount
  );

  const swapHasError =
    sellAmountErrors.length > 0 || buyAmountErrors.length > 0;
  const renderBuyAmountError =
    buyAmountErrors.length > 0 ? buyAmountErrors[0] : sellAmountErrors[0];
  const renderSellAmountError =
    lastChangedField === "sellAsset" && sellAmountErrors.length > 0
      ? sellAmountErrors[0]
      : renderBuyAmountError;
  const renderSwapButtonText = swapHasError
    ? renderSellAmountError
    : counterpart.translate(`buttons.swap_coins`);

  const renderSubmitButton = isLoggedIn ? (
    <Styled.SwapButtonFormItem>
      <CardFormButton
        type="primary"
        htmlType="submit"
        disabled={swapHasError || loadingSwapData}
      >
        {renderSwapButtonText}
      </CardFormButton>
    </Styled.SwapButtonFormItem>
  ) : (
    <DashboardLoginButton
      buttonText={counterpart.translate(`buttons.login_and_swap_coins`)}
    />
  );

  return (
    <Styled.SwapContainer>
      <Styled.SwapForm.Provider onFormFinish={handleFormFinish}>
        <Styled.SwapForm
          form={swapForm}
          name="swapForm"
          onValuesChange={handleValuesChange}
          onFinish={() => {
            const values = swapForm.getFieldsValue();
            setTransactionModalSellAmount(values.sellAmount);
            setTransactionModalBuyAmount(values.buyAmount);
            showPasswordModal();
          }}
          validateTrigger={["onChange", "onSubmit", "onBlur"]}
        >
          <Styled.SwapButton
            icon={<SwapOutlined />}
            shape="circle"
            onClick={handleSwapAssets}
          />
          <Styled.SwapSellItem
            name="sellAmount"
            rules={formValidation.sellAmount}
            validateFirst={true}
            help={""}
            validateStatus={""}
          >
            <Input
              placeholder="0.0"
              onFocus={(e) => {
                e.target.select();
              }}
              onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                if (!utils.isNumberKey(e)) {
                  e.preventDefault();
                }
              }}
              autoComplete="off"
              disabled={!isLoggedIn}
              prefix={
                <Styled.AssetSelectContainer>
                  <LogoSelectOption
                    id="sellAsset"
                    value={selectedAssetsSymbols.sellAssetSymbol}
                    assets={allAssets.filter(
                      (asset) =>
                        asset.symbol !== selectedAssetsSymbols.buyAssetSymbol
                    )}
                    onChange={handleSellAssetChange}
                  />
                  {renderUserSellAssetBalance}
                </Styled.AssetSelectContainer>
              }
            />
          </Styled.SwapSellItem>
          <Styled.SwapItem
            name="buyAmount"
            rules={formValidation.buyAmount}
            validateFirst={true}
            help={""}
            validateStatus={""}
          >
            <Input
              placeholder="0.0"
              onFocus={(e) => {
                e.target.select();
              }}
              onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                if (!utils.isNumberKey(e)) {
                  e.preventDefault();
                }
              }}
              autoComplete="off"
              disabled={!isLoggedIn}
              prefix={
                <Styled.AssetSelectContainer>
                  <LogoSelectOption
                    id="buyAsset"
                    value={selectedAssetsSymbols.buyAssetSymbol}
                    assets={allAssets.filter(
                      (asset) =>
                        asset.symbol !== selectedAssetsSymbols.sellAssetSymbol
                    )}
                    onChange={handleBuyAssetChange}
                  />
                  {renderUserBuyAssetBalance}
                </Styled.AssetSelectContainer>
              }
            />
          </Styled.SwapItem>
          {isLoggedIn ? (
            <Styled.PriceContainer>{renderPrice}</Styled.PriceContainer>
          ) : (
            ""
          )}
          {renderSubmitButton}
        </Styled.SwapForm>

        <TransactionModal
          visible={isTransactionModalVisible}
          onCancel={hideTransactionModal}
          transactionErrorMessage={transactionErrorMessage}
          transactionSuccessMessage={transactionSuccessMessage}
          loadingTransaction={loadingTransaction}
          account={localStorageAccount}
          fee={swapOrderFee}
          transactionType="swap_order_create"
          sell={`${transactionModalSellAmount} ${selectedAssetsSymbols.sellAssetSymbol}`}
          buy={`${transactionModalBuyAmount} ${selectedAssetsSymbols.buyAssetSymbol}`}
        />
        <PasswordModal
          visible={isPasswordModalVisible}
          onCancel={hidePasswordModal}
          neededKeyType="active"
        />
      </Styled.SwapForm.Provider>
    </Styled.SwapContainer>
  );
};
