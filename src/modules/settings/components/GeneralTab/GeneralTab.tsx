import { Checkbox, Form, Select, Space, Typography } from "antd";
import React from "react";

import { faucetUrl } from "../../../../api/params/networkparams";
import { CardFormButton } from "../../../../ui/src";

import * as Styled from "./GeneralTab.styled";
import { useGeneralTab } from "./hooks/useGeneralTab";

const { Option } = Select;
const { Text } = Typography;

export const GeneralTab = (): JSX.Element => {
  const {
    onFormFinish,
    handleLanguageChange,
    language,
    generalSettingForm,
    handleNotificationCheckbox,
    notification,
  } = useGeneralTab();

  return (
    <Styled.GeneralSettingsCard>
      <Styled.GeneralTabForm.Provider onFormFinish={onFormFinish}>
        <Styled.GeneralTabForm
          form={generalSettingForm}
          name="generalSettingForm"
        >
          <Styled.LanguageLabel strong>Select language</Styled.LanguageLabel>
          <Styled.LanguageFormItem name="selectedLanguage">
            <Styled.Select
              defaultValue={language}
              onChange={handleLanguageChange}
            >
              <Option value="EN">English </Option>
              <Option value="RU">Russian</Option>
            </Styled.Select>
          </Styled.LanguageFormItem>

          <Text strong>Enable transfers to my account</Text>
          <Styled.SecondItem name="isEnableTransfer">
            <Checkbox
              onChange={(e) => handleNotificationCheckbox(e.target.checked)}
              defaultChecked={notification}
            >
              Yes
            </Checkbox>
          </Styled.SecondItem>
          <Styled.FaucetText direction="vertical">
            <Text strong>Faucet</Text>
            <Space direction="horizontal">
              <Styled.FaucetURL>
                Faucet URL:
                {faucetUrl}
              </Styled.FaucetURL>
              <Typography.Link copyable>Copy URL</Typography.Link>
            </Space>
          </Styled.FaucetText>
          <Form.Item>
            <CardFormButton type="primary" htmlType="submit">
              Save
            </CardFormButton>
          </Form.Item>
        </Styled.GeneralTabForm>
      </Styled.GeneralTabForm.Provider>
    </Styled.GeneralSettingsCard>
  );
};
