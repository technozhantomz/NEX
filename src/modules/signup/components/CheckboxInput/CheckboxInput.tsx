import React from "react";

import * as Styled from "./CheckboxInput.styled";

type Props = {
  children: React.ReactNode;
};

const CheckboxInput = ({ children }: Props): JSX.Element => {
  return <Styled.Checkbox>{children}</Styled.Checkbox>;
};

export default CheckboxInput;
