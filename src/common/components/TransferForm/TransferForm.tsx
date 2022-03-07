import { Form, Input } from "antd";

import PasswordModal from "../PasswordModal/passwordModal";
import { useUserContext } from "../UserProvider";

import * as Styled from "./TransferForm.styled";
import { useTransferForm } from "./hooks";

type Props = {
  asset: string;
};

const TransferForm = ({ asset }: Props): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const {
    status,
    visible,
    feeData,
    transferForm,
    formValdation,
    onCancel,
    confirm,
    onFormFinish,
  } = useTransferForm();

  return (
    <Form.Provider onFormFinish={onFormFinish}>
      <Styled.TransferForm
        form={transferForm}
        name="transferForm"
        onFinish={confirm}
        size="large"
      >
        <div className="two-input-row">
          <Form.Item
            name="from"
            rules={formValdation.from}
            validateFirst={true}
            validateTrigger="onBlur"
            initialValue={localStorageAccount}
          >
            <Input placeholder="From" />
          </Form.Item>
          <Form.Item
            name="to"
            validateFirst={true}
            rules={formValdation.to}
            validateTrigger="onBlur"
          >
            <Input placeholder="To" />
          </Form.Item>
        </div>
        <div className="two-input-row">
          <Form.Item
            name="quantity"
            validateFirst={true}
            rules={formValdation.quantity}
            validateTrigger="onBlur"
          >
            <Input placeholder="Quantity" type="number" />
          </Form.Item>
          <Form.Item
            name="coin"
            validateFirst={true}
            rules={formValdation.coin}
            validateTrigger="onBlur"
            initialValue={`${asset}`}
          >
            <Input placeholder="Coin (Default)" />
          </Form.Item>
        </div>
        <p>Only members with memo key can read your memos</p>
        <Form.Item
          name="memo"
          validateFirst={true}
          rules={formValdation.memo}
          validateTrigger="onBlur"
        >
          <Input placeholder="Memo" />
        </Form.Item>
        <p>
          Fees: {feeData ? feeData.amount : 0} {asset}
        </p>
        {status === "" ? "" : <p>{status}</p>}
        <Form.Item>
          <Styled.TransferFormButton type="primary" htmlType="submit">
            Send
          </Styled.TransferFormButton>
        </Form.Item>
      </Styled.TransferForm>
      <PasswordModal visible={visible} onCancel={onCancel} />
    </Form.Provider>
  );
};

export default TransferForm;
