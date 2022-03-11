import { ConfigProvider } from "antd";
import Head from "next/head";
import React, { FunctionComponent, ReactNode, useEffect } from "react";

import * as Styled from "./Layout.styled";
import { TopBar } from "./TopBar";

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
  type?: string | undefined;
  heading?: string | undefined;
  dexLayout?: boolean;
};

export const Layout: FunctionComponent<Props> = ({
  children,
  title = "PeerPlays",
  description,
  type,
  heading,
  dexLayout = false,
}: Props) => {
  useEffect(() => {
    ConfigProvider.config({
      theme: {
        primaryColor: "#0148BE",
        errorColor: "#ff4d4f",
        warningColor: "#f2c222",
        successColor: "#2ADF5D",
        infoColor: "#1890ff",
      },
    });
  }, []);

  const getStyles = () => {
    switch (true) {
      case type == "card":
        return "card-layout";
      case type == "card-lrg":
        return "card-layout__lrg";
      default:
        return "default";
    }
  };

  return (
    <>
      <Head>
        <title>{title} | PeerPlays</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Styled.Page className={dexLayout ? "dex-layout" : ""}>
        <TopBar />
        <ConfigProvider>
          <Styled.Layout className={getStyles()}>
            {heading != undefined ? (
              <Styled.PageHeading className={"page-heading"}>
                {heading}
              </Styled.PageHeading>
            ) : (
              ""
            )}
            {children}
          </Styled.Layout>
        </ConfigProvider>
      </Styled.Page>
    </>
  );
};
