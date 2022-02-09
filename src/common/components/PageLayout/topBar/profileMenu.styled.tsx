import {
  styled,
  Avatar as UiAvatar,
  MenuCard as UIMenuCard,
} from "../../../../ui/src";

export const ProfileMenu = styled(UIMenuCard)`
  .ant-card-meta {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10%;
    .ant-card-meta-detail {
      .ant-card-meta-title {
        margin: 0;
        padding: 0;
      }
      .ant-card-meta-description {
        font-size: 0.7em;
      }
    }
  }
`;

export const ProfileAvitar = styled(UiAvatar)``;
