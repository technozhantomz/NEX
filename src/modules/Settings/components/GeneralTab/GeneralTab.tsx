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
        <Styled.LabelText>Select language</Styled.LabelText>
        <Styled.LanguageFormItem name="selectedLanguage">
          <Styled.Select>
            {defaultLocales.map((e, id) => (
              <Styled.Option key={id} value={e.type}>
                {e.title}
              </Styled.Option>
            ))}
          </Styled.Select>
        </Styled.LanguageFormItem>

        <Styled.LabelText>Browser notifications</Styled.LabelText>
        <Styled.FormItem valuePropName="checked" name="allowNotifications">
          <Styled.Checkbox onChange={handleAllowNotifications}>
            Enable notifications
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
          <Styled.LabelText>Faucet</Styled.LabelText>
          <Styled.FaucetURLWrapper>
            <Styled.FaucetURL>{`Faucet URL: ${faucetUrl}`}</Styled.FaucetURL>
            <Styled.CopyButton
              buttonText="Copy URL"
              copyValue={`${faucetUrl as string}`}
            ></Styled.CopyButton>
          </Styled.FaucetURLWrapper>
          {showSuccessMessage && (
            <Styled.LabelText type="success">Setting saved!</Styled.LabelText>
          )}
        </Styled.FaucetSpace>
        <Styled.SaveButton type="primary" htmlType="submit">
          Save
        </Styled.SaveButton>
      </Styled.GeneralTabForm>
    </Styled.GeneralSettingsCard>
  );
};
