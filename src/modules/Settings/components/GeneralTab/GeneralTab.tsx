import counterpart from "counterpart";

import { defaultLocales, faucetUrl } from "../../../../api/params";
import { useSettingsContext } from "../../../../common/providers";
import { Checkbox, Col, InfoCircleOutlined, Row } from "../../../../ui/src";
import { useSettings } from "../../hooks";

import * as Styled from "./GeneralTab.styled";

export const GeneralTab = (): JSX.Element => {
  const {
    updateSettings,
    generalSettingsForm,
    handleAllowNotifications,
    showSuccessMessage,
    handleCheckboxChange,
    handleValuesChange,
    _isSettingChanged,
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
        onValuesChange={handleValuesChange}
      >
        <Row>
          <Col span={9}>
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

            {/* <Styled.LabelText>
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
            </Styled.GeneralSettingFormItem> */}

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
          </Col>
          <Col span={9}>
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

            <Styled.CheckBoxGroup
              name="selectNotifications"
              validateTrigger="onChange"
            >
              <Checkbox.Group onChange={handleCheckboxChange}>
                <Row>
                  <Col span={9}>
                    <Styled.FormItem valuePropName="checked" name="fundSent">
                      <Styled.Checkbox
                        disabled={!settings.notifications.allow}
                        value="transfer"
                      >
                        {counterpart.translate(`field.checkBoxes.funds_sent`)}
                      </Styled.Checkbox>
                    </Styled.FormItem>

                    <Styled.FormItem
                      valuePropName="checked"
                      name="orderCreated"
                    >
                      <Styled.Checkbox
                        disabled={!settings.notifications.allow}
                        value="limit_order_create"
                      >
                        {counterpart.translate(
                          `field.checkBoxes.order_created`
                        )}
                      </Styled.Checkbox>
                    </Styled.FormItem>

                    <Styled.FormItem valuePropName="checked" name="orderFilled">
                      <Styled.Checkbox
                        disabled={!settings.notifications.allow}
                        value="order_filled"
                      >
                        {counterpart.translate(`field.checkBoxes.order_filled`)}
                      </Styled.Checkbox>
                    </Styled.FormItem>

                    <Styled.FormItem
                      valuePropName="checked"
                      name="orderCanceled"
                    >
                      <Styled.Checkbox
                        disabled={!settings.notifications.allow}
                        value="limit_order_cancel"
                      >
                        {counterpart.translate(
                          `field.checkBoxes.order_canceled`
                        )}
                      </Styled.Checkbox>
                    </Styled.FormItem>

                    <Styled.FormItem
                      valuePropName="checked"
                      name="orderExpired"
                    >
                      <Styled.Checkbox
                        disabled={!settings.notifications.allow}
                        value="order_expired"
                      >
                        {counterpart.translate(
                          `field.checkBoxes.order_expired`
                        )}
                      </Styled.Checkbox>
                    </Styled.FormItem>
                  </Col>

                  <Col span={13}>
                    <Styled.FormItem
                      valuePropName="checked"
                      name="fundsReceived"
                    >
                      <Styled.Checkbox
                        disabled={!settings.notifications.allow}
                        value="funds_received"
                      >
                        {counterpart.translate(
                          `field.checkBoxes.funds_received`
                        )}
                      </Styled.Checkbox>
                    </Styled.FormItem>

                    <Styled.FormItem
                      valuePropName="checked"
                      name="account_upgrade"
                    >
                      <Styled.Checkbox
                        disabled={!settings.notifications.allow}
                        value="account_upgrade"
                      >
                        {counterpart.translate(
                          `field.checkBoxes.account_upgrade`
                        )}
                      </Styled.Checkbox>
                    </Styled.FormItem>

                    <Styled.FormItem
                      valuePropName="checked"
                      name="vesting_balance_create"
                    >
                      <Styled.Checkbox
                        disabled={!settings.notifications.allow}
                        value="vesting_balance_create"
                      >
                        {counterpart.translate(
                          `field.checkBoxes.vesting_balance_create`
                        )}
                      </Styled.Checkbox>
                    </Styled.FormItem>

                    <Styled.FormItem
                      valuePropName="checked"
                      name="vesting_balance_withdraw"
                    >
                      <Styled.Checkbox
                        disabled={!settings.notifications.allow}
                        value="vesting_balance_withdraw"
                      >
                        {counterpart.translate(
                          `field.checkBoxes.vesting_balance_withdraw`
                        )}
                      </Styled.Checkbox>
                    </Styled.FormItem>

                    <Styled.FormItem
                      valuePropName="checked"
                      name="accountUpdated"
                    >
                      <Styled.Checkbox
                        disabled={!settings.notifications.allow}
                        value="account_updated"
                      >
                        {counterpart.translate(
                          `field.checkBoxes.account_updated`
                        )}
                      </Styled.Checkbox>
                    </Styled.FormItem>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Styled.CheckBoxGroup>
          </Col>
        </Row>
        {!_isSettingChanged && (
          <Styled.LabelText>
            <InfoCircleOutlined />
            {counterpart.translate(`field.labels.unsaved_changes`)}
          </Styled.LabelText>
        )}
        <Styled.SaveButton type="primary" htmlType="submit">
          {counterpart.translate(`buttons.save`)}
        </Styled.SaveButton>
        <Styled.FaucetSpace>
          <Styled.LabelText>
            {counterpart.translate(`field.labels.faucet`)}
            <InfoCircleOutlined />
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
      </Styled.GeneralTabForm>
    </Styled.GeneralSettingsCard>
  );
};
