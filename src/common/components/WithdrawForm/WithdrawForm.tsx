import counterpart from "counterpart";
import Link from "next/link";
import { useRouter } from "next/router";

import { LogoSelectOption, PasswordModal } from "..";
import { Form, Input } from "../../../ui/src";
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
    status,
    isPasswordModalVisible,
    feeAmount,
    withdrawForm,
    formValdation,
    handlePasswordModalCancel,
    confirm,
    onFormFinish,
    handleValuesChange,
    selectedAsset,
    handleAssetChange,
    submittingPassword,
  } = useWithdrawForm(asset);

  return (
    <Form.Provider onFormFinish={onFormFinish}>
      <Styled.WithdrawForm
        form={withdrawForm}
        name="withdrawForm"
        onFinish={confirm}
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
                step="any"
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
          />
        </Form.Item>
        {!withAssetSelector ? (
          <Form.Item
            name="amount"
            validateFirst={true}
            rules={formValdation.amount}
            validateTrigger="onBlur"
          >
            <Input
              placeholder={counterpart.translate(`field.placeholder.amount`)}
              type="number"
              step="any"
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
        {status === "" ? "" : <p>{status}</p>}

        <Styled.FormItem>
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
        </Styled.FormItem>
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
        onCancel={handlePasswordModalCancel}
        submitting={submittingPassword}
      />
    </Form.Provider>
  );
};
