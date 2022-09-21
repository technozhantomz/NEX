import counterpart from "counterpart";
import React, { Fragment } from "react";

import { CopyButton } from "../../../../common/components";
import { Checkbox, InfoCircleOutlined } from "../../../../ui/src";

import * as Styled from "./KeyManagementTab.styled";
import { useKeyManagementTab } from "./hooks";

export const KeyManagementTab = (): JSX.Element => {
  const {
    formValidation,
    keyManagementForm,
    publicKeys,
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
            <InfoCircleOutlined />
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

        <Styled.Label strong>Account Public Keys</Styled.Label>
        {publicKeys && publicKeys.length > 0
          ? publicKeys.map((publicKey) => {
              return (
                <Styled.PublicKeyWrapper key={`${publicKey.type}`}>
                  <Styled.Label>
                    {counterpart.translate(
                      `field.labels.public_key_${publicKey.type}`
                    )}
                  </Styled.Label>
                  <Styled.PublicKey>
                    {publicKey.key}
                    <CopyButton
                      className="copy-publickey"
                      copyValue={`${publicKey.key}`}
                    ></CopyButton>
                  </Styled.PublicKey>
                </Styled.PublicKeyWrapper>
              );
            })
          : ""}
        {generatedKeys && generatedKeys.length > 0 ? (
          <>
            <Styled.Label strong>Account Private Keys</Styled.Label>
            <div>
              {generatedKeys.map((generatedKey) => {
                if (generatedKey.key && generatedKey.key !== "") {
                  return (
                    <Fragment key={`${generatedKey.label}`}>
                      <Styled.Label>
                        {counterpart.translate(`field.labels.generated_key`, {
                          generatedKeyLabel: generatedKey.label,
                        })}
                      </Styled.Label>
                      <Styled.GeneratedKeyInput keyValue={generatedKey.key} />
                    </Fragment>
                  );
                } else {
                  return (
                    <Styled.NoKey>
                      {counterpart.translate(
                        "field.errors.no_key_for_password",
                        {
                          role: generatedKey.label,
                        }
                      )}
                    </Styled.NoKey>
                  );
                }
              })}
            </div>
          </>
        ) : (
          ""
        )}
      </Styled.KeyManagementForm>
    </Styled.KeyManagementCard>
  );
};
