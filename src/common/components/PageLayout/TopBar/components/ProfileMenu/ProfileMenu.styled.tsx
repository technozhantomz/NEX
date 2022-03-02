import { Avatar, MenuCard, styled } from "../../../../../../ui/src";

export const ProfileMenu = styled(MenuCard)`
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

export const ProfileAvitar = styled(Avatar)``;
