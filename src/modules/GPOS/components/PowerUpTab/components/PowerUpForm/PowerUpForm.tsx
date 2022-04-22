import { useRouter } from "next/router";

import { PasswordModal } from "../../../../../../common/components";
import { Button, Form, Input, InputNumber } from "../../../../../../ui/src";

import * as Styled from "./PowerUpForm.styled";
import { usePowerUpForm } from "./hooks";

export const PowerUpForm = (): JSX.Element => {
  const router = useRouter();
  const {
    powerUpForm,
    isPasswordModalVisible,
    submittingPassword,
    confirm,
    onFormFinish,
    adjustDeposit,
    handlePasswordModalCancel,
  } = usePowerUpForm();
  return (
    <>
      <Form.Provider>
        <Styled.PowerUpForm
          form={powerUpForm}
          name="powerUpForm"
          onFinish={confirm}
          size="large"
        >
          <Form.Item name="openingBalance" label="Open Balance:">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="depositAmount"
            label="Deposit"
            //   rules={formValdation.from}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <InputNumber
              addonBefore={
                <Button type="text" onClick={() => adjustDeposit("+")}>
                  +
                </Button>
              }
              addonAfter={
                <Button type="text" onClick={() => adjustDeposit("-")}>
                  -
                </Button>
              }
            />
          </Form.Item>
          <Form.Item name="newBalance" label="New Balance:">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item>
            <Styled.PowerUpFormButton type="primary" htmlType="submit">
              Vest
            </Styled.PowerUpFormButton>
          </Form.Item>
        </Styled.PowerUpForm>
        <PasswordModal
          visible={isPasswordModalVisible}
          onCancel={handlePasswordModalCancel}
          submitting={submittingPassword}
        />
      </Form.Provider>
      <Styled.PowerUpFormButton
        type="link"
        onClick={() => router.push(`/voting`)}
      >
        Cancel
      </Styled.PowerUpFormButton>
    </>
  );
};
