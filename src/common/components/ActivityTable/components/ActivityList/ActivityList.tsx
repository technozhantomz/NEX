import { List } from "antd";

import { useActivityTable } from "../../hooks";
import { ActivityColumns as columns } from "../ActicityColumns/ActivityColumns";
import { ActivityTag } from "../ActivityTag";

import * as Styled from "./ActivityList.styled";

export const ActivityList = (): JSX.Element => {
  const { tableActivity, loading } = useActivityTable();

  return (
    <List
      itemLayout="vertical"
      dataSource={tableActivity}
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
              <span className="activity-info-value">{item.info}</span>
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
                <ActivityTag type={item.price} />
              </span>
            </div>
          </Styled.ActivitysItemContent>
        </Styled.ActivityListItem>
      )}
    />
  );
};
