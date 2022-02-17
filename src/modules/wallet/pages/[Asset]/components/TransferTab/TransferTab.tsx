import { Form, Input } from "antd";

import { useUser } from "../../../../../../context";

import * as Styled from "./TransferTab.styled";
import { useTransferForm } from "./hooks";

type Props = {
  asset: string;
};

const TransferTab = ({ asset }: Props): JSX.Element => {
  const { accountData } = useUser();
  const { validFrom, transferForm, onSend, formValdation } = useTransferForm();

  return (
    <Styled.TransferForm form={transferForm} name="loginForm" onFinish={onSend}>
      <Form.Item
        name="from"
        rules={formValdation.from}
        validateFirst={true}
        validateTrigger="onBlur"
      >
        <Input placeholder="From" defaultValue={`${accountData?.name}`} />
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
        <Input placeholder="Quantity" />
      </Form.Item>
      <Form.Item
        name="coin"
        validateFirst={true}
        rules={formValdation.coin}
        validateTrigger="onBlur"
      >
        <Input placeholder="Coin (Default)" defaultValue={`${asset}`} />
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
      <p>Fees: 0 {asset}</p>
      <Form.Item>
        <Styled.TransferFormButton type="primary" htmlType="submit">
          Send
        </Styled.TransferFormButton>
      </Form.Item>
    </Styled.TransferForm>
  );
};

export default TransferTab;
