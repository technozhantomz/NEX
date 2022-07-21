import React from "react";
import { MutatingDots, BallTriangle } from "react-loader-spinner";

import { Logo } from "../../../ui/src/icons";
import { usePeerplaysApiContext } from "../PeerplaysApiProvider";
import { useViewportContext } from "../ViewportProvider";

type Props = {
  children: React.ReactNode;
};

export const ConnectionManager = ({ children }: Props): JSX.Element => {
  const { isLoadingConnection, isConnectionError } = usePeerplaysApiContext();
  const { md } = useViewportContext();

  if (isLoadingConnection) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: `${md ? "column" : "row"}`,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f4f4",
        }}
      >
        {md ? (
          <>
            <MutatingDots
              height="100"
              width="100"
              color="#ff4d4f"
              ariaLabel="loading"
              secondaryColor="#0A48BE"
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <Logo
                style={{ fontSize: "15rem", display: "flex", color: "#0A48BE" }}
              />
              <p
                style={{
                  margin: "0 0 0 5px",
                  fontSize: "2rem",
                  fontWeight: "200",
                  color: "#ff4d4f",
                  letterSpacing: "1px",
                }}
              >
                DEX
              </p>
            </div>
          </>
        ) : (
          <>
            <MutatingDots
              height="100"
              width="100"
              color="#ff4d4f"
              ariaLabel="loading"
              secondaryColor="#0A48BE"
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <Logo
                style={{ fontSize: "25rem", display: "flex", color: "#0A48BE" }}
              />
              <p
                style={{
                  margin: "0 0 0 5px",
                  fontSize: "3.5rem",
                  fontWeight: "200",
                  color: "#ff4d4f",
                  letterSpacing: "1px",
                }}
              >
                DEX
              </p>
            </div>
          </>
        )}
      </div>
    );
  } else if (!isLoadingConnection && isConnectionError) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "#0A48BE",
        }}
      >
        <h1>Oops!</h1>
        <h2>Looks like you are lost.</h2>
        <div>
          <a href={"/"} target="_self">
            <span>
              Click here {">>>"} {}
            </span>
          </a>
        </div>
      </div>
    );
  } else {
    return <>{children}</>;
  }
};
