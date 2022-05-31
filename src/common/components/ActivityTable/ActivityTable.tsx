import { CSSProperties, ReactNode } from "react";

import { useViewportContext } from "../../providers";

import * as Styled from "./ActivityTable.styled";
import { ActivityList, ActivityColumns as columns } from "./components";
import { useActivityTable } from "./hooks";

type Props = {
  userName?: string;
  isWalletActivityTable?: boolean;
};

export const ActivityTable = ({
  userName,
  isWalletActivityTable = false,
}: Props): JSX.Element => {
  const { activitiesRows, loading } = useActivityTable({
    userName,
    isWalletActivityTable,
  });
  const { sm } = useViewportContext();

  return (
    <>
      {sm ? (
        <ActivityList activitiesRows={activitiesRows} loading={loading} />
      ) : (
        <Styled.ActivityTable
          columns={columns}
          dataSource={activitiesRows}
          loading={loading}
          pagination={{
            size: "small",
            pageSize: 10,
            showLessItems: true,
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
          className="activity-table"
        />
      )}
    </>
  );
};
