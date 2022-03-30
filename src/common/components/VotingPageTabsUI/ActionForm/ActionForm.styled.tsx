import {
  CardFormButton as button,
  Col as ColUI,
  Form as form,
  Input as input,
  Link as link,
  Row as RowUI,
  Space as space,
  styled,
  Text as text,
} from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";
import { Info as info, Reset as reset } from "../../../../ui/src/icons";

export const ActionFormTabCard = styled.div`
  margin-bottom: 30px;
`;

export const Title = styled(text)`
  color: var(---text-icons);
  font-size: 20px;
  text-align: left;
  font: normal normal medium 20px/24px Inter;
  letter-spacing: 0px;
  color: #212121;
  opacity: 1;
  width: 181px;
  margin-bottom: 10px;
`;

export const TitleDiv = styled.div``;

export const DetailsTitle = styled.p`
  color: var(---primary-blue);
  text-align: center;
  font: normal normal normal 14px/40px Inter;
  letter-spacing: 0px;
  color: #0148be;
  opacity: 1;
`;

export const Form = styled(form)``;

export const Button = styled(button)`
  width: 185px;
  height: 45px;
`;

export const Col = styled(ColUI)``;

export const Row = styled(RowUI)``;

export const DetailsLink = styled(text)`
  color: ${colors.primaryColor};
  text-align: center;
  font: normal normal normal 14px/40px Inter;
  letter-spacing: 0px;
  opacity: 1;
  font-size: 14px;
`;

export const ResetLink = styled(text)`
  color: ${colors.primaryColor};
  text-align: center;
  font: normal normal normal 16px/40px Inter;
  letter-spacing: 0px;
  opacity: 1;
  font-size: 16px;
  margin-left: 10px;
`;

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

export const Link = styled(link)``;

export const Space = styled(space)``;

export const ResetBtnDiv = styled.div`
  // background-color:red;
  text-align: right;
`;

export const SearchInput = styled(input.Search)``;

export const FormItem = styled(form.Item)``;
