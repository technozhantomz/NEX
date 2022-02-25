import { Col as col, Row as row, styled } from "../../../../ui/src";

export const MarketContainer = styled.div`
  background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  color: white;
  font-size: 20px;
  width: 600px;
  margin: 10px;
  padding: 10px;
  text-align: center;
`;

export const Row = styled(row)`
  margin-left: 10px;
  margin-right: auto;
  margin-bottom: 20px;
`;
export const Col = styled(col)`
  margin: 10px;
`;
export const HeadingPara = styled.p`
  text-align: left;
  font: normal normal normal 14px/17px Inter;
  letter-spacing: 0px;
  color: #6c6c6c;
  opacity: 1;
  margin-left: 20px;
  margin-top: 30px;
`;
