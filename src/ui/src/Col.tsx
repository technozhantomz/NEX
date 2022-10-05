/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col as AntdCol } from "antd";
import { get, includes, isPlainObject, keys, omit, set } from "lodash";
import React, { forwardRef, useMemo } from "react";

import { breakpoints } from "./breakpoints";

type ResponsivePropName =
  | "flex"
  | "offset"
  | "order"
  | "pull"
  | "push"
  | "span";

/**
 * Behaves exactly like the Col from Ant Design, except that it allows
 * specifying all props in styled-system responsive way.
 *
 * Example:
 *
 *  <Col span={{ _: 5, sm: 3, xl: 4 }} />
 */
export const Col = forwardRef<
  any,
  any
  //| Omit<ColProps & React.Ref<HTMLDivElement>, 'contentEditable' | 'inscance'>
  //| undefined,

  //   Omit<ColProps, ResponsivePropName> &
  //     React.RefAttributes<HTMLDivElement> & {
  //       children?: ReactNode
  //       flex?: ResponsivePropValue
  //       offset?: ResponsivePropValue
  //       order?: ResponsivePropValue
  //       pull?: ResponsivePropValue
  //       push?: ResponsivePropValue
  //       span?: ResponsivePropValue
  //     }
>((props, ref) => {
  const responsiveProps = useMemo(() => {
    const responsivePropNames: Array<ResponsivePropName> = [
      "flex",
      "offset",
      "order",
      "pull",
      "push",
      "span",
    ];

    let result = { ...props };

    for (const propName of responsivePropNames) {
      if (isPlainObject(props[propName])) {
        let hasDefaultValue = false;
        for (const propBreakpointName of keys(props[propName])) {
          const value = get(props[propName], propBreakpointName);
          if (includes(Object.keys(breakpoints), propBreakpointName)) {
            set(result, `${propBreakpointName}.${propName}`, value);
          } else {
            result[propName] = value;
            hasDefaultValue = true;
          }
        }
        if (!hasDefaultValue) {
          result = omit(result, propName);
        }
      }
    }
    return result;
  }, [props]);

  return <AntdCol ref={ref} {...responsiveProps} />;
});
