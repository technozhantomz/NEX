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
  margin-bottom: 20px;
  @media (min-width: 500px) {
    margin-left: 25px;
    margin-top: 25px;
    margin-right: auto;
  }
`;
export const Col = styled(col)`
  margin: 5px;
`;
export const HeadingPara = styled.p`
  text-align: left;
  font: normal normal normal 14px/17px Inter;
  letter-spacing: 0px;
  color: #6c6c6c;
  opacity: 1;
  margin-left: 30px;
  margin-top: 30px;
  @media (max-width: 500px) {
    font-size: 12px;
    margin-left: 7px;
  }
`;
