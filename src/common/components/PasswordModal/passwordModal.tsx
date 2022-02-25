import { Form, Input } from "antd";

import * as Styled from "./passwordModal.styled";
import { usePasswordForm } from "./usePasswordForm";

type Props = {
  visible: boolean;
  onCancel: () => void;
};

const passwordModal = ({ visible, onCancel }: Props): JSX.Element => {
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
      <Styled.PasswordModalForm form={passwordModalForm} name="passwordModal">
        <Form.Item
          name="password"
          rules={[{ validator: validatePassword }]}
          validateFirst={true}
          validateTrigger="onBlur"
        >
          <Input.Password size="large" placeholder="Password" />
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

export default passwordModal;
