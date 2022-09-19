import React from "react";

type Props = {
  type?: string;
  loadingText?: string;
  children?: React.ReactNode;
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
        <div className="three-bounce">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      );
    case "circle":
      return (
        <div className="circle-wrapper">
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
        </div>
      );
    case "circle-small":
      return (
        <div
          className="circle-wrapper"
          style={{ height: "15px", minHeight: "15px" }}
        >
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
        </div>
      );
    default:
      //TODO: progress removed
      return (
        <div className="loading-overlay">
          <div className="loading-panel">
            {loadingText && (
              <div
                className="text-center"
                style={{ paddingTop: "10px", color: "black" }}
              >
                {loadingText}
              </div>
            )}
            <div className="spinner">
              <div className="bounce1" />
              <div className="bounce2" />
              <div className="bounce3" />
            </div>
          </div>
          {children && <div className="loading-panel--child">{children}</div>}
        </div>
      );
  }
};
