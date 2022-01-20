import counterpart from "counterpart";

import { getStorage, setStorage } from "../storage";

export const setLocale = (selectedLang: string): void => {
  const settings = getStorage("settings");
  counterpart.setLocale(selectedLang);
  if (settings.language !== selectedLang) {
    settings.language = selectedLang;
    setStorage("settings", settings);
  }
};
