type GetStorageOutput = {
  created: Date;
  language: string;
  active: boolean;
};
export const getStorage = (
  item: string,
  storageType = "localStorage"
): GetStorageOutput => {
  const data = window[storageType as keyof Window].getItem(item);
  let result;

  try {
    const storageItem = JSON.parse(data);
    result = storageItem || {};
  } catch (error) {
    console.log("---storageError", error);
  }

  return result;
};
