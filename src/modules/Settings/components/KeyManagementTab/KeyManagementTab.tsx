import React from "react";

import { PasswordModal } from "../../../../common/components";
import { useCopyText } from "../../../../common/hooks";
import {
  Checkbox,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "../../../../ui/src";
import { CopyIcon } from "../../../../ui/src/icons";

import * as Styled from "./KeyManagementTab.styled";
import { useKeyManagementTab } from "./hooks";

export const KeyManagementTab = (): JSX.Element => {
  const {
    formValidation,
    keyManagementForm,
    generatedKeys,
    handleCheckboxChange,
    memoWarning,
    selectedKeys,
    handleValuesChange,
  } = useKeyManagementTab();

  return (
    <Styled.KeyManagementCard>
      <Styled.KeyManagementForm.Provider>
        <Styled.KeyManagementForm
          form={keyManagementForm}
          name="KeyManagementForm"
          onValuesChange={handleValuesChange}
          //onFinish={confirm}
        >
          <Styled.PasswordFormItem
            name="password"
            rules={formValidation.password}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Styled.PasswordInput placeholder="Enter password" />
          </Styled.PasswordFormItem>

          <Styled.PasswordFormItem
            name="passwordCheck"
            rules={formValidation.passwordCheck}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Styled.PasswordInput placeholder="Confirm password" />
          </Styled.PasswordFormItem>
          <Styled.LabelWrapper>
            <Styled.Label strong>Select keys to be generated:</Styled.Label>
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
              Let’s Go!
            </Styled.SubmitButton>
          </Styled.ButtonFormItem>

          {generatedKeys && generatedKeys.length > 0
            ? generatedKeys.map((generatedKey) => {
                if (!generatedKey.key && generatedKey.key !== "") {
                  return (
                    <>
                      <Styled.Label>{`The ${generatedKey.label} key you requested is as follows:`}</Styled.Label>
                      <div>
                        <Styled.GeneratedKeyInput
                          value={generatedKey.key}
                          iconRender={(visible) => (
                            <div>
                              <CopyIcon
                                onClick={() => useCopyText(generatedKey.key)}
                              />
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
        {/* <PasswordModal
          visible={passwordModalVisible}
          onCancel={handlePassowrdCancel}
        /> */}
      </Styled.KeyManagementForm.Provider>
    </Styled.KeyManagementCard>
  );
};
