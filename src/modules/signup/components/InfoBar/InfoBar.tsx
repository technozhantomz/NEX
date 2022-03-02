import Link from "next/link";
import React from "react";

import { InfoCircleOutlined } from "../../../../ui/src";

import * as Styled from "./InfoBar.styled";

export const InfoBar: React.FC = () => {
  return (
    <Styled.InfoBar>
      <InfoCircleOutlined />
      <Styled.InfoBarText>
        <p>
          <span>Keep your password safe to avoid losing any funds.</span>
          <Link href={"/"}>Download Recovery password file here</Link>
        </p>
      </Styled.InfoBarText>
    </Styled.InfoBar>
  );
};
