import { styled, List as UiList } from "../../../../../../ui/src";
import { colors } from "../../../../../../ui/src/colors";

export const ControlsContainer = styled.div`
  display: flex;

  justify-content: ${(props) =>
    props.hasUnread ? `space-between` : `flex-end`};
  font-size: 12px;
  margin-bottom: 16px;
  .mark-all {
    color: ${colors.linkColor};
  }
  .unread-switch {
    display: flex;
    align-items: center;
    span {
      margin-left: 4px;
    }
  }
`;

export const ActivityListItem = styled(UiList.Item)`
  padding: 10px 0;
`;

export const ActivitysItemContent = styled.div`
  margin: 10px 0 10px;
  .activity-info {
    margin: 5px 0;
    display: flex;
    align-items: center;
    .activity-info-title {
      min-width: 28px;
      margin-right: 15px;
      font-weight: 300;
      color: ${colors.textColorSecondary};
    }
    .activity-info-value {
      font-weight: 500;
      font-size: 12px;
      margin-left: 8px;
    }
  }
`;

export const ListsContainer = styled.div`
  margin-bottom: 25px;
  .ant-list-pagination {
    margin-top: 16px;
    .ant-pagination {
      font-size: 12px;
    }
  }
  .ant-empty-normal {
    margin: 0;
  }
`;

export const TimeSpecification = styled.div`
  font-size: 10px;
  color: ${colors.textColorSecondary};
`;

export const AllActivityContainer = styled.div`
  a {
    font-size: 12px;
  }
`;
