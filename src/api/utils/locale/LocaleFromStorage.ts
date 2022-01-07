import { getStorage } from '../storage';
import { defaultLocales } from '../../params';

export const localeFromStorage = () => {
    const settings = getStorage('settings');
    let selectedLang = settings.language;

    if (!selectedLang) {
        const defaultLanguage = navigator.languages[0].split('-')[0].toUpperCase();
        selectedLang = defaultLocales.some(e => e.type === defaultLanguage) ? defaultLanguage : 'EN';
    }

    return selectedLang;
};
