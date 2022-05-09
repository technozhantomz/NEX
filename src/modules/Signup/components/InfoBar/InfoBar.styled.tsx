import { InfoCircleOutlined, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const InfoBar = styled.div`
   {
    display: flex;
    text-align: left;
    font-size: 12px;
    margin-bottom: 25px;
    ${breakpoint.sm} {
      margin-bottom: 28px;
      font-size: 16px;
    }
  }
  .anticon {
    margin-right: 10px;
    margin-top: 50%;
    color: ${colors.warningColor};
  }
`;
export const InfoBarText = styled.div`
  margin: 0;
  max-width: 388px;
  p {
    margin-bottom: 0;
  }
`;

export const InfoIcon = styled(InfoCircleOutlined)``;

export const InfoDiv = styled.div``;
