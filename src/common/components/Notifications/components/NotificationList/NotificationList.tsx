import { List } from "antd";

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
  const { activitiesTable, loading } = useNotification({
    userName,
    isWalletActivityTable,
  });

  return (
    <List
      itemLayout="vertical"
      dataSource={activitiesTable}
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
