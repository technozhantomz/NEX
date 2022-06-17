import { AvtivityInfo } from "../../../..";
import { List, MenuCard, Switch } from "../../../../../../ui/src";
import { useMenuContext } from "../../../../../providers";
import { Notification } from "../../../../../types";

import * as Styled from "./NotificationMenu.styled";
import { useNotificationMenu } from "./hooks";

export const NotificationMenu = (): JSX.Element => {
  const { showUnreadOnly, setShowUnreadOnly } = useNotificationMenu();
  const {
    notifications,
    markAllNotificationsRead,
    hasUnreadMessages,
    loadingNotifications,
  } = useMenuContext();

  return (
    <MenuCard
      onClick={(e) => {
        e.stopPropagation();
      }}
      bordered={false}
    >
      <Styled.ControlsContainer hasUnread={hasUnreadMessages}>
        {hasUnreadMessages ? (
          <span
            className={"mark-all"}
            onClick={() => {
              markAllNotificationsRead();
            }}
          >
            Mark all as read
          </span>
        ) : (
          ""
        )}

        <div className={"unread-switch"}>
          <Switch
            size="small"
            onChange={() => setShowUnreadOnly(!showUnreadOnly)}
            defaultChecked={showUnreadOnly}
          />
          <span>Show only unread</span>
        </div>
      </Styled.ControlsContainer>
      {notifications && (
        <List
          loading={loadingNotifications}
          itemLayout="vertical"
          dataSource={
            showUnreadOnly
              ? notifications.filter((notification) => notification.unread)
              : notifications
          }
          renderItem={(item: Notification) => (
            <Styled.ActivityListItem key={item.activity.key}>
              <Styled.ActivitysItemContent>
                <div className="activity-info">
                  {/* <span className="activity-info-title">{columns[2].title}</span> */}
                  <span className="activity-info-value">
                    <AvtivityInfo infoString={item.activity.info} />
                  </span>
                </div>
              </Styled.ActivitysItemContent>
            </Styled.ActivityListItem>
          )}
        />
      )}
    </MenuCard>
  );
};
