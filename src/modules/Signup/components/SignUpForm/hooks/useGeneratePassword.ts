import { useCallback } from "react";

type UseGeneratePasswordResult = {
  generatePassword: () => string;
};

export const useGeneratePassword = (): UseGeneratePasswordResult => {
  const generatePassword = useCallback((): string => {
    let password = "";
    const characterList =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const characterListLength = characterList.length;
    for (let i = 0; i < 52; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password += characterList.charAt(characterIndex);
    }
    return password;
  }, []);
  return {
    generatePassword,
  };
};
