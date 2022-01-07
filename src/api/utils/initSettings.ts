import { defaultSettings } from '../params';
import { getStorage, setStorage } from './storage';
import { defaultExchanges } from '../params';

export const initSettings = () => {
    if (!getStorage('settings').language) setStorage('settings', { ...defaultSettings });
    if (!getStorage('exchanges').active) setStorage('exchanges', { ...defaultExchanges });
};
