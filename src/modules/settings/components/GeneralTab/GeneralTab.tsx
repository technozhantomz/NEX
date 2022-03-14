import { Form, Input, Checkbox, Button, Select, Typography, Space } from "antd";
import React from "react";
import { DashboardButton } from "../../../../common/components/DashboardButton";
import * as Styled from "./GeneralTab.styled";

const { Option } = Select;
const { Text, Link } = Typography;

export const GeneralTab = (): JSX.Element => {

  return (
    <Styled.GeneralSettingsCard>
      <Styled.GeneralTabForm
        initialValues={{ remember: true }}
      >
        <Styled.LanguageLabel strong>Select language</Styled.LanguageLabel>
        <Styled.LanguageFormItem
          name="selectLanguage"
        >
          <Styled.Select defaultValue="1">
            <Option value="1">English </Option>
            <Option value="2">Russian</Option>
          </Styled.Select>
        </Styled.LanguageFormItem>

        <Text strong>Enable transfers to my account</Text>
        <Styled.SecondItem>
          <Checkbox.Group>
            <Checkbox value="Yes">Yes</Checkbox>
            <Checkbox value="No">No</Checkbox>
          </Checkbox.Group>
        </Styled.SecondItem>
        <Styled.FaucetText direction="vertical">

          <Text strong>Faucet</Text>
          <Space direction="horizontal">

            <Styled.FaucetURL>Faucet URL: https://faucet.peerplays.download/faucet/api/v1/accounts</Styled.FaucetURL>
            <Typography.Link copyable>Copy URL</Typography.Link>
          </Space>
        </Styled.FaucetText>
        <Form.Item wrapperCol={{ offset: 20, span: 24 }}>
          <DashboardButton label="Save"/>
        </Form.Item>
      </Styled.GeneralTabForm>
    </Styled.GeneralSettingsCard>
  );
};
