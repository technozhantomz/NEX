import { Avatar, MenuCard, styled } from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";

export const ProfileMenu = styled(MenuCard)`
  cursor: pointer;
  .ant-card-meta {
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 0 0 10% 25px;
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
  ${breakpoint.sm} {
    .ant-card-meta {
      margin: 0 0 10% 0;
    }
  }
`;

export const ProfileAvatar = styled(Avatar)``;
