import counterpart from "counterpart";

import { defaultLocales, faucetUrl } from "../../../../api/params";
import { useSettingsContext } from "../../../../common/providers";
import { Col, InfoCircleOutlined, Row } from "../../../../ui/src";
import { useSettings } from "../../hooks";

import * as Styled from "./GeneralTab.styled";

export const GeneralTab = (): JSX.Element => {
  const {
    updateSettings,
    generalSettingsForm,
    handleAllowNotifications,
    showSuccessMessage,
  } = useSettings();

  const { settings } = useSettingsContext();

  const walletLockInMinutes = ["0", "30", "60", "90", "180", "210"];

  return (
    <Styled.GeneralSettingsCard>
      <Styled.GeneralTabForm
        form={generalSettingsForm}
        name="generalSettingsForm"
        onFinish={updateSettings}
        initialValues={{ walletLockInMinutes: settings.walletLock }}
      >
        <Row>
          <Col span={12}>
            <Styled.LabelText>
              {counterpart.translate(`field.labels.select_language`)}
            </Styled.LabelText>
            <Styled.GeneralSettingFormItem name="selectedLanguage">
              <Styled.Select>
                {defaultLocales.map((e, id) => (
                  <Styled.Option key={id} value={e.type}>
                    {e.title}
                  </Styled.Option>
                ))}
              </Styled.Select>
            </Styled.GeneralSettingFormItem>

            <Styled.LabelText>
              {counterpart.translate(`field.labels.ui_design`)}
            </Styled.LabelText>
            <Styled.GeneralSettingFormItem name="darkTheme">
              <Styled.Select>
                <Styled.Option value={true}>Dark mode</Styled.Option>
                <Styled.Option value={false}>Light mode</Styled.Option>
              </Styled.Select>
            </Styled.GeneralSettingFormItem>

            <Styled.LabelText>
              {counterpart.translate(
                `field.labels.allow_transfer_to_my_account`
              )}
              <InfoCircleOutlined />
            </Styled.LabelText>
            <Styled.GeneralSettingFormItem name="allowTransferToMeNotifications">
              <Styled.Select>
                <Styled.Option value={true}>Yes</Styled.Option>
                <Styled.Option value={false}>No</Styled.Option>
              </Styled.Select>
            </Styled.GeneralSettingFormItem>

            <Styled.LabelText>
              {counterpart.translate(`field.labels.lock_wallet`)}
              <InfoCircleOutlined />
            </Styled.LabelText>
            <Styled.GeneralSettingFormItem name="walletLockInMinutes">
              <Styled.Select>
                {walletLockInMinutes.map((e, i) => (
                  <Styled.Option value={e} key={i}>
                    {e} {counterpart.translate(`field.options.lock_wallet`)}
                  </Styled.Option>
                ))}
              </Styled.Select>
            </Styled.GeneralSettingFormItem>

            {/* <Styled.LabelText>
              {counterpart.translate(`field.labels.browser_notifications`)}
            </Styled.LabelText>
            <Styled.FormItem valuePropName="checked" name="allowNotifications">
              <Styled.Checkbox onChange={handleAllowNotifications}>
                {counterpart.translate(`field.checkBoxes.enable_notifications`)}
              </Styled.Checkbox>
            </Styled.FormItem> */}
            {/* <Styled.FormItem
          valuePropName="checked"
          name="allowTransferToMeNotifications"
        >
          <Styled.TransferCheckbox>
            Notify about transfers to my account
          </Styled.TransferCheckbox>
        </Styled.FormItem> */}
            <Styled.LabelText>
              {counterpart.translate(`field.labels.unsaved_changes`)}
              <InfoCircleOutlined />
            </Styled.LabelText>
            <Styled.SaveButton type="primary" htmlType="submit">
              {counterpart.translate(`buttons.save`)}
            </Styled.SaveButton>
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
          </Col>
          <Col span={12}>
            <Styled.LabelText>
              {counterpart.translate(`field.labels.show_notifications`)}
            </Styled.LabelText>
            <Styled.GeneralSettingFormItem name="allowNotifications">
              <Styled.Select onChange={handleAllowNotifications}>
                <Styled.Option value={true}>Yes</Styled.Option>
                <Styled.Option value={false}>No</Styled.Option>
              </Styled.Select>
            </Styled.GeneralSettingFormItem>

            <Styled.LabelText>
              {counterpart.translate(`field.labels.select_notifications`)}
              <InfoCircleOutlined />
            </Styled.LabelText>
            <Row>
              <Col span={12}>
                <Styled.FormItem valuePropName="checked" name="fundSent">
                  <Styled.Checkbox disabled={!settings.notifications.allow}>
                    {counterpart.translate(`field.checkBoxes.funds_sent`)}
                  </Styled.Checkbox>
                </Styled.FormItem>

                <Styled.FormItem valuePropName="checked" name="orderCreated">
                  <Styled.Checkbox disabled={!settings.notifications.allow}>
                    {counterpart.translate(`field.checkBoxes.order_created`)}
                  </Styled.Checkbox>
                </Styled.FormItem>

                <Styled.FormItem valuePropName="checked" name="orderFilled">
                  <Styled.Checkbox disabled={!settings.notifications.allow}>
                    {counterpart.translate(`field.checkBoxes.order_filled`)}
                  </Styled.Checkbox>
                </Styled.FormItem>

                <Styled.FormItem valuePropName="checked" name="orderCanceled">
                  <Styled.Checkbox disabled={!settings.notifications.allow}>
                    {counterpart.translate(`field.checkBoxes.order_canceled`)}
                  </Styled.Checkbox>
                </Styled.FormItem>

                <Styled.FormItem valuePropName="checked" name="orderExpired">
                  <Styled.Checkbox disabled={!settings.notifications.allow}>
                    {counterpart.translate(`field.checkBoxes.order_expired`)}
                  </Styled.Checkbox>
                </Styled.FormItem>
              </Col>

              <Col span={12}>
                <Styled.FormItem valuePropName="checked" name="fundsReceived">
                  <Styled.Checkbox disabled={!settings.notifications.allow}>
                    {counterpart.translate(`field.checkBoxes.funds_received`)}
                  </Styled.Checkbox>
                </Styled.FormItem>

                <Styled.FormItem valuePropName="checked" name="swapStarted">
                  <Styled.Checkbox disabled={!settings.notifications.allow}>
                    {counterpart.translate(`field.checkBoxes.swap_started`)}
                  </Styled.Checkbox>
                </Styled.FormItem>

                <Styled.FormItem valuePropName="checked" name="swapFilled">
                  <Styled.Checkbox disabled={!settings.notifications.allow}>
                    {counterpart.translate(`field.checkBoxes.swap_filled`)}
                  </Styled.Checkbox>
                </Styled.FormItem>

                <Styled.FormItem valuePropName="checked" name="swapCanceled">
                  <Styled.Checkbox disabled={!settings.notifications.allow}>
                    {counterpart.translate(`field.checkBoxes.swap_canceled`)}
                  </Styled.Checkbox>
                </Styled.FormItem>

                <Styled.FormItem valuePropName="checked" name="accountUpdated">
                  <Styled.Checkbox disabled={!settings.notifications.allow}>
                    {counterpart.translate(`field.checkBoxes.account_updated`)}
                  </Styled.Checkbox>
                </Styled.FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
      </Styled.GeneralTabForm>
    </Styled.GeneralSettingsCard>
  );
};
