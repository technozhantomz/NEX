import { ConfigProvider } from "antd";
import { Locale } from "antd/lib/locale-provider";
import enUS from "antd/lib/locale/en_US";
import ruRU from "antd/lib/locale/ru_RU";
import moment from "moment";
import Head from "next/head";
import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { useSettingsContext } from "../../providers";

import * as Styled from "./Layout.styled";
import { TopBar } from "./TopBar";

moment.locale("en");

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
  const { settings } = useSettingsContext();
  const [locale, _setLocale] = useState<Locale>(enUS);

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
    setLocale(settings.language);
  }, [settings]);

  const setLocale = (language: string) => {
    switch (true) {
      case language === "en":
        _setLocale(enUS);
        moment.locale("en");
        break;
      case language === "ru":
        _setLocale(ruRU);
        moment.locale("ru");
        break;
      default:
        _setLocale(enUS);
        moment.locale("en");
        break;
    }
  };

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
        <ConfigProvider locale={locale}>
          <Styled.Layout
            className={`${locale.locale} ${getStyles()}`}
            key={locale.locale}
          >
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
