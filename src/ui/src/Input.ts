import { Input as AntdInput } from "antd";
import styled from "styled-components";

export const Input = styled(AntdInput)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  font-size: 14px;
`;
