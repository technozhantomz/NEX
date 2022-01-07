import { defaultLocales } from '../../params';
import counterpart from "counterpart";
import { setLocale } from './setLocale';
import { localeFromStorage } from './LocaleFromStorage';

export const initLocale = () => {
    defaultLocales.forEach(({ type, json }) => counterpart.registerTranslations(type, json));
    setLocale(localeFromStorage());
};
