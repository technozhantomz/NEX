import { Button, Form, Input } from "antd";

import * as Styled from "./TransferTab.styled";

type Props = {
  asset: string;
};

const TransferTab = ({ asset }: Props): JSX.Element => {
  return (
    <Styled.TransferForm>
      <Form.Item name="from" validateFirst={true} validateTrigger="onBlur">
        <Input placeholder="From" />
      </Form.Item>
      <Form.Item name="to" validateFirst={true} validateTrigger="onBlur">
        <Input placeholder="To" />
      </Form.Item>
      <Form.Item name="quantity" validateFirst={true} validateTrigger="onBlur">
        <Input placeholder="Quantity" />
      </Form.Item>
      <Form.Item name="coin" validateFirst={true} validateTrigger="onBlur">
        <Input placeholder="Coin (Default)" defaultValue={`${asset}`} />
      </Form.Item>
      <p>Only members with memo key can read your memos</p>
      <Form.Item name="memo" validateFirst={true} validateTrigger="onBlur">
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
