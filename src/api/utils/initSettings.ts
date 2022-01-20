import { defaultExchanges, defaultSettings } from "../params";

import { getStorage, setStorage } from "./storage";

export const initSettings = (): void => {
  if (!getStorage("settings").language)
    setStorage("settings", { ...defaultSettings });
  if (!getStorage("exchanges").active)
    setStorage("exchanges", { ...defaultExchanges });
};
