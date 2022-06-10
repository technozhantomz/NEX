import counterpart from "counterpart";

import { Form, Input } from "../../../ui/src";

import * as Styled from "./PasswordModal.styled";
import { usePasswordForm } from "./hooks";

type Props = {
  visible: boolean;
  onCancel: () => void;
  submitting?: boolean;
};

export const PasswordModal = ({
  visible,
  onCancel,
  submitting,
}: Props): JSX.Element => {
  const { passwordModalForm, formValidation, useResetFormOnCloseModal } =
    usePasswordForm();

  useResetFormOnCloseModal(passwordModalForm, visible);

  return (
    <Styled.PasswordModal
      title={counterpart.translate(`pages.modal.password_modal.heading`)}
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
      >
        <Form.Item
          name="password"
          rules={formValidation.password}
          validateFirst={true}
          validateTrigger="onBlur"
        >
          <Input.Password
            placeholder={counterpart.translate(
              `pages.modal.password_modal.heading`
            )}
          />
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
