import { PasswordModal } from "../../../../../../common/components";
import { Form, RedoOutlined } from "../../../../../../ui/src";

import * as Styled from "./ProxyForm.styled";

export const ProxyForm = (): JSX.Element => {
  return (
    <Form.Provider>
      <Styled.ProxyForm>
        <Form.Item>
          <Styled.ProxyFormSearch />
        </Form.Item>
        <Form.Item>
          <Styled.ProxyFormButton type="primary">Add</Styled.ProxyFormButton>
        </Form.Item>
        <Form.Item>
          <Styled.ProxyFormButton type="primary">
            Publish changes
          </Styled.ProxyFormButton>
        </Form.Item>
        <Form.Item>
          <Styled.ProxyFormButton type="link">
            <RedoOutlined rotate={-90} /> Reset changes
          </Styled.ProxyFormButton>
        </Form.Item>
      </Styled.ProxyForm>
      <PasswordModal
        visible={false}
        onCancel={function (): void {
          throw new Error("Function not implemented.");
        }}
        submitting={false}
      />
    </Form.Provider>
  );
};
