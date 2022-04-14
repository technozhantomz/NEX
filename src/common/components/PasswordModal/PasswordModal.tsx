import { Form, Input } from "../../../ui/src";

import * as Styled from "./PasswordModal.styled";
import { usePasswordForm } from "./hooks";

type Props = {
  visible: boolean;
  onCancel: () => void;
  submitting: boolean;
};

export const PasswordModal = ({
  visible,
  onCancel,
  submitting,
}: Props): JSX.Element => {
  const { validatePassword, useResetFormOnCloseModal, passwordModalForm } =
    usePasswordForm();

  useResetFormOnCloseModal(passwordModalForm, visible);

  return (
    <Styled.PasswordModal
      title="Password"
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
          rules={[{ validator: validatePassword }]}
          validateFirst={true}
          validateTrigger="onBlur"
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Styled.PasswordModalFormButton
            type="primary"
            htmlType="submit"
            loading={submitting}
          >
            Send
          </Styled.PasswordModalFormButton>
        </Form.Item>
      </Styled.PasswordModalForm>
    </Styled.PasswordModal>
  );
};
