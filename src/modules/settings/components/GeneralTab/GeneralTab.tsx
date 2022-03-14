import { Form, Input, Checkbox, Button, Select, Typography, Space } from "antd";
import React from "react";
import * as Styled from "./GeneralTab.styled";

const { Option } = Select;
const { Text, Link } = Typography;

export const GeneralTab = (): JSX.Element => {

  return (
    <Styled.GeneralSettingsCard>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 6 }}
        initialValues={{ remember: true }}
      >
        <Text strong>Select language</Text>
        <Form.Item
          name="selectLanguage"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Select defaultValue="lucy">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>

        <Text strong>Enable transfers to my account</Text>
        <Form.Item>
          <Checkbox.Group>
            <Checkbox value="Yes">Yes</Checkbox>
            <Checkbox value="No">No</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Space direction="vertical">

          <Text strong>Faucet</Text>
          <Space direction="horizontal">

          <Text>Faucet URL: https://faucet.peerplays.download/faucet/api/v1/accounts</Text>
            <Typography.Link copyable>Copy URL</Typography.Link>
          </Space>
        </Space>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Styled.GeneralSettingsCard>
  );
};
