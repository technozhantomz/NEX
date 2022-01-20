import { getStorage, setStorage } from "./storage";

import { getPassedTime } from ".";

export const initCache = (): void => {
  const cache = getStorage("cache");
  if (!cache.created || getPassedTime(cache.created) > 24 * 60 * 60 * 1000)
    setStorage("cache", { created: new Date().getTime() });
};
