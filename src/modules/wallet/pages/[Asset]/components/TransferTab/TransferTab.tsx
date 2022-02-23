import { Form, Input } from "antd";

import { useUser } from "../../../../../../context";

import * as Styled from "./TransferTab.styled";
import { useTransferForm } from "./hooks";

type Props = {
  asset: string;
};

const TransferTab = ({ asset }: Props): JSX.Element => {
  const { accountData } = useUser();
  const { feeData, transferForm, onSend, formValdation } = useTransferForm();

  return (
    <Styled.TransferForm form={transferForm} name="loginForm" onFinish={onSend}>
      <Form.Item
        name="from"
        rules={formValdation.from}
        validateFirst={true}
        validateTrigger="onBlur"
        initialValue={`${accountData?.name}`}
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
      <Form.Item>
        <Styled.TransferFormButton type="primary" htmlType="submit">
          Send
        </Styled.TransferFormButton>
      </Form.Item>
    </Styled.TransferForm>
  );
};

export default TransferTab;
