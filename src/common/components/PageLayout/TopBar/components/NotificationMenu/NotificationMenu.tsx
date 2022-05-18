import { List, Switch } from "antd";
import { useState } from "react";

import { MenuCard } from "../../../../../../ui/src";
import { useMenuContext } from "../../../../../providers";
import { NotificationRow } from "../../../../../types";
import { AvtivityInfo } from "../../../../ActivityTable/components";

import * as Styled from "./NotificationMenu.styled";

export const NotificationMenu = (): JSX.Element => {
  const [showUnreadOnly, setShowUnreadOnly] = useState<boolean>(false);
  const { notifications } = useMenuContext();
 
  return (
    <MenuCard bordered={false}>
      <div className={"unread-switch"}>
        <Switch
          size="small"
          onChange={() => setShowUnreadOnly(!showUnreadOnly)}
          defaultChecked={showUnreadOnly}
        />
        <span> Show only unread</span>
      </div>

      <List
        itemLayout="vertical"
        dataSource={
          showUnreadOnly
            ? notifications.notificationRows.filter(
                (row) => (row as NotificationRow).unread
              )
            : notifications.notificationRows.slice(0, 5)
        }
        renderItem={(item: NotificationRow) => (
          <Styled.ActivityListItem key={item.notificationRow.key}>
            <Styled.ActivitysItemContent>
              <div className="activity-info">
                {/* <span className="activity-info-title">{columns[2].title}</span> */}
                <span className="activity-info-value">
                  <AvtivityInfo infoString={item.notificationRow.info} />
                </span>
              </div>
            </Styled.ActivitysItemContent>
          </Styled.ActivityListItem>
        )}
      />
    </MenuCard>
  );
};
