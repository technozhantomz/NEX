import {
  CardFormButton as button,
  Col as ColUI,
  Form as form,
  Input as input,
  Row as RowUI,
  styled,
  Text as text,
} from "../../../../ui/src";

export const ActionFormTabCard = styled.div``;

export const Title = styled(text)`
  color: var(---text-icons);
  font-size: 20px;
  text-align: left;
  font: normal normal medium 20px/24px Inter;
  letter-spacing: 0px;
  color: #212121;
  opacity: 1;
  width: 181px;
`;

export const TitleDiv = styled.div`
  text-align: center;
`;

export const DetailsTitle = styled.p`
  color: var(---primary-blue);
  text-align: center;
  font: normal normal normal 14px/40px Inter;
  letter-spacing: 0px;
  color: #0148be;
  opacity: 1;
`;

export const Form = styled(form)``;

export const Button = styled(button)``;

export const Col = styled(ColUI)``;

export const Row = styled(RowUI)``;
