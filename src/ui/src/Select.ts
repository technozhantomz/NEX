import { Select as AntdSelect, SelectProps } from "antd";
import {
  LabeledValue as AntdLabeledValue,
  SelectValue as AntdSelectValue,
} from "antd/lib/tree-select";
import React from "react";
import styled from "styled-components";

type GenericSelectProps<T> = SelectProps<T>;

export type SelectValue = AntdSelectValue;
export type LabeledValue = AntdLabeledValue;

type SelectReturnType = {
  <T>(props: GenericSelectProps<T>): ReturnType<typeof AntdSelect>;
  Option: typeof AntdSelect.Option;
  OptGroup: typeof AntdSelect.OptGroup;
};

export const Select = styled(
  AntdSelect
)`` as React.ComponentType as SelectReturnType;

Select.Option = AntdSelect.Option;
Select.OptGroup = AntdSelect.OptGroup;

export const { Option } = styled(Select)``;
