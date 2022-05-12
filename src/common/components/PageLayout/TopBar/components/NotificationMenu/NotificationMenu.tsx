import { List, Switch } from "antd";
import { useState } from "react";

import { MenuCard } from "../../../../../../ui/src";
import { useUserContext } from "../../../../../providers";
import { AvtivityInfo } from "../../../../ActivityTable/components";

import * as Styled from "./NotificationMenu.styled";
import { NotificationList } from "./Notifications/components/NotificationList";

export const NotificationMenu = (): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const [showUnreadOnly, setShowUnreadOnly] = useState<boolean>(false);

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
            ? notifications.filter((notification) => notification.unread)
            : notifications
        }
        renderItem={(item) => (
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
