import React from "react";

import { InfoCircleOutlined } from "../../../../ui/src";
import { useSignUpForm } from "../SignUpForm/hooks";

import * as Styled from "./InfoBar.styled";
import { getRecoveryPassword } from "./hooks/getRecoveryPassword";

export const InfoBar: React.FC = () => {
  const { signUpForm } = useSignUpForm();
  return (
    <Styled.InfoBar>
      <InfoCircleOutlined />
      <Styled.InfoBarText>
        <p>
          <span>Keep your password safe to avoid losing any funds. </span>
          <a
            href="#"
            onClick={() =>
              getRecoveryPassword(signUpForm.getFieldValue("password"))
            }
          >
            Download Recovery password file here
          </a>
        </p>
      </Styled.InfoBarText>
    </Styled.InfoBar>
  );
};
