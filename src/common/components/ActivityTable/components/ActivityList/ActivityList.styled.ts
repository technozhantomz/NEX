import { styled, List as UiList } from "../../../../../ui/src";
import { colors } from "../../../../../ui/src/colors";

export const ActivityListItem = styled(UiList.Item)`
  padding: 15px 20px;
`;

export const ActivitysItemContent = styled.div`
  margin: 18px 0 25px;
  .activity-info {
    margin: 5px 0;
    display: flex;
    .activity-info-title {
      min-width: 28px;
      margin-right: 15px;
      font-weight: 300;
      color: ${colors.textColorSecondary};
    }
    .activity-info-value {
      font-weight: 500;
    }
  }
`;
