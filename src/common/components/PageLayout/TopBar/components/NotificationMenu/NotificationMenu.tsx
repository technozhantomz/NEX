import counterpart from "counterpart";
import Link from "next/link";
import { CSSProperties, ReactNode } from "react";

import { AvtivityInfo } from "../../../..";
import {
  Checkbox,
  List,
  MenuCard,
  Switch,
  Tooltip,
} from "../../../../../../ui/src";
import { useFormDate } from "../../../../../hooks";
import { useMenuContext, useUserContext } from "../../../../../providers";
import { Notification } from "../../../../../types";

import * as Styled from "./NotificationMenu.styled";
import { useNotificationMenu } from "./hooks";

export const NotificationMenu = (): JSX.Element => {
  const {
    notifications,
    markAllNotificationsRead,
    hasUnreadMessages,
    loadingNotifications,
    markTheNotificationAsReadOrUnread,
    closeMenu,
  } = useMenuContext();
  const {
    showUnreadOnly,
    setShowUnreadOnly,
    todayNotifications,
    yesterdayNotifications,
    thirdClusterNotifications,
  } = useNotificationMenu({
    notifications,
    loadingNotifications,
  });
  const { localStorageAccount } = useUserContext();
  const { formDate } = useFormDate();

  return (
    <MenuCard bordered={false}>
      <Styled.ControlsContainer
        hasUnread={hasUnreadMessages}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {hasUnreadMessages ? (
          <span
            className={"mark-all"}
            onClick={() => {
              markAllNotificationsRead();
            }}
          >
            {counterpart.translate(`links.mark_all_read`)}
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
          <span>{counterpart.translate(`buttons.show_only_unread`)}</span>
        </div>
      </Styled.ControlsContainer>
      <Styled.ListsContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {notifications && (
          <>
            <Styled.TimeSpecification>
              {counterpart.translate(`field.labels.today`)}
            </Styled.TimeSpecification>
            <List
              loading={loadingNotifications}
              pagination={
                !loadingNotifications
                  ? {
                      position: "bottom",
                      showSizeChanger: false,
                      size: "small",
                      pageSize: 2,
                      hideOnSinglePage: true,
                      showLessItems: true,
                      itemRender: (
                        _page: number,
                        type:
                          | "page"
                          | "prev"
                          | "next"
                          | "jump-prev"
                          | "jump-next",
                        element: ReactNode
                      ) => {
                        if (type === "prev") {
                          return (
                            <>
                              {" "}
                              {_page > 0 ? (
                                <a
                                  style={
                                    { marginRight: "8px" } as CSSProperties
                                  }
                                >
                                  {counterpart.translate(`buttons.previous`)}
                                </a>
                              ) : (
                                ""
                              )}
                            </>
                          );
                        }
                        if (type === "next") {
                          return (
                            <a style={{ marginLeft: "8px" } as CSSProperties}>
                              {counterpart.translate(`buttons.next`)}
                            </a>
                          );
                        }
                        return element;
                      },
                    }
                  : false
              }
              itemLayout="vertical"
              dataSource={
                showUnreadOnly
                  ? todayNotifications.filter(
                      (notification) => notification.unread
                    )
                  : todayNotifications
              }
              renderItem={(item: Notification) => (
                <Styled.ActivityListItem key={item.activity.key}>
                  <Styled.ActivitysItemContent>
                    <div className="activity-info">
                      <Tooltip
                        placement="top"
                        title={`${
                          item.unread
                            ? counterpart.translate(`tooltips.mark_read`)
                            : counterpart.translate(`tooltips.mark_unread`)
                        }`}
                      >
                        <Checkbox
                          checked={!item.unread}
                          onChange={(e) => {
                            markTheNotificationAsReadOrUnread(
                              item.activity.id,
                              !e.target.checked
                            );
                          }}
                        ></Checkbox>
                        <span className="activity-info-value">
                          <AvtivityInfo infoString={item.activity.info} />
                        </span>
                      </Tooltip>
                    </div>
                  </Styled.ActivitysItemContent>
                </Styled.ActivityListItem>
              )}
            />

            <Styled.TimeSpecification>
              {counterpart.translate(`field.labels.yesterday`)}
            </Styled.TimeSpecification>
            <List
              loading={loadingNotifications}
              pagination={
                !loadingNotifications
                  ? {
                      position: "bottom",
                      showSizeChanger: false,
                      size: "small",
                      pageSize: 2,
                      hideOnSinglePage: true,
                      showLessItems: true,
                      itemRender: (
                        _page: number,
                        type:
                          | "page"
                          | "prev"
                          | "next"
                          | "jump-prev"
                          | "jump-next",
                        element: ReactNode
                      ) => {
                        if (type === "prev") {
                          return (
                            <>
                              {" "}
                              {_page > 0 ? (
                                <a
                                  style={
                                    { marginRight: "8px" } as CSSProperties
                                  }
                                >
                                  {counterpart.translate(`buttons.previous`)}
                                </a>
                              ) : (
                                ""
                              )}
                            </>
                          );
                        }
                        if (type === "next") {
                          return (
                            <a style={{ marginLeft: "8px" } as CSSProperties}>
                              {counterpart.translate(`buttons.next`)}
                            </a>
                          );
                        }
                        return element;
                      },
                    }
                  : false
              }
              itemLayout="vertical"
              dataSource={
                showUnreadOnly
                  ? yesterdayNotifications.filter(
                      (notification) => notification.unread
                    )
                  : yesterdayNotifications
              }
              renderItem={(item: Notification) => (
                <Styled.ActivityListItem key={item.activity.key}>
                  <Styled.ActivitysItemContent>
                    <div className="activity-info">
                      <Tooltip
                        placement="top"
                        title={`${
                          item.unread
                            ? counterpart.translate(`tooltips.mark_read`)
                            : counterpart.translate(`tooltips.mark_unread`)
                        }`}
                      >
                        <Checkbox
                          checked={!item.unread}
                          onChange={(e) => {
                            markTheNotificationAsReadOrUnread(
                              item.activity.id,
                              !e.target.checked
                            );
                          }}
                        ></Checkbox>
                        <span className="activity-info-value">
                          <AvtivityInfo infoString={item.activity.info} />
                        </span>
                      </Tooltip>
                    </div>
                  </Styled.ActivitysItemContent>
                </Styled.ActivityListItem>
              )}
            />

            {thirdClusterNotifications &&
            thirdClusterNotifications.length > 0 ? (
              <>
                <Styled.TimeSpecification>
                  {formDate(thirdClusterNotifications[0].activity.time)}
                </Styled.TimeSpecification>
                <List
                  loading={loadingNotifications}
                  pagination={
                    !loadingNotifications
                      ? {
                          position: "bottom",
                          showSizeChanger: false,
                          size: "small",
                          pageSize: 2,
                          hideOnSinglePage: true,
                          showLessItems: true,
                          itemRender: (
                            _page: number,
                            type:
                              | "page"
                              | "prev"
                              | "next"
                              | "jump-prev"
                              | "jump-next",
                            element: ReactNode
                          ) => {
                            if (type === "prev") {
                              return (
                                <>
                                  {" "}
                                  {_page > 0 ? (
                                    <a
                                      style={
                                        { marginRight: "8px" } as CSSProperties
                                      }
                                    >
                                      {counterpart.translate(
                                        `buttons.previous`
                                      )}
                                    </a>
                                  ) : (
                                    ""
                                  )}
                                </>
                              );
                            }
                            if (type === "next") {
                              return (
                                <a
                                  style={{ marginLeft: "8px" } as CSSProperties}
                                >
                                  {counterpart.translate(`buttons.next`)}
                                </a>
                              );
                            }
                            return element;
                          },
                        }
                      : false
                  }
                  itemLayout="vertical"
                  dataSource={
                    showUnreadOnly
                      ? thirdClusterNotifications.filter(
                          (notification) => notification.unread
                        )
                      : thirdClusterNotifications
                  }
                  renderItem={(item: Notification) => (
                    <Styled.ActivityListItem key={item.activity.key}>
                      <Styled.ActivitysItemContent>
                        <div className="activity-info">
                          <Tooltip
                            placement="top"
                            title={`${
                              item.unread
                                ? counterpart.translate(`tooltips.mark_read`)
                                : counterpart.translate(`tooltips.mark_unread`)
                            }`}
                          >
                            <Checkbox
                              checked={!item.unread}
                              onChange={(e) => {
                                markTheNotificationAsReadOrUnread(
                                  item.activity.id,
                                  !e.target.checked
                                );
                              }}
                            ></Checkbox>
                            <span className="activity-info-value">
                              <AvtivityInfo infoString={item.activity.info} />
                            </span>
                          </Tooltip>
                        </div>
                      </Styled.ActivitysItemContent>
                    </Styled.ActivityListItem>
                  )}
                />
              </>
            ) : (
              ""
            )}
          </>
        )}
      </Styled.ListsContainer>

      <Styled.AllActivityContainer>
        <Link href={`/user/${localStorageAccount}`} onClick={closeMenu}>
          <a>{counterpart.translate(`links.see_all_account_activity`)}</a>
        </Link>
      </Styled.AllActivityContainer>
    </MenuCard>
  );
};
