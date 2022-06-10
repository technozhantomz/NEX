import counterpart from "counterpart";

import { defaultLocales, faucetUrl } from "../../../../api/params";
import { useSettings } from "../../hooks";

import * as Styled from "./GeneralTab.styled";

export const GeneralTab = (): JSX.Element => {
  const {
    updateSettings,
    generalSettingsForm,
    handleAllowNotifications,
    showSuccessMessage,
  } = useSettings();
  return (
    <Styled.GeneralSettingsCard>
      <Styled.GeneralTabForm
        form={generalSettingsForm}
        name="generalSettingsForm"
        onFinish={updateSettings}
      >
        <Styled.LabelText>
          {counterpart.translate(`field.labels.select_language`)}
        </Styled.LabelText>
        <Styled.LanguageFormItem name="selectedLanguage">
          <Styled.Select>
            {defaultLocales.map((e, id) => (
              <Styled.Option key={id} value={e.type}>
                {e.title}
              </Styled.Option>
            ))}
          </Styled.Select>
        </Styled.LanguageFormItem>

        <Styled.LabelText>
          {counterpart.translate(`field.labels.browser_notifications`)}
        </Styled.LabelText>
        <Styled.FormItem valuePropName="checked" name="allowNotifications">
          <Styled.Checkbox onChange={handleAllowNotifications}>
            {counterpart.translate(`field.checkBoxes.enable_notifications`)}
          </Styled.Checkbox>
        </Styled.FormItem>
        {/* <Styled.FormItem
          valuePropName="checked"
          name="allowTransferToMeNotifications"
        >
          <Styled.TransferCheckbox>
            Notify about transfers to my account
          </Styled.TransferCheckbox>
        </Styled.FormItem> */}
        <Styled.FaucetSpace>
          <Styled.LabelText>
            {counterpart.translate(`field.labels.faucet`)}
          </Styled.LabelText>
          <Styled.FaucetURLWrapper>
            <Styled.FaucetURL>{`${counterpart.translate(
              `field.labels.faucet_url`
            )} ${faucetUrl}`}</Styled.FaucetURL>
            <Styled.CopyButton
              buttonText={counterpart.translate(`field.labels.copy_url`)}
              copyValue={`${faucetUrl as string}`}
            ></Styled.CopyButton>
          </Styled.FaucetURLWrapper>
          {showSuccessMessage && (
            <Styled.LabelText type="success">
              {counterpart.translate(`field.labels.setting_saved`)}
            </Styled.LabelText>
          )}
        </Styled.FaucetSpace>
        <Styled.SaveButton type="primary" htmlType="submit">
          {counterpart.translate(`buttons.save`)}
        </Styled.SaveButton>
      </Styled.GeneralTabForm>
    </Styled.GeneralSettingsCard>
  );
};
