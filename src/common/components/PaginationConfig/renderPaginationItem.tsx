import counterpart from "counterpart";
import { CSSProperties, ReactNode } from "react";

export function renderPaginationItem(): (
  _page: number,
  type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
  element: ReactNode
) => ReactNode {
  const paginationItem = (
    _page: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
    element: ReactNode
  ) => {
    if (type === "prev") {
      return (
        <>
          {" "}
          {_page > 0 ? (
            <a
              style={
                {
                  marginRight: "8px",
                } as CSSProperties
              }
            >
              {counterpart.translate(`buttons.previous`)}
            </a>
          ) : (
            ""
          )}
        </>
      );
    }
    if (type === "next") {
      return (
        <a style={{ marginLeft: "8px" } as CSSProperties}>
          {counterpart.translate(`buttons.next`)}
        </a>
      );
    }
    return element;
  };
  return paginationItem;
}
