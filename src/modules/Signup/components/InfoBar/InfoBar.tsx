import React from "react";

import { InfoCircleOutlined } from "../../../../ui/src";

import * as Styled from "./InfoBar.styled";
import { useGetRecoveryPassword } from "./hooks";

type Props = {
  password: string;
};

export const InfoBar = ({ password }: Props): JSX.Element => {
  return (
    <Styled.InfoBar>
      <Styled.InfoDiv>
        <InfoCircleOutlined />
      </Styled.InfoDiv>
      <Styled.InfoBarText>
        <p>
          <span>Keep your password safe to avoid losing any funds. </span>
          <a href="#" onClick={() => useGetRecoveryPassword(password)}>
            Download Recovery password file here
          </a>
        </p>
      </Styled.InfoBarText>
    </Styled.InfoBar>
  );
};
