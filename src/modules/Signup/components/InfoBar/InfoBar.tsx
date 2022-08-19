import counterpart from "counterpart";
import React from "react";

import { InfoCircleOutlined } from "../../../../ui/src";

import * as Styled from "./InfoBar.styled";
import { useGetRecoveryPassword } from "./hooks";

type Props = {
  password: string;
};

export const InfoBar = ({ password }: Props): JSX.Element => {
  const { getRecoveryPassword } = useGetRecoveryPassword();
  return (
    <Styled.InfoBar>
      <Styled.InfoDiv>
        <InfoCircleOutlined />
      </Styled.InfoDiv>
      <Styled.InfoBarText>
        <p>
          <span>
            {counterpart.translate(`field.labels.keep_password_safe`)}
          </span>
          <a href="#" onClick={() => getRecoveryPassword(password)}>
            {counterpart.translate(`field.labels.download_recovery_password`)}
          </a>
        </p>
      </Styled.InfoBarText>
    </Styled.InfoBar>
  );
};
