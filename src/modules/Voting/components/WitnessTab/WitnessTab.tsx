import { Divider } from "antd";
import React from "react";

import {
  ActionForm,
  DataTable,
} from "../../../../common/components/VotingPageTabsUI";
import { useWitnessTab } from "./hooks";

import * as Styled from "./WitnessTab.styled";

export const WitnessTab = (): JSX.Element => {
  const { loading, blockchainData, searchValue, searchResult, onSearch } =
    useWitnessTab();
  console.log(blockchainData);
  return (
    <Styled.WitnessTabCard>
      <ActionForm />
      <DataTable approved={true} />
      <Divider />
      <DataTable approved={false} />
    </Styled.WitnessTabCard>
  );
};
