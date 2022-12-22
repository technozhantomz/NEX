export const copyText = (value: string): void => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(value);
  }
};
