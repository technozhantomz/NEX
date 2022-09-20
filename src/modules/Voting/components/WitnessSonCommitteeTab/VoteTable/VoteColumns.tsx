import counterpart from "counterpart";
import Link from "next/link";

import { TableHeading } from "../../../../../common/components";
import { VoteRow } from "../../../types";

import * as Styled from "./VoteTable.styled";

const headings = ["rank", "name", "active", "url", "votes", "status", "action"];
const keys = ["rank", "name", "active", "url", "votes", "status", "action"];

const renders = [
  undefined,
  (name: string): JSX.Element => <Link href={`/user/${name}`}>{name}</Link>,
  (active: boolean): JSX.Element => (
    <span>{active === true ? <Styled.ActiveIcon /> : ``}</span>
  ),
  (url: string): JSX.Element => (
    <>
      {!url || url === "" ? (
        <span>{counterpart.translate(`field.labels.not_available`)}</span>
      ) : (
        <Link href={`${url}`} passHref>
          <Styled.urlIcon rotate={45} />
        </Link>
      )}
    </>
  ),
  undefined,
  undefined,
  (_value: string, _record: any): JSX.Element => (
    <>
      <Styled.VoteActionButton
        onClick={() => {
          if (_value === "add") {
            // approveVote(_record.id as string);
            console.log("do");
          } else {
            // removeVote(_record.id as string);
            console.log("do");
          }
        }}
      >
        {_value.toUpperCase()}
      </Styled.VoteActionButton>
    </>
  ),
];

const filters = [
  undefined,
  undefined,
  [
    {
      text: "Avtive",
      value: true,
    },
    {
      text: "Inactive",
      value: false,
    },
  ],
  undefined,
  undefined,
  undefined,
  undefined,
];
const filterModes = [
  undefined,
  undefined,
  "menu",
  undefined,
  undefined,
  undefined,
  undefined,
];
const filterSearch = [
  undefined,
  undefined,
  false,
  undefined,
  undefined,
  undefined,
  undefined,
];
const onFilters = [
  undefined,
  undefined,
  (value: boolean, record: VoteRow): boolean => record.active === value,
  undefined,
  undefined,
  undefined,
  undefined,
];
const sorters = [
  (a: { rank: number }, b: { rank: number }) => a.rank - b.rank,
  undefined,
  undefined,
  undefined,
  (a: { votes: string }, b: { votes: string }) =>
    parseFloat(a.votes) - parseFloat(b.votes),
  undefined,
  undefined,
];

export const showVotesColumns = headings.map((heading, index) => {
  return {
    title: (): JSX.Element => <TableHeading heading={heading} />,
    dataIndex: keys[index],
    key: keys[index],
    render: renders[index],
    filters: filters[index],
    filterMode: filterModes[index],
    filterSearch: filterSearch[index],
    onFilter: onFilters[index],
    sorter: sorters[index],
  };
});

// export const showVotesColumns = (
//   approveVote: (voteId: string) => void,
//   removeVote: (voteId: string) => void
// ): {
//   title: string;
//   dataIndex: string;
//   key: string;
//   render?: (_value: string, _record: any) => JSX.Element;
// }[] => {
//   const columns = [
//     {
//       title: "Rank",
//       dataIndex: "rank",
//       key: "rank",
//     },
//     {
//       title: counterpart.translate(`tableHead.name`),
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Active",
//       dataIndex: "active",
//       key: "active",
//     },
//     {
//       title: "URL",
//       dataIndex: "website",
//       key: "website",
//       render: (_value: string, _record: any): JSX.Element => {
//         if (_value === "") {
//           return (
//             <span>{counterpart.translate(`field.labels.not_available`)}</span>
//           );
//         } else {
//           return (
//             <a target="_blank" href={_value}>
//               {_value}
//             </a>
//           );
//         }
//       },
//     },
//     {
//       title: counterpart.translate(`tableHead.votes`),
//       dataIndex: "votes",
//       key: "votes",
//     },
//     {
//       title: "Status",
//       dataIndex: "Status",
//       key: "Status",
//     },
//     {
//       title: counterpart.translate(`tableHead.action`),
//       dataIndex: "action",
//       key: "action",
//       render: (_value: string, _record: any): JSX.Element => {
//         return (
//           <Styled.VoteActionButton
//             onClick={() => {
//               if (_value === "add") {
//                 approveVote(_record.id as string);
//               } else {
//                 removeVote(_record.id as string);
//               }
//             }}
//           >
//             {_value.toUpperCase()}
//           </Styled.VoteActionButton>
//         );
//       },
//     },
//   ];
//   return columns;
// };
