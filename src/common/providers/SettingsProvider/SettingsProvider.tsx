import counterpart from "counterpart";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";

import {
  defaultExchanges,
  defaultLocales,
  defaultSettings,
} from "../../../api/params";
import { getPassedTime } from "../../../api/utils";
import { useLocalStorage } from "../../hooks";
import { Cache, Exchanges, Settings } from "../../types";

export type SettingsContextType = {
  settings: Settings;
  setSettings: (value: Settings) => void;
  exchanges: Exchanges;
  setExchanges: (value: Exchanges) => void;
  cache: Cache;
  setCache: (value: Cache) => void;
  setLocale: (selectedLang: string) => void;
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
  const [settings, setSettings] = useLocalStorage("settings") as [
    Settings,
    (value: Settings) => void
  ];

  // should add chain id
  const [exchanges, setExchanges] = useLocalStorage("exchanges") as [
    Exchanges,
    (value: Exchanges) => void
  ];
  // should add chain id
  const [cache, setCache] = useLocalStorage("cache") as [
    Cache,
    (value: Cache) => void
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
        : "EN";
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
      }}
    >
      {children}
    </settingsContext.Provider>
  );
}
