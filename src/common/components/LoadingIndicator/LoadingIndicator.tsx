import React from "react";

import * as Styled from "./LoadingIndicator.styled";

type Props = {
  type?: "three-bounce" | "circle" | "circle-small";
  loadingText?: string | boolean;
  children?: React.ReactNode | React.ReactNode[];
};
//TODO: styling
export const LoadingIndicator = ({
  type,
  loadingText,

  children,
}: Props): JSX.Element => {
  switch (type) {
    case "three-bounce":
      return (
        <Styled.ThreeBounceWrpper>
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </Styled.ThreeBounceWrpper>
      );
    case "circle":
      return (
        <Styled.CircleWrapper>
          <div className="circle1 circle" />
          <div className="circle2 circle" />
          <div className="circle3 circle" />
          <div className="circle4 circle" />
          <div className="circle5 circle" />
          <div className="circle6 circle" />
          <div className="circle7 circle" />
          <div className="circle8 circle" />
          <div className="circle9 circle" />
          <div className="circle10 circle" />
          <div className="circle11 circle" />
          <div className="circle12 circle" />
        </Styled.CircleWrapper>
      );
    case "circle-small":
      return (
        <Styled.CircleWrapper isSmall={true}>
          <div className="circle1 circle" />
          <div className="circle2 circle" />
          <div className="circle3 circle" />
          <div className="circle4 circle" />
          <div className="circle5 circle" />
          <div className="circle6 circle" />
          <div className="circle7 circle" />
          <div className="circle8 circle" />
          <div className="circle9 circle" />
          <div className="circle10 circle" />
          <div className="circle11 circle" />
          <div className="circle12 circle" />
        </Styled.CircleWrapper>
      );
    default:
      return (
        <Styled.LoadingOverlay>
          <Styled.LoadingPanel>
            {loadingText && (
              <Styled.LoadingText>{loadingText}</Styled.LoadingText>
            )}
            <Styled.Spinner>
              <div className="bounce1" />
              <div className="bounce2" />
              <div className="bounce3" />
            </Styled.Spinner>
          </Styled.LoadingPanel>
          {children && <div className="loading-panel--child">{children}</div>}
        </Styled.LoadingOverlay>
      );
  }
};
