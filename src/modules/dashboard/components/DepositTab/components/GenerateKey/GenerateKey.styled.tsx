import {
  Button,
  Col as col,
  Form as depositForm,
  Row as row,
  styled,
} from "../../../../../../ui/src";

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
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  font: normal normal normal 14px/17px Inter;
  letter-spacing: 0px;
  opacity: 1;
`;

export const DepositFormFooterSpan = styled.span`
  font-size: 14px;

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

export const DepositFormFooterA = styled.a`
  color: var(---primary-blue);
  font-size: 14px;

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
