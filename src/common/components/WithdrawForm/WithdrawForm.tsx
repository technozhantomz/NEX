import { Form, Input } from "../../../ui/src";
import { useAsset } from "../../hooks";
import { PasswordModal } from "../PasswordModal";
import { useUserContext } from "../UserProvider";

import * as Styled from "./WithdrawForm.styled";
import { useWithdrawForm } from "./hooks";

type Props = {
  asset: string;
};

export const WithdrawForm = ({ asset }: Props): JSX.Element => {
  const { localStorageAccount } = useUserContext();
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
    handleValuesChange,
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
        >
          <Input disabled={true} placeholder="From" />
        </Form.Item>
        {asset === "BTC" ? (
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
          <Input placeholder="Withdraw address" />
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
            Withdraw
          </Styled.WithdrawFormButton>
        </Form.Item>
      </Styled.WithdrawForm>
      <PasswordModal visible={visible} onCancel={onCancel} />
    </Form.Provider>
  );
};
