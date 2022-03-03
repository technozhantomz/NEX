import React from "react";

import * as Styled from "./DashboardButton.styled";

type Props = {
  label: string;
  onClick: () => void;
};

export const DashboardButton = ({ label, onClick }: Props): JSX.Element => {
  return (
    <Styled.Div>
      <Styled.Button type="primary" onClick={onClick}>
        {label}
      </Styled.Button>
    </Styled.Div>
  );
};
