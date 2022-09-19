import counterpart from "counterpart";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";

import {
  defaultApiSettings,
  defaultExchanges,
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
  apiSettings: ApiSettings;
  setLatencyChecks: (latencyChecks: number) => void;
  updateLatencies: (apiLatencies: ApiLatencies) => void;
  setLatencyPreferences: (preferences: LatencyPreferences) => void;
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
    if (!apiSettings) {
      setApiSettings(defaultApiSettings);
    }
  }, [apiSettings, setApiSettings]);

  const setLatencyChecks = useCallback(
    (latencyChecks: number) => {
      setApiSettings({ ...apiSettings, latencyChecks });
    },
    [setApiSettings, apiSettings]
  );

  const updateLatencies = useCallback(
    (apiLatencies: ApiLatencies) => {
      setApiSettings({ ...apiSettings, apiLatencies });
    },
    [setApiSettings, apiSettings]
  );

  const setLatencyPreferences = useCallback(
    (preferences: LatencyPreferences) => {
      setApiSettings({ ...apiSettings, latencyPreferences: preferences });
    },
    [setApiSettings, apiSettings]
  );

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

  useEffect(() => {
    initCache();
    initSettings();
    initApiSettings();
    initLocale();
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
        apiSettings,
        setLatencyChecks,
        updateLatencies,
        setLatencyPreferences,
      }}
    >
      {children}
    </settingsContext.Provider>
  );
}
