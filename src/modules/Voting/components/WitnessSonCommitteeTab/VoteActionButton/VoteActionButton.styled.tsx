import { styled, Button as UiButton } from "../../../../../ui/src";
import { colors } from "../../../../../ui/src/colors";

export const VoteActionButton = styled(UiButton)`
   {
    width: unset !important;
    margin: 0px;
    font-size: 16px;
    background: none;
    border: none;
    padding: 0;
    color: ${colors.additionalBlue};
    text-align: right;
    vertical-align: middle;
    &:hover {
      color: #2369cc;
    }
  }
`;
