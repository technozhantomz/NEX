import { Form, Input } from "antd";

import * as Styled from "./passwordModal.styled";
import { usePasswordForm } from "./usePasswordForm";

type Props = {
  visible: boolean;
  onCancel: () => void;
};

const passwordModal = ({ visible, onCancel }: Props): JSX.Element => {
  const { validatePassword, passwordModalForm } = usePasswordForm();

  const onOk = () => {
    passwordModalForm.submit();
  };

  return (
    <Styled.PasswordModal
      title="Password"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Styled.PasswordModalForm form={passwordModalForm} name="passwordModal">
        <Form.Item
          name="password"
          rules={[{ validator: validatePassword }]}
          validateFirst={true}
          validateTrigger="onBlur"
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
      </Styled.PasswordModalForm>
    </Styled.PasswordModal>
  );
};

export default passwordModal;
