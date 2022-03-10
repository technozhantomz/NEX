import { Form, Input } from "antd";

import * as Styled from "./PasswordModal.styled";
import { usePasswordForm } from "./hooks/usePasswordForm";

type Props = {
  visible: boolean;
  onCancel: () => void;
};

export const PasswordModal = ({ visible, onCancel }: Props): JSX.Element => {
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
      onCancel={onCancel}
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
          <Styled.PasswordModalFormButton type="primary" htmlType="submit">
            Send
          </Styled.PasswordModalFormButton>
        </Form.Item>
      </Styled.PasswordModalForm>
    </Styled.PasswordModal>
  );
};
