export const useCopyKey = (value: string): void => {
  navigator.clipboard.writeText(value);
};
