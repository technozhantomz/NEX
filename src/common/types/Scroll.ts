export type Scroll =
  | ({
      x?: string | number | true | undefined;
      y?: string | number | undefined;
    } & {
      scrollToFirstRowOnChange?: boolean | undefined;
    })
  | undefined;
