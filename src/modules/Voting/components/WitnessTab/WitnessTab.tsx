import React from "react";

import { ActionForm } from "../../../../common/components/VotingPageTabsUI";

import * as Styled from "./WitnessTab.styled";

export const WitnessTab = (): JSX.Element => {
  return (
    <Styled.WitnessTabCard>
      <ActionForm />
    </Styled.WitnessTabCard>
  );
};
