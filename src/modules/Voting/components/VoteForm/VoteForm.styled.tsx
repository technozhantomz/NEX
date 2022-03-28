import {
  CardFormButton as button,
  Col as col,
  Form as form,
  Input as input,
  Row as row,
  styled,
  Text as text,
} from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";
import {
  Info as info,
  Reset as reset,
  Search as search,
} from "../../../../ui/src/icons";

export const FormContainer = styled.div`
  margin-top: 25px;
`;

export const Col = styled(col)`
  width: 50%;
`;

export const Row = styled(row)`
  width: 100%;
`;

export const Form = styled(form)`
  margin-left: 0px !important;
  height: unset !important;
`;

export const FormItem = styled(form.Item)``;

export const CardFormButton = styled(button)`
  width: 185px;
  height: 45px;
  margin-left: 15px;
  background: ${colors.primaryColor};
  border-radius: 4px;
  color: #ffffff;
  &:hover {
    background: #015ef4;
    color: #ffffff;
  }
`;

export const SearchButton = styled(button)`
  position: absolute;
  display: unset !important;
  width: 54px;
  height: 43px;
  border: 0px;
  margin-top: 1px;
  margin-left: -55px;
  margin-right: 20px;
`;

export const CardFormLinkButton = styled(button)`
  width: unset !important;
  margin: 0px;
  font-size: 16px;
  background: none;
  border: none;
  padding: 0;
  color: ${colors.additionalBlue};
  text-align: right;
  vertical-align: middle;
  float: right;
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
  padding-right: 58px;
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
  font-size: 15px;
  color: #b9b9b9;
  ${SearchButton}:hover & {
    color: #2369cc;
  }
`;
