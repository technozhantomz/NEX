import { Divider } from "antd";
import React from "react";

import {
  ActionForm,
  DataTable,
} from "../../../../common/components/VotingPageTabsUI";

import * as Styled from "./WitnessTab.styled";
import { WitnessesColumns } from "./WitnessesColumns";
import { useWitnessTab } from "./hooks";

export const WitnessTab = (): JSX.Element => {
  const { loading, witnesses, searchValue, onSearch, addToVote, removeFromVote } = useWitnessTab();
 
  return (
    <Styled.WitnessTabCard>
      <ActionForm />
      <DataTable
        approved={true}
        columns={WitnessesColumns}
        data={witnesses.data.filter(item => item?.active)}
      />
      <Divider />
      <DataTable
        approved={false}
        columns={WitnessesColumns}
        data={witnesses.data.filter(item => !item?.active)}
      />
    </Styled.WitnessTabCard>
  );
};
