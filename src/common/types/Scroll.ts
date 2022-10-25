export type Scroll =
  | ({
      x?: string | number | true;
      y?: string | number;
    } & {
      scrollToFirstRowOnChange?: boolean;
    })
  | undefined;
