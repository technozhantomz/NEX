import counterpart from "counterpart";

import { Checkbox, Form, Input } from "../../../ui/src";
import { useUserContext } from "../../providers";
import { KeyType } from "../../types";

import * as Styled from "./PasswordModal.styled";
import { usePasswordForm } from "./hooks";

type Props = {
  visible: boolean;
  onCancel: () => void;
  submitting?: boolean;
  neededKeyType: KeyType;
};

export const PasswordModal = ({
  visible,
  onCancel,
  submitting,
  neededKeyType,
}: Props): JSX.Element => {
  const {
    passwordModalForm,
    formValidation,
    onChangeUseWhaleVault,
    useResetFormOnCloseModal,
    useWhaleVault,
  } = usePasswordForm({ neededKeyType });
  const { localStorageAccount } = useUserContext();

  useResetFormOnCloseModal(passwordModalForm, visible);

  return (
    <Styled.PasswordModal
      title={counterpart.translate(`pages.modal.password_modal.heading`, {
        neededKeyType: neededKeyType,
      })}
      visible={visible}
      centered={true}
      onOk={() => {
        passwordModalForm.submit();
      }}
      onCancel={!submitting ? onCancel : undefined}
      footer={null}
    >
      <Styled.PasswordModalForm
        form={passwordModalForm}
        name="passwordModal"
        size="large"
        initialValues={{
          username: localStorageAccount,
          keyType: neededKeyType,
          useWhaleVault: useWhaleVault,
        }}
      >
        <Form.Item name="keyType" hidden={true}>
          <Input disabled={true} hidden={true} />
        </Form.Item>
        <Form.Item name="username">
          <Input
            disabled={true}
            autoComplete="new-password"
            placeholder={counterpart.translate(`field.placeholder.user_name`)}
          />
        </Form.Item>
        {!useWhaleVault && (
          <Form.Item
            name="password"
            rules={formValidation.password}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Input.Password
              placeholder={counterpart.translate(
                `pages.modal.password_modal.heading`,
                {
                  neededKeyType: neededKeyType,
                }
              )}
              autoComplete="new-password"
            />
          </Form.Item>
        )}

        <Form.Item
          rules={formValidation.useWhaleVault}
          validateFirst={true}
          validateTrigger={["onChange", "onSubmit"]}
          name="useWhaleVault"
          className="checkbox"
        >
          <Checkbox onChange={onChangeUseWhaleVault} checked={useWhaleVault}>
            {counterpart.translate(`field.labels.use_whalevault`)}
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Styled.PasswordModalFormButton
            type="primary"
            htmlType="submit"
            loading={submitting !== undefined ? submitting : false}
          >
            {counterpart.translate(`buttons.confirm`)}
          </Styled.PasswordModalFormButton>
        </Form.Item>
      </Styled.PasswordModalForm>
    </Styled.PasswordModal>
  );
};
