import { ConfigProvider } from "antd";
import moment from "moment";
import Head from "next/head";
import React, { FunctionComponent, ReactNode } from "react";

import { Footer } from "./Footer";
import * as Styled from "./Layout.styled";
import { TopBar } from "./TopBar";

moment.locale("en");

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
  type?: string;
  heading?: string;
  dexLayout?: boolean;
  onClick?: () => void;
};

export const Layout: FunctionComponent<Props> = ({
  children,
  title = "PeerPlays",
  description,
  type,
  heading,
  dexLayout = false,
  onClick,
}: Props) => {
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
      <Styled.Page className={dexLayout ? "dex-layout" : ""} onClick={onClick}>
        <TopBar />
        <ConfigProvider>
          <Styled.Layout className={`${getStyles()}`}>
            {heading != undefined ? (
              <Styled.PageHeading className={"page-heading"}>
                {heading}
              </Styled.PageHeading>
            ) : (
              ""
            )}
            {children}
            <Footer />
          </Styled.Layout>
        </ConfigProvider>
      </Styled.Page>
    </>
  );
};
