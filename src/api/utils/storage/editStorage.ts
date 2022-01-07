import { setStorage } from "./setStorage";
import { getStorage } from "./getStorage";

export const editStorage = (item: string, params: any, storageType = 'localStorage') => setStorage(item, { ...getStorage(item, storageType), ...params }, storageType);