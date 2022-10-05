import { styled, Input as UiInput } from "../../../ui/src";
import { colors } from "../../../ui/src/colors";

export const KeyInput = styled(UiInput)`
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.borderColorBase};
  border-radius: 4px;
  .ant-input-password-icon {
    color: #b9b9b9;
    display: flex;
    justify-content: space-between;
    width: 38px;
    align-items: center;
  }
`;
