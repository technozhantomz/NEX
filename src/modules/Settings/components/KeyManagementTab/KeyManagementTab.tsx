import counterpart from "counterpart";
import React from "react";

import {
  CopyButton,
  PasswordModal,
  TransactionModal,
} from "../../../../common/components";
import { useHandleTransactionForm } from "../../../../common/hooks";
import { useUserContext } from "../../../../common/providers";
import {
  Checkbox,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "../../../../ui/src";

import * as Styled from "./KeyManagementTab.styled";
import { useKeyManagementTab } from "./hooks";

export const KeyManagementTab = (): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const {
    formValidation,
    keyManagementForm,
    generatedKeys,
    handleCheckboxChange,
    memoWarning,
    selectedKeys,
    handleValuesChange,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    transactionErrorMessage,
    transactionSuccessMessage,
    loadingTransaction,
    updateAccountFee,
    handleSaveChanges,
    transactionConfirmed,
    handleSetPassword,
    removePasswordKeys,
  } = useKeyManagementTab();

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: handleSaveChanges,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
  });

  return (
    <Styled.KeyManagementCard>
      <Styled.KeyManagementForm.Provider onFormFinish={handleFormFinish}>
        <Styled.KeyManagementForm
          form={keyManagementForm}
          name="KeyManagementForm"
          onValuesChange={handleValuesChange}
          onFinish={() => {
            handleSetPassword();
            showPasswordModal();
          }}
        >
          <Styled.PasswordFormItem
            name="password"
            rules={formValidation.password}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Styled.PasswordInput
              placeholder={counterpart.translate(`field.placeholder.password`)}
            />
          </Styled.PasswordFormItem>

          <Styled.PasswordFormItem
            name="passwordCheck"
            rules={formValidation.passwordCheck}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Styled.PasswordInput
              placeholder={counterpart.translate(
                `field.placeholder.confirm_password`
              )}
            />
          </Styled.PasswordFormItem>
          <Styled.LabelWrapper>
            <Styled.Label strong>
              {counterpart.translate(`field.labels.select_keys`)}
            </Styled.Label>
          </Styled.LabelWrapper>
          <Styled.CheckBoxGroup
            name="roles"
            rules={formValidation.roles}
            validateFirst={true}
            validateTrigger="onChange"
          >
            <Checkbox.Group
              options={["active", "owner", "memo"]}
              onChange={handleCheckboxChange}
              value={selectedKeys}
            ></Checkbox.Group>
            <Styled.MemoWarning>{memoWarning}</Styled.MemoWarning>
          </Styled.CheckBoxGroup>

          <Styled.ButtonFormItem>
            <Styled.SubmitButton type="primary" htmlType="submit">
              {counterpart.translate(`buttons.lets_go`)}
            </Styled.SubmitButton>
          </Styled.ButtonFormItem>

          {transactionConfirmed && generatedKeys && generatedKeys.length > 0
            ? generatedKeys.map((generatedKey) => {
                if (generatedKey.key && generatedKey.key !== "") {
                  return (
                    <>
                      <Styled.Label>
                        {counterpart.translate(`field.labels.generated_key`, {
                          generatedKeyLabel: generatedKey.label,
                        })}
                      </Styled.Label>
                      <div>
                        <Styled.GeneratedKeyInput
                          value={generatedKey.key}
                          iconRender={(visible = true) => (
                            <div>
                              <CopyButton
                                copyValue={`${generatedKey.key}`}
                              ></CopyButton>
                              {visible ? (
                                <EyeOutlined />
                              ) : (
                                <EyeInvisibleOutlined />
                              )}
                            </div>
                          )}
                        />
                      </div>
                    </>
                  );
                } else {
                  return "";
                }
              })
            : ""}
        </Styled.KeyManagementForm>
        <PasswordModal
          visible={isPasswordModalVisible}
          onCancel={() => {
            removePasswordKeys();
            hidePasswordModal();
          }}
        />
        <TransactionModal
          visible={isTransactionModalVisible}
          onCancel={() => {
            removePasswordKeys();
            hideTransactionModal();
          }}
          transactionErrorMessage={transactionErrorMessage}
          transactionSuccessMessage={transactionSuccessMessage}
          loadingTransaction={loadingTransaction}
          account={localStorageAccount}
          fee={updateAccountFee}
          transactionType="account_update"
          generatedKeys={generatedKeys}
        />
      </Styled.KeyManagementForm.Provider>
    </Styled.KeyManagementCard>
  );
};
