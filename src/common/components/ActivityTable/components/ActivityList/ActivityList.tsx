import { List } from "antd";

import { useActivityTable } from "../../hooks";

import * as Styled from "./ActivityList.styled";

export const ActivityList = (): JSX.Element => {
  const { tableActivity, loading, columns } = useActivityTable();

  return (
    <List
      itemLayout="vertical"
      dataSource={tableActivity}
      loading={loading}
      renderItem={(item) => (
        <Styled.ActivityListItem key={item.key}>
          <Styled.ActivitysItemContent>
            <div className="Activity-info">
              <span className="Activity-info-title">{columns[1].title}</span>
              <span className="Activity-info-value">{item.available}</span>
            </div>
            <div className="Activity-info">
              <span className="Activity-info-title">{columns[2].title}</span>
              <span className="Activity-info-value">{item.price}</span>
            </div>
            <div className="Activity-info">
              <span className="Activity-info-title">{columns[3].title}</span>
              <span className="Activity-info-value">{item.change}</span>
            </div>
            <div className="Activity-info">
              <span className="Activity-info-title">{columns[4].title}</span>
              <span className="Activity-info-value">{item.volume}</span>
            </div>
          </Styled.ActivitysItemContent>
        </Styled.ActivityListItem>
      )}
    />
  );
};
