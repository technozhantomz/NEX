// import { ConfigProvider } from "antd";
import Head from "next/head";
import React, { ReactNode } from "react";

import TopBar from "./topBar/topBar";

// ConfigProvider.config({
//   theme: {
//     primaryColor: "#0148BE",
//   },
// });

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Peerplays" }: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar />
      {/* <ConfigProvider> */}
      <main>{children}</main>
      {/* </ConfigProvider> */}
    </>
  );
};

export default Layout;
