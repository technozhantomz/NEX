import { Form, Input } from "antd";

import PasswordModal from "../../../../../../common/components/PasswordModal/passwordModal";
import { useUserContext } from "../../../../../../common/components/UserProvider";

import * as Styled from "./WithdrawForm.styled";
import { useWithdrawForm } from "./hooks";

type Props = {
  asset: string;
};

const WithdrawForm = ({ asset }: Props): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const {
    status,
    visible,
    feeData,
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
        <p>Fees: {feeData ? feeData.amount : 0}</p>
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

export default WithdrawForm;
