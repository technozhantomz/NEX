import { CSSProperties, ReactNode } from "react";

// import { List } from "../../../../../ui/src";
import { ActivityRow } from "../../hooks/useActivityTable.types";
import { ActivityColumns as columns } from "../ActivityColumns/";
import { ActivityTag } from "../ActivityTag";
import { AvtivityInfo } from "../AvtivityInfo";

import * as Styled from "./ActivityList.styled";

type Props = {
  activitiesRows: ActivityRow[];
  loading: boolean;
};

export const ActivityList = ({
  activitiesRows,
  loading,
}: Props): JSX.Element => {
  return (
    <Styled.StyledList
      itemLayout="vertical"
      dataSource={activitiesRows}
      loading={loading}
      pagination={{
        position: "bottom",
        size: "small",
        pageSize: 2,
        showLessItems: true,
        itemRender: (
          _page: number,
          type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
          element: ReactNode
        ) => {
          if (type === "prev") {
            return (
              <>
                {" "}
                {_page > 0 ? (
                  <a style={{ marginRight: "8px" } as CSSProperties}>
                    Previous
                  </a>
                ) : (
                  ""
                )}
              </>
            );
          }
          if (type === "next") {
            return <a style={{ marginLeft: "8px" } as CSSProperties}>Next</a>;
          }
          return element;
        },
      }}
      renderItem={(item) => (
        <Styled.ActivityListItem key={item.key}>
          <Styled.ActivitysItemContent>
            <div className="activity-info">
              <span className="activity-info-title">{columns[0].title()}</span>
              <span className="activity-info-value">{item.time}</span>
            </div>
            <div className="activity-info">
              <span className="activity-info-title">{columns[2].title()}</span>
              <span className="activity-info-value">
                <AvtivityInfo infoString={item.info} />
              </span>
            </div>
            <div className="activity-info">
              <span className="activity-info-title">{columns[3].title()}</span>
              <span className="activity-info-value">{item.id}</span>
            </div>
            <div className="activity-info">
              <span className="activity-info-title">{columns[4].title()}</span>
              <span className="activity-info-value">{item.fee}</span>
            </div>
            <div className="activity-info">
              <span className="activity-info-title">{columns[1].title()}</span>
              <span className="activity-info-value">
                <ActivityTag type={item.type} />
              </span>
            </div>
          </Styled.ActivitysItemContent>
        </Styled.ActivityListItem>
      )}
    />
  );
};
