export const removeStorageItem = (
  item: string,
  storageType = "localStorage"
): void => window[storageType as keyof Window].removeItem(item);
