import { Col as col, Row as row, styled } from "../../../../ui/src";
import { Check as check, Xmark as xmark } from "../../../../ui/src/icons";

export const Container = styled.div`
  margin-bottom: 25px;
`;

export const Title = styled.h3``;

export const ColHeader = styled(col)`
  width: 25%;
  font-size: 12px;
  color: #6c6c6c;
  margin-bottom: 10px;
`;

export const Col = styled(col)`
  width: 25%;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const Row = styled(row)`
  width: 100%;
`;

export const RowMessage = styled(row)`
  width: 100%;
  font-size: 20px;
  justify-content: center;
`;

/** ICONS */
export const Check = styled(check)`
  color: #11b881;
  margin-left: 15px;
`;

export const Xmark = styled(xmark)`
  color: #d01721;
  margin-left: 15px;
`;
