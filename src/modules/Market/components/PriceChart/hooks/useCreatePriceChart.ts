import { useEffect, useRef } from "react";

// eslint-disable-next-line import/order
import {
  AvailableSaveloadVersions,
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  LanguageCode,
  ResolutionString,
  ThemeName,
  widget,
} from "../../../../../../public/static/charting_library";

import {
  useAppSettingsContext,
  useMarketContext,
  useViewportContext,
} from "../../../../../common/providers";

import { UseCreatePriceChartResult } from "./useCreatePriceChart.types";
import { useDataFeed } from "./useDataFeed";

declare global {
  interface Window {
    Datafeeds: any;
  }
}

export function useCreatePriceChart(): UseCreatePriceChartResult {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { settings } = useAppSettingsContext();
  const { dataFeed } = useDataFeed();
  const { selectedPair } = useMarketContext();
  const { lg } = useViewportContext();

  let tvWidget1: IChartingLibraryWidget | null = null;

  useEffect(() => {
    if (selectedPair) {
      const symbol = `AcloudBank:${selectedPair.base.symbol}/${selectedPair.quote.symbol}`;
      if (chartContainerRef.current) {
        const widgetOptions: ChartingLibraryWidgetOptions = {
          symbol: symbol,
          // BEWARE: no trailing slash is expected in feed URL
          datafeed: dataFeed,
          interval: "D" as ResolutionString,
          container: chartContainerRef.current,
          library_path: "/static/charting_library/",
          locale: settings.language as LanguageCode,
          disabled_features: [
            "use_localstorage_for_settings",
            "header_widget",
            "top_toolbar",
          ],
          enabled_features: lg ? ["hide_left_toolbar_by_default"] : [],
          charts_storage_url: "https://saveload.tradingview.com",
          charts_storage_api_version: "1.1" as
            | AvailableSaveloadVersions
            | undefined,
          client_id: "tradingview.com",
          user_id: "public_user_id",
          fullscreen: false,
          autosize: true,
          studies_overrides: {},
          theme: settings.darkTheme ? "Dark" : ("Light" as ThemeName),
        };
        const tvWidget = new widget(widgetOptions);

        tvWidget1 = tvWidget;

        tvWidget.onChartReady(() => {
          tvWidget.headerReady().then(() => {
            const button = tvWidget.createButton();
            button.setAttribute("title", "Click to show a notification popup");
            button.classList.add("apply-common-tooltip");
            button.addEventListener("click", () =>
              tvWidget.showNoticeDialog({
                title: "Notification",
                body: "TradingView Charting Library API works correctly",
                callback: () => {
                  console.log("Noticed!");
                },
              })
            );

            button.innerHTML = "Check API";
          });
        });
      }
      return () => {
        if (tvWidget1 !== null) {
          tvWidget1.remove();
          tvWidget1 = null;
        }
      };
    }
  }, [selectedPair]);

  return { chartContainerRef };
}
