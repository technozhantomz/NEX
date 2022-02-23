import { Form, Input } from "antd";

import { usePasswordModal } from "./hooks/usePasswordModal";
import * as Styled from "./passwordModal.styled";

export function passwordModal(callback: (password: string) => void): void {
  const { passwordModal, validatePassword } = usePasswordModal();
  Styled.PasswordModal.confirm({
    title: "Password",
    content: (
      <Styled.PasswordModalForm form={passwordModal} name="passwordModal">
        <Form.Item
          name="password"
          rules={[{ validator: validatePassword }]}
          validateFirst={true}
          validateTrigger="onBlur"
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
      </Styled.PasswordModalForm>
    ),
    onOk() {
      passwordModal.validateFields().then(() => {
        callback(passwordModal.getFieldValue("password"));
      });
    },
    onCancel() {
      return Promise.reject(new Error("Password Required!"));
    },
  });
}
