import counterpart from "counterpart";
import Link from "next/link";

import { TableHeading } from "../../../../../../common/components";
import { VoteRow } from "../../../../types";
import * as Styled from "../VoteTable.styled";

export const showVotesColumns = (
  localApprovedVotesIds: string[],
  addVote: (voteId: string) => void,
  removeVote: (voteId: string) => void,
  isWitnessTab?: boolean
): {
  title: () => JSX.Element;
  dataIndex: string;
  key: string;
  render:
    | ((active: boolean) => JSX.Element)
    | ((_value: string, _record: any) => JSX.Element)
    | undefined;
  filters:
    | { text: string; value: boolean }[]
    | { text: string; value: string }[]
    | undefined;
  filterMode: string | undefined;
  filterSearch: boolean | undefined;
  onFilter:
    | ((value: boolean, record: VoteRow) => boolean)
    | ((value: string, record: VoteRow) => boolean)
    | undefined;
  sorter:
    | ((a: { rank: number }, b: { rank: number }) => number)
    | ((a: { votes: string }, b: { votes: string }) => number)
    | ((a: { missedBlocks: number }, b: { missedBlocks: number }) => number)
    | undefined;
}[] => {
  const headings = !isWitnessTab
    ? ["rank", "name", "active", "url", "votes", "status", "action"]
    : [
        "rank",
        "name",
        "active",
        "url",
        "votes",
        "missed_blocks",
        "status",
        "action",
      ];
  const keys = !isWitnessTab
    ? ["rank", "name", "active", "url", "votes", "status", "possibleAction"]
    : [
        "rank",
        "name",
        "active",
        "url",
        "votes",
        "missedBlocks",
        "status",
        "possibleAction",
      ];

  const renders = !isWitnessTab
    ? [
        //rank
        undefined,
        (name: string): JSX.Element => (
          <Link href={`/user/${name}`}>{name}</Link>
        ),
        (active: boolean): JSX.Element => (
          <span>{active === true ? <Styled.ActiveIcon /> : ``}</span>
        ),
        (url: string): JSX.Element => (
          <>
            {!url || url === "" ? (
              <span>{counterpart.translate(`field.labels.not_available`)}</span>
            ) : (
              <a href={`${url}`} target="_blank">
                <Styled.urlIcon rotate={45} />
              </a>
            )}
          </>
        ),
        //votes
        undefined,
        //status
        (_value: string, _record: any): JSX.Element => (
          <>
            {_value === "unapproved" ? (
              <>
                <Styled.Xmark></Styled.Xmark>
                <Styled.NotApprovedStatus>
                  {counterpart.translate(`pages.voting.status.not_approved`)}
                </Styled.NotApprovedStatus>
              </>
            ) : (
              <>
                <Styled.Check></Styled.Check>
                <Styled.ApprovedStatus>
                  {counterpart.translate(`pages.voting.status.approved`)}
                </Styled.ApprovedStatus>
              </>
            )}
          </>
        ),
        //possibleAction
        (_value: string, record: any): JSX.Element => (
          <>
            {!localApprovedVotesIds.includes(record.id) ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  addVote(record.id as string);
                }}
              >
                <Styled.LikeOutlinedIcon />
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => {
                  removeVote(record.id as string);
                }}
              >
                <Styled.LikeFilledIcon />
              </div>
            )}
          </>
        ),
      ]
    : [
        //rank
        undefined,
        (name: string): JSX.Element => (
          <Link href={`/user/${name}`}>{name}</Link>
        ),
        (active: boolean): JSX.Element => (
          <span>{active === true ? <Styled.ActiveIcon /> : ``}</span>
        ),
        (url: string): JSX.Element => (
          <>
            {!url || url === "" ? (
              <span>{counterpart.translate(`field.labels.not_available`)}</span>
            ) : (
              <a href={`${url}`} target="_blank">
                <Styled.urlIcon rotate={45} />
              </a>
            )}
          </>
        ),
        //votes
        undefined,
        (missedBlocks: string): JSX.Element => (
          <Styled.MissedBlocks>{missedBlocks}</Styled.MissedBlocks>
        ),
        //status
        (_value: string, _record: any): JSX.Element => (
          <>
            {_value === "unapproved" ? (
              <>
                <Styled.Xmark></Styled.Xmark>
                <Styled.NotApprovedStatus>
                  {counterpart.translate(`pages.voting.status.not_approved`)}
                </Styled.NotApprovedStatus>
              </>
            ) : (
              <>
                <Styled.Check></Styled.Check>
                <Styled.ApprovedStatus>
                  {counterpart.translate(`pages.voting.status.approved`)}
                </Styled.ApprovedStatus>
              </>
            )}
          </>
        ),
        //possibleAction
        (_value: string, record: any): JSX.Element => (
          <>
            {!localApprovedVotesIds.includes(record.id) ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  addVote(record.id as string);
                }}
              >
                <Styled.LikeOutlinedIcon />
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => {
                  removeVote(record.id as string);
                }}
              >
                <Styled.LikeFilledIcon />
              </div>
            )}
          </>
        ),
      ];

  const filters = !isWitnessTab
    ? [
        //rank
        undefined,
        //name
        undefined,
        //active
        [
          {
            text: counterpart.translate(`tableFilters.active`),
            value: true,
          },
          {
            text: counterpart.translate(`tableFilters.inactive`),
            value: false,
          },
        ],
        //url
        undefined,
        //votes
        undefined,
        //status
        [
          {
            text: counterpart.translate(`tableFilters.approved`),
            value: "approved",
          },
          {
            text: counterpart.translate(`tableFilters.not_approved`),
            value: "unapproved",
          },
        ],
        //possibleAction
        undefined,
      ]
    : [
        undefined,
        undefined,
        [
          {
            text: counterpart.translate(`tableFilters.active`),
            value: true,
          },
          {
            text: counterpart.translate(`tableFilters.inactive`),
            value: false,
          },
        ],
        undefined,
        undefined,
        undefined,
        [
          {
            text: counterpart.translate(`tableFilters.approved`),
            value: "approved",
          },
          {
            text: counterpart.translate(`tableFilters.not_approved`),
            value: "unapproved",
          },
        ],
        undefined,
      ];
  const filterModes = !isWitnessTab
    ? [undefined, undefined, "menu", undefined, undefined, "menu", "menu"]
    : [
        undefined,
        undefined,
        "menu",
        undefined,
        undefined,
        undefined,
        "menu",
        "menu",
      ];
  const filterSearch = !isWitnessTab
    ? [undefined, undefined, false, undefined, undefined, false, false]
    : [
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        undefined,
        false,
        false,
      ];
  const onFilters = !isWitnessTab
    ? [
        undefined,
        undefined,
        (value: boolean, record: VoteRow): boolean => record.active === value,
        undefined,
        undefined,
        (value: string, record: VoteRow): boolean => record.status === value,
        (value: string, record: VoteRow): boolean =>
          record.possibleAction === value,
      ]
    : [
        undefined,
        undefined,
        (value: boolean, record: VoteRow): boolean => record.active === value,
        undefined,
        undefined,
        undefined,
        (value: string, record: VoteRow): boolean => record.status === value,
        (value: string, record: VoteRow): boolean =>
          record.possibleAction === value,
      ];
  const sorters = !isWitnessTab
    ? [
        (a: { rank: number }, b: { rank: number }) => a.rank - b.rank,
        undefined,
        undefined,
        undefined,
        (a: { votes: string }, b: { votes: string }) =>
          parseFloat(a.votes) - parseFloat(b.votes),
        undefined,
        undefined,
      ]
    : [
        (a: { rank: number }, b: { rank: number }) => a.rank - b.rank,
        undefined,
        undefined,
        undefined,
        (a: { votes: string }, b: { votes: string }) =>
          parseFloat(a.votes) - parseFloat(b.votes),
        (a: { missedBlocks: number }, b: { missedBlocks: number }) =>
          a.missedBlocks - b.missedBlocks,
        undefined,
        undefined,
      ];

  return headings.map((heading, index) => {
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
};
