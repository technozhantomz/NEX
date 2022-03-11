import { Form, Input } from "antd";

import { useAsset } from "../../hooks";
import { PasswordModal } from "../PasswordModal";

import * as Styled from "./WithdrawForm.styled";
import { useWithdrawForm } from "./hooks";

type Props = {
  asset: string;
};

export const WithdrawForm = ({ asset }: Props): JSX.Element => {
  const { defaultAsset } = useAsset();
  const {
    status,
    visible,
    feeAmount,
    withdrawForm,
    formValdation,
    onCancel,
    confirm,
    onFormFinish,
  } = useWithdrawForm();

  return (
    <Form.Provider onFormFinish={onFormFinish}>
      <Styled.WithdrawForm
        form={withdrawForm}
        name="transferForm"
        onFinish={confirm}
        size="large"
      >
        <Form.Item
          name="withdrawAddress"
          validateFirst={true}
          rules={formValdation.withdrawAddress}
          validateTrigger="onBlur"
        >
          <Input placeholder="withdrawAddress" />
        </Form.Item>

        <Form.Item
          name="amount"
          validateFirst={true}
          rules={formValdation.amount}
          validateTrigger="onBlur"
        >
          <Input placeholder="amount" type="number" />
        </Form.Item>
        <p>
          Fees: {feeAmount} {defaultAsset ? defaultAsset.symbol : ""}
        </p>
        {status === "" ? "" : <p>{status}</p>}
        <Form.Item>
          <Styled.WithdrawFormButton type="primary" htmlType="submit">
            Send
          </Styled.WithdrawFormButton>
        </Form.Item>
      </Styled.WithdrawForm>
      <PasswordModal visible={visible} onCancel={onCancel} />
    </Form.Provider>
  );
};
