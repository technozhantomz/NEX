import {
  Col as col,
  Form as formContainer,
  Option,
  Row as row,
  Select,
  styled,
} from "../../../ui/src";

export const FormContainer = styled(formContainer.Item)`
  margin-top: 30px;
`;

export const Row = styled(row)`
  background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c1c2c4;
  border-radius: 4px;
  opacity: 1;
  height: 65px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  color: var(---text-icons);
  font: normal normal medium 20px/24px Inter;
  letter-spacing: 0px;
  color: #212121;
  font-size: 20px;
`;

export const SelectOptionCol = styled(col)`
  margin-top: auto;
  margin-bottom: auto;
`;

export const AmountCol = styled(col)`
  text-align: right;
`;

export const SelectContainer = styled(Select)``;

export const SelectOptionContainer = styled(Option)`
  font-size: 20px;
`;

export const OptionsDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 10px;
  font-size:20px;

}
`;

export const IconDiv = styled.div`
  margin-right: 10px;
`;

export const NamePara = styled.p``;

export const BalancePara = styled.p`
  margin: 20px;
`;
