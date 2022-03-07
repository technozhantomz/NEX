import {
  Col as col,
  Form as depositForm,
  Row as row,
  styled,
} from "../../../ui/src";

export const DepositForm = styled(depositForm)`
  padding-top: 30px;
`;

export const DepositFormItemSelect = styled(depositForm.Item)`
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c1c2c4;
  border-radius: 4px;
  opacity: 1;
  text-align: left;
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
  margin-top: 15px;
  margin-bottom: auto;
`;
