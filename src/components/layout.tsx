import { ConfigProvider } from "antd";
import Head from "next/head";
import React, { FunctionComponent, ReactNode, useEffect } from "react";

import Styles from "../styles/layouts.module.scss";

import TopBar from "./topBar/topBar";

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
  type?: string | undefined;
  heading?: string | undefined;
};

const Layout: FunctionComponent<Props> = ({
  children,
  title = "PeerPlays",
  description,
  type,
  heading,
}: Props) => {
  useEffect(() => {
    ConfigProvider.config({
      theme: {
        primaryColor: "#0148BE",
        errorColor: "#ff4d4f",
        warningColor: "#faad14",
        successColor: "#2ADF5D",
        infoColor: "#1890ff",
      },
    });
  }, []);

  const getStyles = () => {
    switch (true) {
      case type == "card":
        return Styles.CardLayout;
      default:
        return Styles.Default;
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
      <TopBar />
      <ConfigProvider>
        <main className={getStyles()}>
          {heading != undefined ? (
            <h1 className={Styles.PageHeading}>{heading}</h1>
          ) : (
            ""
          )}
          {children}
        </main>
      </ConfigProvider>
    </>
  );
};

export default Layout;
