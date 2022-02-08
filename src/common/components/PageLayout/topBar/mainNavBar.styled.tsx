import { styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const MainNavBar = styled.div`
   {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    color: var(---white);
    .hambuger {
      font-size: 2em;
      font-weight: bold;
      margin-left: 10px;
    }
    .bell {
      font-size: 1.2em;
      font-weight: bold;
      margin-right: 20px;
    }
  }
`;
