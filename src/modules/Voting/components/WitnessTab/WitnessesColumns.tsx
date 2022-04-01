import Link from "next/link";

import * as Styled from "./WitnessTab.styled";

export const WitnessesColumns = [
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
    dataIndex: "key",
    key: "key",
    render: (id: string): JSX.Element => <a onClick={() =>console.log(id)} >ADD</a>,
  },
];
