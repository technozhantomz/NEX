import { List, Switch } from "antd";
import { useState } from "react";

import { MenuCard } from "../../../../../../ui/src";
import { useMenuContext } from "../../../../../providers";
import { NotificationRow } from "../../../../../providers/MenuProvider/MenuProvider.types";
import { AvtivityInfo } from "../../../../ActivityTable/components";

import * as Styled from "./NotificationMenu.styled";

export const NotificationMenu = (): JSX.Element => {
  const [showUnreadOnly, setShowUnreadOnly] = useState<boolean>(false);
  const { notifications } = useMenuContext();
  console.log(notifications);
  return (
    <MenuCard bordered={false}>
      <div className={"advanced"}>
        <Switch
          size="small"
          onChange={() => setShowUnreadOnly(true)}
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
            : notifications.notificationRows
        }
        renderItem={(item: NotificationRow) => (
          <Styled.ActivityListItem key={item.key}>
            <Styled.ActivitysItemContent>
              <div className="activity-info">
                {/* <span className="activity-info-title">{columns[2].title}</span> */}
                <span className="activity-info-value">
                  <AvtivityInfo infoString={item.info} />
                </span>
              </div>
            </Styled.ActivitysItemContent>
          </Styled.ActivityListItem>
        )}
      />
    </MenuCard>
  );
};
