import { PasswordModal } from "../../../../../../common/components";
import { useViewportContext } from "../../../../../../common/providers";
import { Form, RedoOutlined } from "../../../../../../ui/src";

import * as Styled from "./ProxyForm.styled";
import { useProxyForm } from "./hooks";

export const ProxyForm = (): JSX.Element => {
  const {
    proxyForm,
    formValidator,
    isPasswordModalVisible,
    submittingPassword,
    confirm,
    onFormFinish,
    handleSearch,
    handlePasswordModalCancel,
  } = useProxyForm();
  const { sm } = useViewportContext();

  return (
    <Form.Provider onFormFinish={onFormFinish}>
      <Styled.ProxyForm
        form={proxyForm}
        name="proxyForm"
        onFinish={confirm}
        size="large"
        //layout={sm ? "horizontal" : "inline"}
      >
        {/* <Form.Item>
          <Input />
        </Form.Item> */}
        <Styled.ProxyFormActionGroup>
          <Form.Item
            name="proxyUsername"
            rules={formValidator.proxyUsername}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Styled.ProxyFormSearch
              placeholder="Search Accounts"
              onSearch={handleSearch}
            />
          </Form.Item>
          <Form.Item>
            <Styled.ProxyFormButton type="primary">Add</Styled.ProxyFormButton>
          </Form.Item>
        </Styled.ProxyFormActionGroup>
        <Styled.ProxyFormSubmitGroup>
          <Form.Item>
            <Styled.ProxyFormButton type="primary" htmlType="submit">
              Publish changes
            </Styled.ProxyFormButton>
          </Form.Item>
          <Form.Item>
            <Styled.ProxyFormButton type="link">
              <RedoOutlined rotate={-90} /> Reset changes
            </Styled.ProxyFormButton>
          </Form.Item>
        </Styled.ProxyFormSubmitGroup>
      </Styled.ProxyForm>
      <PasswordModal
        visible={isPasswordModalVisible}
        onCancel={handlePasswordModalCancel}
        submitting={submittingPassword}
      />
    </Form.Provider>
  );
};
