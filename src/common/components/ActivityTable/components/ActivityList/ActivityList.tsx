import { List } from "../../../../../ui/src";
import { useActivityTable } from "../../hooks";
import { ActivityColumns as columns } from "../ActivityColumns/";
import { ActivityTag } from "../ActivityTag";
import { AvtivityInfo } from "../AvtivityInfo";

import * as Styled from "./ActivityList.styled";

type Props = {
  userName?: string;
  isWalletActivityTable?: boolean;
};

export const ActivityList = ({
  userName,
  isWalletActivityTable = false,
}: Props): JSX.Element => {
  const { activitiesRows, loading } = useActivityTable({
    userName,
    isWalletActivityTable,
  });

  return (
    <List
      itemLayout="vertical"
      dataSource={activitiesRows}
      loading={loading}
      renderItem={(item) => (
        <Styled.ActivityListItem key={item.key}>
          <Styled.ActivitysItemContent>
            <div className="activity-info">
              <span className="activity-info-title">{columns[0].title}</span>
              <span className="activity-info-value">{item.time}</span>
            </div>
            <div className="activity-info">
              <span className="activity-info-title">{columns[2].title}</span>
              <span className="activity-info-value">
                <AvtivityInfo infoString={item.info} />
              </span>
            </div>
            <div className="activity-info">
              <span className="activity-info-title">{columns[3].title}</span>
              <span className="activity-info-value">{item.id}</span>
            </div>
            <div className="activity-info">
              <span className="activity-info-title">{columns[4].title}</span>
              <span className="activity-info-value">{item.fee}</span>
            </div>
            <div className="activity-info">
              <span className="activity-info-title">{columns[1].key}</span>
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
