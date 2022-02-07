import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import React from "react";

import { CopyIcon } from "../../../../ui/src/icons";
import { useSignUpForm } from "../SignUpForm/hooks";

import * as Styled from "./GeneratedPassordInput.styled";
import { useCopyPassword } from "./hooks";

const GeneratedPassordInput: React.FC = () => {
  const { signUpForm } = useSignUpForm();
  return (
    <Styled.GeneratedPassordInput.Password
      iconRender={(visible) =>
        visible ? (
          <div>
            <CopyIcon onClick={() => useCopyPassword(signUpForm)} />
            <EyeOutlined />
          </div>
        ) : (
          <div>
            <CopyIcon onClick={() => useCopyPassword(signUpForm)} />
            <EyeInvisibleOutlined />
          </div>
        )
      }
    />
  );
};

export default GeneratedPassordInput;
