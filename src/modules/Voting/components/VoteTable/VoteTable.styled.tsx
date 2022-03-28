import { styled } from "../../../../ui/src";
import { Check as check, Xmark as xmark } from "../../../../ui/src/icons";

export const Container = styled.div`
  padding: 10px 35px;
`;

/** ICONS */
export const Check = styled(check)`
  color: #11b881;
  margin-right: 4px;
`;

export const Xmark = styled(xmark)`
  color: #d01721;
  margin-right: 4px;
`;
