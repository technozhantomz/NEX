import React from "react";

import * as Styled from "./DashboardButton.styled";

type Props = {
  label: string;
};

export const DashboardButton = ({ label }: Props): JSX.Element => {
  return (
    <Styled.Div>
      <Styled.Button type="primary">{label}</Styled.Button>
    </Styled.Div>
  );
};
