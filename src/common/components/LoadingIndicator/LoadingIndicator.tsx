import React from "react";

//import * as Styled from "./LoadingIndicator.styled";

type Props = {
  children: React.ReactNode | undefined;
  type: "three-bounce" | "circle" | "circle-small" | "";
  loadingText: string;
};

export const LoadingIndicator = ({
  children,
  type = "",
  loadingText = "",
}: Props): JSX.Element => {
  switch (type) {
    case "three-bounce":
      return <div>This is the three bounce</div>;

    case "circle":
      return <div>This is circle loading</div>;

    case "circle-small":
      return <div>This is the small circle</div>;
    default:
      return (
        <div>
          <span>This is with child</span>
          {children && <div>{children}</div>}
        </div>
      );
  }
};
