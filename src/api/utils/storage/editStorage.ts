import { getStorage } from "./getStorage";
import { setStorage } from "./setStorage";

export const editStorage = (
  item: string,
  params: object,
  storageType = "localStorage"
): void =>
  setStorage(
    item,
    { ...getStorage(item, storageType), ...params },
    storageType
  );
