import { Form, Input } from "antd";

import PasswordModal from "../../../../../../common/components/PasswordModal/passwordModal";
import { useUser } from "../../../../../../context";

import * as Styled from "./TransferTab.styled";
import { useTransferForm } from "./hooks";

type Props = {
  asset: string;
};

const TransferTab = ({ asset }: Props): JSX.Element => {
  const { accountData } = useUser();
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
      >
        <Form.Item
          name="from"
          rules={formValdation.from}
          validateFirst={true}
          validateTrigger="onBlur"
          initialValue={`${accountData?.name}`}
        >
          <Input size="large" placeholder="From" />
        </Form.Item>
        <Form.Item
          name="to"
          validateFirst={true}
          rules={formValdation.to}
          validateTrigger="onBlur"
        >
          <Input size="large" placeholder="To" />
        </Form.Item>
        <Form.Item
          name="quantity"
          validateFirst={true}
          rules={formValdation.quantity}
          validateTrigger="onBlur"
        >
          <Input size="large" placeholder="Quantity" type="number" />
        </Form.Item>
        <Form.Item
          name="coin"
          validateFirst={true}
          rules={formValdation.coin}
          validateTrigger="onBlur"
          initialValue={`${asset}`}
        >
          <Input size="large" placeholder="Coin (Default)" />
        </Form.Item>
        <p>Only members with memo key can read your memos</p>
        <Form.Item
          name="memo"
          validateFirst={true}
          rules={formValdation.memo}
          validateTrigger="onBlur"
        >
          <Input size="large" placeholder="Memo" />
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

export default TransferTab;
