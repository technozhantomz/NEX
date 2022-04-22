import { useRouter } from "next/router";

import { PasswordModal } from "../../../../../../common/components";
import { Button, Form, Input, InputNumber } from "../../../../../../ui/src";

import * as Styled from "./PowerDownForm.styled";
import { usePowerDownForm } from "./hooks";

export const PowerDownForm = (): JSX.Element => {
  const router = useRouter();
  const {
    powerUpForm,
    isPasswordModalVisible,
    submittingPassword,
    handlePasswordModalCancel,
  } = usePowerDownForm();
  return (
    <>
      <Form.Provider>
        <Styled.PowerDownForm
          form={powerUpForm}
          name="powerUpForm"
          // onFinish={confirm}
          // onValuesChange={handleValuesChange}
          size="large"
        >
          <Form.Item
            name="openingBalance"
            label="Open Balance:"
            //   rules={formValdation.from}
            validateFirst={true}
            validateTrigger="onBlur"
            //   initialValue={localStorageAccount}
            //   hidden={withAssetSelector ? true : false}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="availableBalance"
            label="Available Balance:"
            //   rules={formValdation.from}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="withdrawAmount"
            label="Withdraw"
            //   rules={formValdation.from}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <InputNumber
              addonBefore={<Button type="text">+</Button>}
              addonAfter={<Button type="text">-</Button>}
            />
          </Form.Item>
          <Form.Item
            name="newBalance"
            label="New Balance:"
            //   rules={formValdation.from}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item>
            <Styled.PowerDownFormButton type="primary" htmlType="submit">
              Withdraw
            </Styled.PowerDownFormButton>
          </Form.Item>
        </Styled.PowerDownForm>
        <PasswordModal
          visible={isPasswordModalVisible}
          onCancel={handlePasswordModalCancel}
          submitting={submittingPassword}
        />
      </Form.Provider>
      <Styled.PowerDownFormButton
        type="link"
        onClick={() => router.push(`/voting`)}
      >
        Cancel
      </Styled.PowerDownFormButton>
    </>
  );
};
