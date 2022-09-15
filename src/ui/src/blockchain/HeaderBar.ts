import styled from "styled-components";

import { breakpoint } from "../breakpoints";

export const BlockchainHeaderBar = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;
  align-content: center;
  .ant-input-group-wrapper {
    margin: 0;
  }
  .ant-input-affix-wrapper {
    width: 40%;
    height: 50px;
    max-width: 341px;
    margin-right: 15px;
  }
  ${breakpoint.sm} {
    .ant-input-affix-wrapper {
      width: 50%;
      margin-right: 25px;
    }
  }
`;
