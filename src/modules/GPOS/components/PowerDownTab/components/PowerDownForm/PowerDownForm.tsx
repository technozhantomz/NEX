import { useRouter } from "next/router";

import { PasswordModal } from "../../../../../../common/components";
import { Button, Form, Input, InputNumber } from "../../../../../../ui/src";

import * as Styled from "./PowerDownForm.styled";
import { usePowerDownForm } from "./hooks";

export const PowerDownForm = (): JSX.Element => {
  const router = useRouter();
  const {
    powerDownForm,
    isPasswordModalVisible,
    submittingPassword,
    confirm,
    onFormFinish,
    adjustWithdraw,
    handlePasswordModalCancel,
  } = usePowerDownForm();
  return (
    <>
      <Form.Provider onFormFinish={onFormFinish}>
        <Styled.PowerDownForm
          form={powerDownForm}
          name="powerDownForm"
          onFinish={confirm}
          size="large"
        >
          <Form.Item name="openingBalance" label="Open Balance:">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="availableBalance" label="Available Balance:">
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
              addonBefore={
                <Button type="text" onClick={() => adjustWithdraw("+")}>
                  +
                </Button>
              }
              addonAfter={
                <Button type="text" onClick={() => adjustWithdraw("-")}>
                  -
                </Button>
              }
            />
          </Form.Item>
          <Form.Item name="newBalance" label="New Balance:">
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
