import {
  Button,
  Form as depositForm,
  Option,
  Select,
  styled,
} from "../../../../ui/src";

export const DepositFormContainer = styled.div`
  background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  color: white;
  font-size: 25px;
  text-align: center;
  width: 600px;
  height: 268px;
  margin: 10px;
  padding: 10px;
`;

export const DepositForm = styled(depositForm)``;

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

export const DepositFormSelect = styled(Select)``;

export const DepositFormOption = styled(Option)``;

export const DepositFormBotton = styled(Button)`
  margin-top: 50px;
  height: 44px;
  background: var(---primary-blue) 0% 0% no-repeat padding-box;
  background: #0148be 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  color: var(---text-icons-ffffff);
  text-align: center;
  font: normal normal normal 16px/20px Inter;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`;

export const DepositFormFooter = styled.p`
  margin-top: 40px;
  font-size: 0.9em;
  font-weight: 300;
  text-align: center;
  font: normal normal normal 14px/17px Inter;
  letter-spacing: 0px;
  opacity: 1;
`;

export const DepositFormFooterSpan = styled.span``;

export const DepositFormFooterA = styled.a``;
