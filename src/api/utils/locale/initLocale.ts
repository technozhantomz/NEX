import counterpart from "counterpart";

import { defaultLocales } from "../../params";

import { localeFromStorage } from "./LocaleFromStorage";
import { setLocale } from "./setLocale";

export const initLocale = (): void => {
  defaultLocales.forEach(({ type, json }) =>
    counterpart.registerTranslations(type, json)
  );
  setLocale(localeFromStorage());
};
