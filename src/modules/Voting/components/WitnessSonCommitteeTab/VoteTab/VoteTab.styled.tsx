import { styled } from "../../../../../ui/src";
import { breakpoint } from "../../../../../ui/src/breakpoints";
import { colors } from "../../../../../ui/src/colors";

export const Container = styled.div`
  padding: 10px 35px;
`;

export const VoteTabCard = styled.div`
  .ant-form-horizontal {
    color: ${colors.textColor};
    text-align: left;
    height: 856px;
    margin: 5px;
    text-align: center;
    ${breakpoint.xs} {
      margin-left: 30px;
    }
  }
`;
