export const setStorage = (
  item: string,
  params: object,
  storageType = "localStorage"
): void =>
  window[storageType as keyof Window].setItem(item, JSON.stringify(params));
