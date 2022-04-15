import { LogoSelectOption, PasswordModal, useUserContext } from "..";
import { Form, Input } from "../../../ui/src";
import { useAsset } from "../../hooks";

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
  const { localStorageAccount } = useUserContext();
  const { defaultAsset, sidechainAssets } = useAsset();
  const {
    status,
    visible,
    feeAmount,
    withdrawForm,
    formValdation,
    onCancel,
    confirm,
    onFormFinish,
    handleValuesChange,
    selectedAsset,
    handleAssetChange,
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
            <Input placeholder="Withdraw public key" />
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
          />
        </Form.Item>
        {!withAssetSelector ? (
          <div className="amt-div">
            <Form.Item
              name="amount"
              validateFirst={true}
              rules={formValdation.amount}
              validateTrigger="onBlur"
            >
              <Input placeholder="amount" type="number" />
            </Form.Item>
          </div>
        ) : (
          ""
        )}
        <p>
          Fees: {feeAmount} {defaultAsset ? defaultAsset.symbol : ""}
        </p>
        {status === "" ? "" : <p>{status}</p>}
        <Styled.FormItem>
          <Styled.WithdrawFormButton type="primary" htmlType="submit">
            Withdraw
          </Styled.WithdrawFormButton>
        </Styled.FormItem>
      </Styled.WithdrawForm>
      <PasswordModal visible={visible} onCancel={onCancel} />
    </Form.Provider>
  );
};
