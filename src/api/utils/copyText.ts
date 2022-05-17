export const copyText = (value: string): void => {
  navigator.clipboard.writeText(value);
};
