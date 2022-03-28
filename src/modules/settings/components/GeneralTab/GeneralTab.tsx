import React from "react";

import { defaultLocales } from "../../../../api/params/defaultLocales";
import { faucetUrl } from "../../../../api/params/networkparams";
import { useGeneralTab } from "../hooks/useGeneralTab";

import * as Styled from "./GeneralTab.styled";

export const GeneralTab = (): JSX.Element => {
  const {
    updateSetting,
    handleLanguageChange,
    language,
    generalSettingForm,
    handleNotificationCheckbox,
    notification,
    successMsg,
  } = useGeneralTab();

  return (
    <Styled.GeneralSettingsCard>
      <Styled.GeneralTabForm.Provider onFormFinish={updateSetting}>
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
              {defaultLocales.map((e, id) => (
                <Styled.Option key={id} value={e.type}>
                  {e.title}
                </Styled.Option>
              ))}
            </Styled.Select>
          </Styled.LanguageFormItem>

          <Styled.Text strong>Enable transfers to my account</Styled.Text>
          <Styled.SecondItem name="isEnableTransfer">
            <Styled.Checkbox
              onChange={(e) => handleNotificationCheckbox(e.target.checked)}
              defaultChecked={notification}
            >
              Yes
            </Styled.Checkbox>
          </Styled.SecondItem>
          <Styled.FaucetText direction="vertical">
            <Styled.Text strong>Faucet</Styled.Text>
            <Styled.Space direction="horizontal">
              <Styled.FaucetURL>
                Faucet URL:
                {faucetUrl}
              </Styled.FaucetURL>
              <Styled.Typography.Link copyable={{ text: faucetUrl }}>
                Copy URL
              </Styled.Typography.Link>
            </Styled.Space>
            {successMsg && (
              <Styled.Text type="success" strong>
                Setting saved!
              </Styled.Text>
            )}
          </Styled.FaucetText>
          <Styled.Button type="primary" htmlType="submit">
            Save
          </Styled.Button>
        </Styled.GeneralTabForm>
      </Styled.GeneralTabForm.Provider>
    </Styled.GeneralSettingsCard>
  );
};
