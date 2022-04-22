import { Button as AntdButton } from "antd";
import styled from "styled-components";

export const Button = styled(AntdButton)`
   {
    &:after {
      display: none;
    }
    height: 45px;
    border-radius: 4px;
  }
`;
