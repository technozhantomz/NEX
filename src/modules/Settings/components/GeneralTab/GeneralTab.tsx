import { Col, Row } from "antd";

import { defaultLocales, faucetUrl } from "../../../../api/params";
import { useSettingsContext } from "../../../../common/providers";
import { useSettings } from "../../hooks";

import * as Styled from "./GeneralTab.styled";

const style = { background: "#0092ff" };

export const GeneralTab = (): JSX.Element => {
  const {
    updateSettings,
    generalSettingsForm,
    handleAllowNotifications,
    showSuccessMessage,
  } = useSettings();
  const { settings } = useSettingsContext();
  return (
    <Styled.GeneralSettingsCard>
      <Styled.GeneralTabForm
        form={generalSettingsForm}
        name="generalSettingsForm"
        initialValues={{
          selectedLanguage: settings.language,
          allowNotifications: settings.notifications.allow,
          allowTransferToMeNotifications:
            settings.notifications.additional.transferToMe,
        }}
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
          <Row gutter={[1, 20]}>
            <Col className="gutter-row" md={10} xs={24}>
              <Styled.FaucetURL>{`Faucet URL: ${faucetUrl}`}</Styled.FaucetURL>
            </Col>
            <Col className="gutter-row" md={6} xs={24}>
              <Styled.Typography.Link copyable={{ text: faucetUrl }}>
                Copy URL
              </Styled.Typography.Link>
            </Col>
          </Row>
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
