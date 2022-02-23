import { styled, Form as swapForm } from "../../../../ui/src";

export const SwapContainer = styled.div`
  background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  color: white;
  font-size: 20px;
  width: 600px;
  // height: 354px;
  margin: 10px;
  padding: 10px;
  text-align: center;
`;

export const SwapForm = styled(swapForm)``;
export const InfoDiv = styled.div`
  text-align: right;
  font: normal normal normal 14px/17px Inter;
  letter-spacing: 0px;
  color: #6c6c6c;
  opacity: 1;
  margin-right: 30px;
  // display:flex;
`;
export const InfoPara = styled.p`
  .anticon {
    color: var(--ant-warning-color);
    margin-left: 20px;
  }
`;

export const FooterPara = styled.p`
  width: 55%;
  color: var(---text-icons);
  text-align: left;
  font: normal normal normal 14px/20px Inter;
  letter-spacing: 0px;
  color: #212121;
  opacity: 1;
  margin-left: 30px;
  margin-top: 30px;
`;
export const HistoryLinkDiv = styled.div`
  margin-top: 30px;
  backgroundcolor: red;
`;

export const HistoryLink = styled.a`
  font: normal normal normal 16px/20px Inter;
  letter-spacing: 0px;
  color: #0a48be;
  opacity: 1;
`;
