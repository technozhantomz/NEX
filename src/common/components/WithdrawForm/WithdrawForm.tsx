import Link from "next/link";
import { useRouter } from "next/router";

import { LogoSelectOption, PasswordModal, TransactionModal } from "..";
import { Form, Input } from "../../../ui/src";
import { useAsset, useHandleTransactionForm } from "../../hooks";
import { useUserContext } from "../../providers";

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
  const { defaultAsset, sidechainAssets } = useAsset();
  const {
    feeAmount,
    withdrawForm,
    formValdation,
    selectedAsset,
    submittingPassword,
    loadingTransaction,
    transactionErrorMessage,
    transactionSuccessMessage,
    withdraw,
    handleValuesChange,
    handleAssetChange,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
  } = useWithdrawForm(asset);
  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
    handleFormSubmit,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: withdraw,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
  });

  return (
    <Form.Provider onFormFinish={handleFormFinish}>
      <Styled.WithdrawForm
        form={withdrawForm}
        name="withdrawForm"
        onFinish={handleFormSubmit}
        onValuesChange={handleValuesChange}
        size="large"
      >
        <Form.Item
          name="from"
          rules={formValdation.from}
          validateFirst={true}
          validateTrigger="onBlur"
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
              validateTrigger="onChange"
            >
              <Input
                placeholder="0.00000"
                type="number"
                prefix={
                  <Styled.WithdrawFormAsset name="asset">
                    <LogoSelectOption
                      assets={sidechainAssets}
                      defaultValue={asset}
                      onChange={handleAssetChange}
                    />
                  </Styled.WithdrawFormAsset>
                }
              />
            </Styled.WithdrawFormAssetAmount>
            {selectedAsset === "BTC" ? (
              <p className="label">Withdraw Public key & Address</p>
            ) : (
              <p className="label">Hive blockchain account</p>
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
            <Input placeholder="Withdraw public key" className="form-input" />
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
                ? "Withdraw address"
                : "Hive blockchain account"
            }
            className="form-input"
          />
        </Form.Item>
        {!withAssetSelector ? (
          <Form.Item
            name="amount"
            validateFirst={true}
            rules={formValdation.amount}
            validateTrigger="onBlur"
          >
            <Input placeholder="amount" type="number" />
          </Form.Item>
        ) : (
          ""
        )}
        <Styled.Fee>
          Fees: {feeAmount} {defaultAsset ? defaultAsset.symbol : ""}
        </Styled.Fee>
        {status === "" ? "" : <p>{status}</p>}

        <Styled.FormItem>
          {localStorageAccount && localStorageAccount !== "" ? (
            <>
              <Styled.WithdrawFormButton type="primary" htmlType="submit">
                Withdraw
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
                Log in & Withdraw
              </Styled.WithdrawFormButton>
            </>
          )}
        </Styled.FormItem>
      </Styled.WithdrawForm>
      {localStorageAccount && localStorageAccount !== "" ? (
        ""
      ) : (
        <Styled.FormDisclamer>
          <span>Don't have a Peerplays account? </span>
          <Link href="/signup">
            <a>Create account</a>
          </Link>
        </Styled.FormDisclamer>
      )}

      <PasswordModal
        visible={isPasswordModalVisible}
        onCancel={hidePasswordModal}
        submitting={submittingPassword}
      />
      <TransactionModal
        visible={isTransactionModalVisible}
        onCancel={
          transactionSuccessMessage
            ? () => {
                hideTransactionModal();
                withdrawForm.setFieldsValue({ amount: 0 });
              }
            : hideTransactionModal
        }
        transactionErrorMessage={transactionErrorMessage}
        transactionSuccessMessage={transactionSuccessMessage}
        loadingTransaction={loadingTransaction}
        account={localStorageAccount}
        fee={feeAmount}
        transactionType="withdraw"
        amount={`${
          withdrawForm.getFieldValue("amount")
            ? withdrawForm.getFieldValue("amount")
            : "0"
        } ${selectedAsset}`}
        address={
          withdrawForm.getFieldValue("withdrawAddress")
            ? withdrawForm.getFieldValue("withdrawAddress")
            : undefined
        }
      />
    </Form.Provider>
  );
};
