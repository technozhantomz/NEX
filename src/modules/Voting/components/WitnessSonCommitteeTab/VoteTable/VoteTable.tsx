import { CSSProperties, ReactNode } from "react";

import {
  useUserContext,
  useViewportContext,
} from "../../../../../common/providers";
// import { List } from "../../../../../ui/src";
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
          // <List
          //   itemLayout="vertical"
          //   dataSource={votes}
          //   loading={loading}
          //   pagination={{ position: "bottom", size: "small", pageSize: 20 }}
          //   renderItem={(item) => (
          //     <Styled.VoteListItem
          //       key={item.key}
          //       actions={
          //         tableType == "approved"
          //           ? [
          //               <Styled.VoteActionButton
          //                 onClick={() => doAction("REMOVE", item)}
          //               >
          //                 {"REMOVE VOTE"}
          //               </Styled.VoteActionButton>,
          //             ]
          //           : tableType == "notapproved"
          //           ? [
          //               <Styled.VoteActionButton
          //                 onClick={() => doAction("ADD", item)}
          //               >
          //                 {"ADD VOTE"}
          //               </Styled.VoteActionButton>,
          //             ]
          //           : [
          //               <Styled.VoteActionButton
          //                 onClick={() => doAction("UNDO", item)}
          //               >
          //                 {"UNDO"}
          //               </Styled.VoteActionButton>,
          //             ]
          //       }
          //     >
          //       <Styled.VoteItemContent>
          //         <div className="asset-info">
          //           <span className="asset-info-title">{columns[0].title}</span>
          //           <span className="asset-info-value">{item.name}</span>
          //         </div>
          //         <div className="asset-info">
          //           <span className="asset-info-title">{columns[1].title}</span>
          //           <span className="asset-info-value">{item.webpage}</span>
          //         </div>
          //         <div className="asset-info">
          //           <span className="asset-info-title">{columns[2].title}</span>
          //           <span className="asset-info-value">{item.votes}</span>
          //         </div>
          //         {tableType === "changes" ? (
          //           <div className="asset-info">
          //             <span className="asset-info-title">
          //               {columnsWithPending[4].title}
          //             </span>
          //             <span className="asset-info-value">{item.action}</span>
          //           </div>
          //         ) : (
          //           ""
          //         )}
          //       </Styled.VoteItemContent>
          //     </Styled.VoteListItem>
          //   )}
          // />
        )}
      </Styled.Container>
    </>
  );
};
