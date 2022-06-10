import counterpart from "counterpart";

import { Form, Input } from "../../../ui/src";
import { useAsset } from "../../hooks";
import { useUserContext } from "../../providers";
import { PasswordModal } from "../PasswordModal";

import * as Styled from "./TransferForm.styled";
import { useTransferForm } from "./hooks";

type Props = {
  asset: string;
};

export const TransferForm = ({ asset }: Props): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const {
    status,
    isPasswordModalVisible,
    feeAmount,
    transferForm,
    formValdation,
    handlePasswordModalCancel,
    confirm,
    onFormFinish,
    handleValuesChange,
    submittingPassword,
  } = useTransferForm();
  const { defaultAsset } = useAsset();

  return (
    <Form.Provider onFormFinish={onFormFinish}>
      <Styled.TransferForm
        form={transferForm}
        name="transferForm"
        onFinish={confirm}
        size="large"
        onValuesChange={handleValuesChange}
      >
        <div className="two-input-row">
          <Form.Item
            name="from"
            rules={formValdation.from}
            validateFirst={true}
            validateTrigger="onBlur"
            initialValue={localStorageAccount}
          >
            <Input disabled={true} placeholder="From" />
          </Form.Item>
          <Form.Item
            name="amount"
            validateFirst={true}
            rules={formValdation.amount}
            validateTrigger="onBlur"
          >
            <Input
              placeholder={counterpart.translate(`field.placeholder.quantity`)}
              type="number"
            />
          </Form.Item>
        </div>
        <div className="two-input-row">
          <Form.Item
            name="to"
            validateFirst={true}
            rules={formValdation.to}
            validateTrigger="onBlur"
          >
            <Input
              placeholder={counterpart.translate(`field.placeholder.to`)}
            />
          </Form.Item>
          <Form.Item
            name="asset"
            validateFirst={true}
            rules={formValdation.asset}
            validateTrigger="onBlur"
            initialValue={`${asset}`}
          >
            <Input disabled={true} />
          </Form.Item>
        </div>
        <p>{counterpart.translate(`field.comments.only_members_can_read`)}</p>
        <Form.Item name="memo" validateFirst={true} rules={formValdation.memo}>
          <Input
            placeholder={counterpart.translate(`field.placeholder.memo`)}
          />
        </Form.Item>
        <p>
          {counterpart.translate(`field.labels.fees`, {
            feeAmount: feeAmount,
            defaultAsset: defaultAsset ? defaultAsset.symbol : "",
          })}
        </p>
        {status === "" ? "" : <p>{status}</p>}
        <Styled.FormItem>
          <Styled.TransferFormButton type="primary" htmlType="submit">
            {counterpart.translate(`buttons.send`)}
          </Styled.TransferFormButton>
        </Styled.FormItem>
      </Styled.TransferForm>
      <PasswordModal
        visible={isPasswordModalVisible}
        onCancel={handlePasswordModalCancel}
        submitting={submittingPassword}
      />
    </Form.Provider>
  );
};
