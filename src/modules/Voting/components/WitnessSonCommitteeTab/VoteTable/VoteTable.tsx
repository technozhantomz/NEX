import { CSSProperties, ReactNode } from "react";

import {
  useUserContext,
  useViewportContext,
} from "../../../../../common/providers";
import { breakpoints } from "../../../../../ui/src/breakpoints";
import { VoteRow } from "../../../types";

import { showVotesColumns } from "./VoteColumns";
import * as Styled from "./VoteTable.styled";

type Props = {
  votes: VoteRow[];
  type: "approved" | "notApproved";
  loading: boolean;
  approveVote: (voteId: string) => void;
  removeVote: (voteId: string) => void;
};

export const VoteTable = ({
  votes,
  type,
  loading,
  approveVote,
  removeVote,
}: Props): JSX.Element => {
  const { width } = useViewportContext();
  const { localStorageAccount } = useUserContext();
  const columns = showVotesColumns(approveVote, removeVote);
  return (
    <>
      <Styled.Title>
        {type === "approved"
          ? `Approved by ${localStorageAccount} `
          : `Not approved by ${localStorageAccount}`}
        {type === "approved" ? <Styled.Check /> : <Styled.Xmark />}
      </Styled.Title>
      <Styled.Container>
        {width > breakpoints.xs ? (
          <Styled.VoteTable
            columns={columns}
            dataSource={votes}
            loading={loading}
            pagination={{
              position: ["bottomRight"],
              size: "small",
              pageSize: 5,
              itemRender: (
                _page: number,
                type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
                element: ReactNode
              ) => {
                if (type === "prev") {
                  return (
                    <a style={{ marginRight: "8px" } as CSSProperties}>
                      Previous
                    </a>
                  );
                }
                if (type === "next") {
                  return (
                    <a style={{ marginLeft: "8px" } as CSSProperties}>Next</a>
                  );
                }
                return element;
              },
            }}
            size="small"
          />
        ) : (
          ""
        )}
      </Styled.Container>
    </>
  );
};
