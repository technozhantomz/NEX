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
  defaultChainId,
  defaultExchanges,
  defaultLatencyPreferences,
  defaultLocales,
  defaultNodesList,
  defaultSettings,
} from "../../../api/params";
import { getPassedTime, isArrayEqual } from "../../../api/utils";
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
  loading: boolean;
  chainId: string;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [chainId, _setChainId] = useLocalStorage("chain_id") as [
    string,
    (value: string) => void
  ];
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

  const setChainId = useCallback(() => {
    if (chainId !== defaultChainId) {
      _setChainId(defaultChainId as string);
    }
  }, [chainId, _setChainId, defaultChainId]);

  const initCache = useCallback(() => {
    if (
      chainId !== defaultChainId ||
      !cache ||
      !cache.created ||
      getPassedTime(new Date(cache.created)) > 24 * 60 * 60 * 1000
    )
      setCache({ created: new Date().getTime(), assets: [] } as Cache);
  }, [cache, setCache, chainId, defaultChainId]);

  const initSettings = useCallback(() => {
    if (chainId !== defaultChainId) {
      setSettings(defaultSettings);
      setExchanges(defaultExchanges);
    }
  }, [defaultChainId, chainId, setSettings, setExchanges]);

  const initApiSettings = useCallback(() => {
    if (chainId !== defaultChainId) {
      setApiSettings(defaultApiSettings);
      setApiLatencies(defaultApiLatencies);
      setLatencyPreferences(defaultLatencyPreferences);
      setLatencyChecks(0);
      setChainId();
    } else {
      if (
        !defaultNodesList
          .map((node) => node.url)
          .includes(apiSettings.selectedNode) ||
        !isArrayEqual(
          defaultNodesList.map((node) => node.url),
          apiSettings.apiServers.map((apiServer) => apiServer.node.url)
        )
      ) {
        setApiSettings(defaultApiSettings);
        setApiLatencies(defaultApiLatencies);
        setLatencyPreferences(defaultLatencyPreferences);
        setLatencyChecks(0);
      }
    }
  }, [
    chainId,
    defaultChainId,
    setApiSettings,
    setApiLatencies,
    setLatencyChecks,
    setChainId,
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

  const initApplication = useCallback(() => {
    return new Promise((resolve, _reject) => {
      initCache();
      initSettings();
      initApiSettings();
      initLocale();
      resolve(true);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    initApplication().then(() => {
      setLoading(false);
    });
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
        loading,
        chainId,
      }}
    >
      {loading ? (
        <h1
          style={{
            height: "50px",
            margin: "0",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Loading...
        </h1>
      ) : (
        <>{children}</>
      )}
    </settingsContext.Provider>
  );
}
