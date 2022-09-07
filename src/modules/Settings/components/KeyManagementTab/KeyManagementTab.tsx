import counterpart from "counterpart";
import React, { Fragment } from "react";

import { KeyInput } from "../../../../common/components";
import { Checkbox } from "../../../../ui/src";

import * as Styled from "./KeyManagementTab.styled";
import { useKeyManagementTab } from "./hooks";

export const KeyManagementTab = (): JSX.Element => {
  const {
    formValidation,
    keyManagementForm,
    generatedKeys,
    handleCheckboxChange,
    selectedKeys,
    onGo,
  } = useKeyManagementTab();

  return (
    <Styled.KeyManagementCard>
      <Styled.KeyManagementForm
        form={keyManagementForm}
        name="KeyManagementForm"
        validateTrigger={["onChange", "onSubmit"]}
        onFinish={() => {
          onGo();
        }}
      >
        <Styled.PasswordFormItem
          name="password"
          rules={formValidation.password}
          validateFirst={true}
          validateTrigger="onBlur"
        >
          <Styled.PasswordInput
            placeholder={counterpart.translate(
              `field.placeholder.master_password`
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
            options={counterpart.translate(
              `field.checkBoxes.key_management_group`
            )}
            onChange={handleCheckboxChange}
            value={selectedKeys}
          ></Checkbox.Group>
        </Styled.CheckBoxGroup>

        <Styled.ButtonFormItem>
          <Styled.SubmitButton type="primary" htmlType="submit">
            {counterpart.translate(`buttons.lets_go`)}
          </Styled.SubmitButton>
        </Styled.ButtonFormItem>

        {generatedKeys && generatedKeys.length > 0
          ? generatedKeys.map((generatedKey) => {
              if (generatedKey.key && generatedKey.key !== "") {
                return (
                  <Fragment key={`${generatedKey.label}`}>
                    <Styled.Label>
                      {counterpart.translate(`field.labels.generated_key`, {
                        generatedKeyLabel: generatedKey.label,
                      })}
                    </Styled.Label>
                    <div>
                      <KeyInput keyValue={generatedKey.key} />
                    </div>
                  </Fragment>
                );
              } else {
                return (
                  <Styled.NoKey>
                    {counterpart.translate("field.errors.no_key_for_password", {
                      role: generatedKey.label,
                    })}
                  </Styled.NoKey>
                );
              }
            })
          : ""}
      </Styled.KeyManagementForm>
    </Styled.KeyManagementCard>
  );
};
