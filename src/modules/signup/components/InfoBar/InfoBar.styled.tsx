import { styled } from "../../../../ui/src";

export const InfoBar = styled.div`
   {
    display: flex;
    text-align: left;
    font-size: 0.9em;
    align-items: center;
  }
  .anticon {
    margin-right: 10px;
    color: var(--ant-warning-color);
  }
`;
export const InfoBarText = styled.div`
  margin: 0;
  max-width: 388px;
`;
