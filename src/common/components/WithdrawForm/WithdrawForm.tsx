import { Form, Input } from "antd";

import { LogoSelectOption } from "../LogoSelectOption/LogoSelectOption";
import { PasswordModal } from "../PasswordModal";

import * as Styled from "./WithdrawForm.styled";
import { useWithdrawForm } from "./hooks";

type Props = {
  asset?: string;
  withAssetSelector: boolean;
};

export const WithdrawForm = (props: Props): JSX.Element => {
  const {
    status,
    loggedIn,
    visible,
    feeData,
    withdrawForm,
    formValdation,
    onCancel,
    confirm,
    onFormFinish,
    handleAssetChange,
  } = useWithdrawForm();

  return (
    <Form.Provider onFormFinish={onFormFinish}>
      <Styled.WithdrawForm
        form={withdrawForm}
        name="withdrawForm"
        onFinish={confirm}
        size="large"
      >
        {props.withAssetSelector ? (
          <>
            <Styled.WithdrawFormAssetAmount
              name="amount"
              validateFirst={true}
              rules={formValdation.amount}
              validateTrigger="onBlur"
            >
              <Input
                placeholder="amount"
                type="number"
                prefix={
                  <Styled.WithdrawFormAsset name="asset">
                    <LogoSelectOption
                      defaultValue="BTC"
                      onChange={handleAssetChange}
                      forWithraw={true}
                    />
                  </Styled.WithdrawFormAsset>
                }
              />
            </Styled.WithdrawFormAssetAmount>
            <p className="label">Withdraw Address</p>
          </>
        ) : (
          <Form.Item
            name="amount"
            validateFirst={true}
            rules={formValdation.amount}
            validateTrigger="onBlur"
          >
            <Input placeholder="amount" type="number" />
          </Form.Item>
        )}

        <Form.Item
          name="withdrawAddress"
          onClick={confirm}
          validateFirst={true}
          rules={formValdation.withdrawAddress}
          validateTrigger="onBlur"
        >
          <Input placeholder="withdrawAddress" />
        </Form.Item>
        {/* <p>Fees: {feeData ? feeData.amount : 0}</p> */}
        {status === "" ? "" : <p>{status}</p>}
        <Form.Item>
          <Styled.WithdrawFormButton type="primary" htmlType="submit">
            {loggedIn ? "Withdraw" : "Log in"}
          </Styled.WithdrawFormButton>
        </Form.Item>
      </Styled.WithdrawForm>
      <PasswordModal visible={visible} onCancel={onCancel} />
    </Form.Provider>
  );
};
