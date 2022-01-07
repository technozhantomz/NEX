import { getPassedTime } from '../utils';
import { Apis } from 'peerplaysjs-lib';

export const initNode = async (url: string, actualNode = false): Promise<any> => {

    const start = new Date();

    let instance: any = '';

    if (actualNode) {
        if (Apis.instance().chain_id) {
            await Apis.instance().close();
        }
        instance = Apis.instance(url, true);
    } else {
        instance = Apis.instance(url, true, 1000);
    }
    instance.url = url;
    return instance.init_promise
        .then(() => ({
            instance,
            connectTime: getPassedTime(start)
        }))
        .catch((e: any) => {
            console.error('--error', e);
            return false;
        });
};