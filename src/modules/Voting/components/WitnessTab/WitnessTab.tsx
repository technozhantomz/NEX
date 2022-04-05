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
  const {
    loading,
    witnesses,
    searchValue,
    onSearch,
    addToVote,
    removeFromVote,
    approvedList,
    unPublishedList,
    undoUnPublished,
    notApprovedList,
  } = useWitnessTab();

  const WitnessesColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <p>{name}</p>,
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      render: (url: string): JSX.Element => <p>{url}</p>,
    },
    {
      title: "Votes",
      dataIndex: "totalVotes",
      key: "totalVotes",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, row: any): JSX.Element => (
        <a
          onClick={() =>
            row.unpublished
              ? undoUnPublished(row)
              : row.active
              ? removeFromVote(row)
              : addToVote(row)
          }
        >
          {row.unpublished ? "Undo" : row.active ? "REMOVE" : "ADD"}
        </a>
      ),
    },
  ];

  return (
    <Styled.WitnessTabCard>
      <ActionForm />
      {unPublishedList.length ? (
        <DataTable
          approved={true}
          columns={WitnessesColumns}
          data={unPublishedList}
        />
      ) : (
        ""
      )}

      <DataTable
        approved={true}
        columns={WitnessesColumns}
        data={approvedList}
      />
      <Divider />
      <DataTable
        approved={false}
        columns={WitnessesColumns}
        data={notApprovedList}
      />
    </Styled.WitnessTabCard>
  );
};
