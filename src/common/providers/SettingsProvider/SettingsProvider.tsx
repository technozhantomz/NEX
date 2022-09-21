import counterpart from "counterpart";
import { cloneDeep } from "lodash";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  defaultApiLatencies,
  defaultApiSettings,
  defaultExchanges,
  defaultLatencyPreferences,
  defaultLocales,
  defaultSettings,
} from "../../../api/params";
import { getPassedTime } from "../../../api/utils";
import { useLocalStorage } from "../../hooks";
import {
  ApiLatencies,
  ApiSettings,
  Cache,
  Exchanges,
  LatencyPreferences,
  Settings,
} from "../../types";

export type SettingsContextType = {
  settings: Settings;
  setSettings: (value: Settings) => void;
  exchanges: Exchanges;
  setExchanges: (value: Exchanges) => void;
  cache: Cache;
  setCache: (value: Cache) => void;
  setLocale: (selectedLang: string) => void;
  setApiSettings: (value: ApiSettings) => void;
  apiSettings: ApiSettings;
  setLatencyChecks: (latencyChecks: number) => void;
  latencyChecks: number;
  setApiLatencies: (apiLatencies: ApiLatencies) => void;
  apiLatencies: ApiLatencies;
  latencyPreferences: LatencyPreferences;
  setLatencyPreferences: (preferences: LatencyPreferences) => void;
  connectedNode: string;
  setConnectedNode: (connectedNode: string) => void;
  initiationSettings: boolean;
};

const settingsContext = createContext<SettingsContextType>(
  {} as SettingsContextType
);

export function useSettingsContext(): SettingsContextType {
  return useContext(settingsContext);
}

export function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [initiationSettings, setInitiationSettings] = useState<boolean>(true);
  const [cache, setCache] = useLocalStorage("cache") as [
    Cache,
    (value: Cache) => void
  ];
  const [settings, setSettings] = useLocalStorage("settings") as [
    Settings,
    (value: Settings) => void
  ];
  const [exchanges, setExchanges] = useLocalStorage("exchanges") as [
    Exchanges,
    (value: Exchanges) => void
  ];
  const [apiSettings, setApiSettings] = useLocalStorage("api_settings") as [
    ApiSettings,
    (value: ApiSettings) => void
  ];
  const [apiLatencies, setApiLatencies] = useLocalStorage("api_Latencies") as [
    ApiLatencies,
    (value: ApiLatencies) => void
  ];
  const [latencyPreferences, setLatencyPreferences] = useLocalStorage(
    "latency_preferences"
  ) as [LatencyPreferences, (value: LatencyPreferences) => void];
  const [latencyChecks, setLatencyChecks] = useLocalStorage(
    "latency_checks"
  ) as [number, (value: number) => void];

  const [connectedNode, _setConnectedNode] = useState<string>("");

  const setConnectedNode = useCallback(
    (connectedNode: string) => {
      _setConnectedNode(connectedNode);
    },
    [_setConnectedNode]
  );

  const initCache = useCallback(() => {
    if (
      !cache ||
      !cache.created ||
      getPassedTime(new Date(cache.created)) > 24 * 60 * 60 * 1000
    )
      setCache({ created: new Date().getTime(), assets: [] } as Cache);
  }, [cache, setCache]);

  const initSettings = useCallback(() => {
    if (!settings) {
      setSettings(defaultSettings);
    }
    if (!exchanges) {
      setExchanges(defaultExchanges);
    }
  }, [settings, exchanges, setSettings, setExchanges]);

  const initApiSettings = useCallback(() => {
    console.log("ghasem");
    if (!apiSettings) {
      setApiSettings(defaultApiSettings);
    }
    if (!apiLatencies) {
      setApiLatencies(defaultApiLatencies);
    }
    if (!latencyPreferences) {
      setLatencyPreferences(defaultLatencyPreferences);
    }
    if (!latencyChecks) {
      setLatencyChecks(0);
    }
  }, [
    apiSettings,
    setApiSettings,
    apiLatencies,
    setApiLatencies,
    latencyPreferences,
    setLatencyPreferences,
    latencyChecks,
    setLatencyChecks,
  ]);

  const setLocale = useCallback(
    (selectedLang: string) => {
      counterpart.setLocale(selectedLang);
      if (settings && settings.language !== selectedLang) {
        setSettings({ ...settings, language: selectedLang });
      }
    },
    [settings, setSettings]
  );

  const localeFromStorage = useCallback(() => {
    let selectedLang = "";
    if (settings && settings.language) {
      selectedLang = settings.language;
    }
    if (!selectedLang) {
      const defaultLanguage = navigator.languages[0]
        .split("-")[0]
        .toUpperCase();
      selectedLang = defaultLocales.some((e) => e.type === defaultLanguage)
        ? defaultLanguage
        : "en";
    }
    return selectedLang;
  }, [settings]);

  const initLocale = useCallback(() => {
    defaultLocales.forEach(({ type, json }) =>
      counterpart.registerTranslations(type, json)
    );
    setLocale(localeFromStorage());
  }, [setLocale, localeFromStorage]);
  console.log("abbas");
  console.log("inita", initiationSettings);
  useEffect(() => {
    setInitiationSettings(true);
    initCache();
    initSettings();
    initApiSettings();
    initLocale();
    setInitiationSettings(false);
  }, []);
  return (
    <settingsContext.Provider
      value={{
        settings,
        setSettings,
        exchanges,
        setExchanges,
        cache,
        setCache,
        setLocale,
        setApiSettings,
        apiSettings,
        setLatencyChecks,
        latencyChecks,
        apiLatencies: cloneDeep(apiLatencies),
        setApiLatencies,
        latencyPreferences: cloneDeep(latencyPreferences),
        setLatencyPreferences,
        connectedNode,
        setConnectedNode,
        initiationSettings,
      }}
    >
      {children}
    </settingsContext.Provider>
  );
}
