import React from "react";

import * as Styled from "./FormDisclamer.styled";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
};

export const FormDisclamer = ({ children, className }: Props): JSX.Element => {
  return <Styled.Disclamer className={className}>{children}</Styled.Disclamer>;
};
