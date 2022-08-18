import counterpart from "counterpart";
import Link from "next/link";
import { useRouter } from "next/router";
import { KeyboardEvent } from "react";

import { LogoSelectOption, PasswordModal, TransactionModal } from "..";
import { utils } from "../../../api/utils";
import { Form, Input } from "../../../ui/src";
import { useHandleTransactionForm } from "../../hooks";
import { useAssetsContext, useUserContext } from "../../providers";

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
  const router = useRouter();
  const { localStorageAccount } = useUserContext();
  const { defaultAsset, sidechainAssets } = useAssetsContext();
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
  });

  return (
    <Form.Provider onFormFinish={handleFormFinish}>
      <Styled.WithdrawForm
        form={withdrawForm}
        name="withdrawForm"
        onFinish={showPasswordModal}
        onValuesChange={handleValuesChange}
        size="large"
        validateTrigger={["onChange", "onSubmit"]}
      >
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
          <>
            <Styled.WithdrawFormAssetAmount
              name="amount"
              validateFirst={true}
              rules={formValdation.amount}
            >
              <Input
                placeholder="0.00000"
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
                  </Styled.WithdrawFormAsset>
                }
                disabled={localStorageAccount ? false : true}
              />
            </Styled.WithdrawFormAssetAmount>
            {selectedAsset === "BTC" ? (
              <p className="label">
                {counterpart.translate(
                  `field.labels.withdraw_public_key_address`
                )}
              </p>
            ) : (
              <p className="label">
                {counterpart.translate(`field.labels.hive_blockchain_account`)}
              </p>
            )}
          </>
        ) : (
          ""
        )}
        {selectedAsset === "BTC" ? (
          <Form.Item
            name="withdrawPublicKey"
            validateFirst={true}
            rules={formValdation.withdrawPublicKey}
          >
            <Input
              placeholder={counterpart.translate(
                `field.placeholder.withdraw_public_key`
              )}
              className="form-input"
              disabled={localStorageAccount ? false : true}
            />
          </Form.Item>
        ) : (
          ""
        )}
        <Form.Item
          name="withdrawAddress"
          validateFirst={true}
          rules={formValdation.withdrawAddress}
        >
          <Input
            placeholder={
              selectedAsset === "BTC"
                ? counterpart.translate(`field.placeholder.withdraw_address`)
                : counterpart.translate(
                    `field.placeholder.hive_blockchain_account`
                  )
            }
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
        <Styled.Fee>
          {counterpart.translate(`field.labels.fees`, {
            feeAmount: feeAmount,
            defaultAsset: defaultAsset ? defaultAsset.symbol : "",
          })}
        </Styled.Fee>

        <Styled.ButtonFormItem>
          {localStorageAccount && localStorageAccount !== "" ? (
            <>
              <Styled.WithdrawFormButton type="primary" htmlType="submit">
                {counterpart.translate(`buttons.withdraw`)}
              </Styled.WithdrawFormButton>
            </>
          ) : (
            <>
              <Styled.WithdrawFormButton
                type="primary"
                htmlType="button"
                onClick={() => {
                  router.push("/login");
                }}
              >
                {counterpart.translate(`buttons.log_in_withdraw`)}
              </Styled.WithdrawFormButton>
            </>
          )}
        </Styled.ButtonFormItem>
      </Styled.WithdrawForm>
      {localStorageAccount && localStorageAccount !== "" ? (
        ""
      ) : (
        <Styled.FormDisclamer>
          <span>
            {counterpart.translate(`buttons.dont_have_peerplays_account`)}
          </span>
          <Link href="/signup">
            <a>{counterpart.translate(`links.create_account`)}</a>
          </Link>
        </Styled.FormDisclamer>
      )}

      <PasswordModal
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
        asset={asset}
        withdrawAddress={withdrawAddress}
        amount={amount}
        transactionType="withdraw"
      />
    </Form.Provider>
  );
};
