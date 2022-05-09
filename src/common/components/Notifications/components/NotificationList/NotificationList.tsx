import { List } from "antd";
import { useState } from "react";

import { AvtivityInfo } from "../../../ActivityTable/components";
import { useNotification } from "../../hooks";

import * as Styled from "./NotificationList.styled";

type Props = {
  userName?: string;
  isWalletActivityTable?: boolean;
};

export const NotificationList = ({
  userName,
  isWalletActivityTable = false,
}: Props): JSX.Element => {
  const { activitiesTable, loading, recentActivitiesTable } = useNotification({
    userName,
    isWalletActivityTable,
  });

  // localStorage.setItem("activityList", JSON.stringify(activitiesTable));
  // // console.log(JSON.parse(localStorage.getItem("lastname")));
  // // const arr = JSON.parse(localStorage.getItem("activityList"));
  // const arrr = localStorage.getItem("activityList");
  // console.log(JSON.parse(arrr));
  console.log(recentActivitiesTable);
  return (
    <List
      itemLayout="vertical"
      dataSource={recentActivitiesTable}
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
  );
};
