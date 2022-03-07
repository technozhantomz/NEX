import { Input as KeyInput, styled } from "../../../ui/src";

export const DepositHeader = styled.p`
  margin-left: 10px;
  margin-top: 3px;
  color: var(---text-icons);
  text-align: center;
  font: normal normal medium 16px/20px Inter;
  letter-spacing: 0px;
  color: #212121;
  opacity: 1;
  font-size: 16px;
`;

export const KeyDownloadLink = styled.a`
  color: var(---primary-blue);
  text-align: center;
  font: normal normal normal 16px/40px Inter;
  letter-spacing: 0px;
  color: #0148be;
  opacity: 1;
`;

export const DisclaimerFooter = styled.p`
  color: var(---text-icons);
  text-align: left;
  font: normal normal normal 14px/20px Inter;
  letter-spacing: 0px;
  color: #212121;
  opacity: 1;
  font-size: 0.5em;
  width: 85%;

  @media (max-width: 500px) {
    font-size: 0.4em;
  }
`;

export const InfoBox = styled.div`
   {
    display: flex;
    margin: 10px;
  }
  .anticon {
    color: var(--ant-warning-color);
    margin-right: 20px;
    margin-left: 20px;

    @media (max-width: 500px) {
      margin-right: 5px;
      margin-left: 5px;
    }
  }
`;

export const GeneratedBitcoinKey = styled(KeyInput)`
  height: 50px;
  width: 95%;
  background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c1c2c4;
  border-radius: 4px;
  opacity: 1;
  text-align: left;
  padding: 10px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const KeyLinkContainer = styled.div`
  margin-top: 15px;
`;

export const KeyContainer = styled.div`
   {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    text-align: center;
  }
`;
