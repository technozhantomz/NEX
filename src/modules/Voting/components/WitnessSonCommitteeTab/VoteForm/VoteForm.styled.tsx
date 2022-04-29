import {
  Button as button,
  Form as form,
  Input as input,
  Row as row,
  styled,
  Text as text,
} from "../../../../../ui/src";
import { colors } from "../../../../../ui/src/colors";
import {
  Info as info,
  Reset as reset,
  Search as search,
  Xmark as xmark,
} from "../../../../../ui/src/icons";

export const FormContainer = styled.div`
  margin-top: 25px;
`;

export const Row = styled(row)`
  width: 100%;
  justify-content: end;
  flex-flow: row;
`;

export const Form = styled(form)`
  margin-left: 0px !important;
  height: unset !important;
`;

export const FormItemRow1 = styled(form.Item)`
  width: 100%;
  margin: 0px 0px 15px 0px;
`;

export const FormItemRow2 = styled(form.Item)`
  margin: 0px 0px 15px 15px;
`;

export const ClearButton = styled(button)`
  position: absolute;
  display: unset !important;
  margin-top: 0px;
  right: 0;
  margin-right: 40px;
  margin-top: -1px;
  background: none;
  border: 0px;
  color: ${colors.additionalBlue};
  &:hover {
    border: 0px;
    background: none;
  }
`;

export const CardFormButton = styled(button)`
  max-width: 185px;
  width: 100%;
  height: 45px;
  background: ${colors.primaryColor};
  border-radius: 4px;
  color: #ffffff;
  float: right;
  &:hover {
    background: #015ef4;
    color: #ffffff;
  }
`;

export const CardFormLinkButton = styled(button)`
  max-width: 185px;
  width: 100%;
  margin: 0px;
  font-size: 16px;
  background: none;
  border: none;
  padding: 0;
  text-align: right;
  float: right;
  vertical-align: middle;
  color: ${colors.additionalBlue};
`;

export const CardFormLinkButtonDisabled = styled(button)`
  max-width: 185px;
  width: 100%;
  margin: 0px;
  font-size: 16px;
  background: none;
  border: none;
  padding: 0;
  text-align: right;
  float: right;
  vertical-align: middle;
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
  pointer-events: none;
`;

export const DetailsLink = styled(text)`
  vertical-align: middle;
  font-size: 14px;
  color: ${colors.additionalBlue};
  text-decoration: none;
  &:hover {
    color: #2369cc;
  }
`;

export const OverlapContainer = styled.div`
  position: relative;
`;

export const InputText = styled(input)`
  height: 45px;
  width: 100%;
  font-size: 16px;
  border-radius: 4px;
  padding-left: 30px;
  padding-right: 145px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="text"] {
    -moz-appearance: textfield;
  }

  &.ant-input-affix-wrapper > input.ant-input {
    height: 100%;
    text-align: right;
    font-size: 20px;
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const Text = styled(text)``;

/** ICONS */
export const Reset = styled(reset)`
  color: #b9b9b9;
  margin-right: 4px;
`;

export const Info = styled(info)`
  vertical-align: middle;
  font-size: 20px;
  color: #f2c222;
  margin-right: 15px;
`;

export const Search = styled(search)`
  position: absolute;
  display: unset !important;
  margin-top: 14px;
  margin-left: -40px;
  font-size: 15px;
  color: #b9b9b9;
`;

export const Xmark = styled(xmark)`
  font-size: 18px;
  color: #d01721;
`;
