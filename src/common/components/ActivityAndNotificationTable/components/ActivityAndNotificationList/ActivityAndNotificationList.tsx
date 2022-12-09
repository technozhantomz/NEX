import counterpart from "counterpart";

import {
  ActivityAndNotificationColumns,
  renderPaginationItem,
  UserLinkExtractor,
} from "../../..";
import { useUserSettingsContext } from "../../../../providers";
import { ActivityRow } from "../../../../types";
import { ActivityAndNotificationTag } from "../ActivityAndNotificationTag";

import * as Styled from "./ActivityAndNotificationList.styled";

type Props = {
  activitiesAndNotificationsRows: ActivityRow[];
  loading: boolean;
  isNotificationTab: boolean;
};

export const ActivityAndNotificationList = ({
  activitiesAndNotificationsRows,
  loading,
  isNotificationTab,
}: Props): JSX.Element => {
  const { markTheNotificationAsReadOrUnread } = useUserSettingsContext();
  const columns = ActivityAndNotificationColumns(
    isNotificationTab,
    markTheNotificationAsReadOrUnread
  );

  return (
    <Styled.StyledList
      itemLayout="vertical"
      dataSource={activitiesAndNotificationsRows}
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
        const activityAndNotificationRow = item as ActivityRow;
        return (
          <Styled.ActivityListItem key={activityAndNotificationRow.key}>
            <Styled.ActivitysItemContent>
              <div className="activity-info">
                <span className="activity-info-title">
                  {columns[0].title()}
                </span>
                <span className="activity-info-value">
                  {activityAndNotificationRow.time}
                </span>
              </div>
              <div className="activity-info">
                <span className="activity-info-title">
                  {columns[2].title()}
                </span>
                <span className="activity-info-value">
                  <UserLinkExtractor
                    infoString={activityAndNotificationRow.info}
                  />
                </span>
              </div>
              <div className="activity-info">
                <span className="activity-info-title">
                  {columns[3].title()}
                </span>
                <span className="activity-info-value">
                  {activityAndNotificationRow.id}
                </span>
              </div>
              <div className="activity-info">
                <span className="activity-info-title">
                  {columns[4].title()}
                </span>
                <span className="activity-info-value">
                  {activityAndNotificationRow.fee}
                </span>
              </div>
              <div className="activity-info">
                <span className="activity-info-title">
                  {columns[1].title()}
                </span>
                <span className="activity-info-value">
                  <ActivityAndNotificationTag
                    type={activityAndNotificationRow.type}
                  />
                </span>
              </div>
              {isNotificationTab ? (
                <div className="activity-info">
                  <span className="activity-info-title">
                    {columns[5].title()}
                  </span>
                  <span className="activity-info-value">
                    {activityAndNotificationRow.status ? (
                      <Styled.NotificationTableStatusButton
                        onClick={() =>
                          markTheNotificationAsReadOrUnread(
                            activityAndNotificationRow.id,
                            !activityAndNotificationRow.status
                          )
                        }
                      >
                        {counterpart.translate(
                          `pages.profile.notification.unread`
                        )}
                      </Styled.NotificationTableStatusButton>
                    ) : (
                      counterpart.translate(`pages.profile.notification.read`)
                    )}
                  </span>
                </div>
              ) : (
                ""
              )}
            </Styled.ActivitysItemContent>
          </Styled.ActivityListItem>
        );
      }}
    />
  );
};
