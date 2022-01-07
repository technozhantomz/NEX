import {defaultQuote, defaultToken} from './networkparams';

export const defaultExchanges = {
    active: `${defaultQuote}_${defaultToken}`,
    list: [
        `${defaultQuote} / ${defaultToken}`
    ]
};