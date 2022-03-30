import { Divider } from "antd";
import React from "react";

import {
  ActionForm,
  DataTable,
} from "../../../../common/components/VotingPageTabsUI";

import * as Styled from "./WitnessTab.styled";

export const WitnessTab = (): JSX.Element => {
  return (
    <Styled.WitnessTabCard>
      <ActionForm />
      <DataTable approved={true} />
      <Divider />
      <DataTable approved={false} />
    </Styled.WitnessTabCard>
  );
};
