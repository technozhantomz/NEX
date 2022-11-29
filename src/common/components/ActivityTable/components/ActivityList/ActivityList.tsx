import { renderPaginationItem, UserLinkExtractor } from "../../..";
import { ActivityRow } from "../../../../types";
import { ActivityColumns as columns } from "../ActivityColumns/";
import { ActivityTag } from "../ActivityTag";

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
        hideOnSinglePage: true,
        defaultPageSize: 2,
        defaultCurrent: 1,
        showLessItems: true,
        showSizeChanger: false,
        size: "small",
        itemRender: renderPaginationItem(),
      }}
      renderItem={(item) => {
        const activityRow = item as ActivityRow;
        return (
          <Styled.ActivityListItem key={activityRow.key}>
            <Styled.ActivitysItemContent>
              <div className="activity-info">
                <span className="activity-info-title">
                  {columns[0].title()}
                </span>
                <span className="activity-info-value">{activityRow.time}</span>
              </div>
              <div className="activity-info">
                <span className="activity-info-title">
                  {columns[2].title()}
                </span>
                <span className="activity-info-value">
                  <UserLinkExtractor infoString={activityRow.info} />
                </span>
              </div>
              <div className="activity-info">
                <span className="activity-info-title">
                  {columns[3].title()}
                </span>
                <span className="activity-info-value">{activityRow.id}</span>
              </div>
              <div className="activity-info">
                <span className="activity-info-title">
                  {columns[4].title()}
                </span>
                <span className="activity-info-value">{activityRow.fee}</span>
              </div>
              <div className="activity-info">
                <span className="activity-info-title">
                  {columns[1].title()}
                </span>
                <span className="activity-info-value">
                  <ActivityTag type={activityRow.type} />
                </span>
              </div>
            </Styled.ActivitysItemContent>
          </Styled.ActivityListItem>
        );
      }}
    />
  );
};
