import React from "react";

import * as Styled from "./FormDisclamer.styled";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

export const FormDisclamer = ({ children }: Props): JSX.Element => {
  return <Styled.Disclamer>{children}</Styled.Disclamer>;
};
