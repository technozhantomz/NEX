import { useCallback } from "react";

type UseGeneratePasswordResult = {
  generatePassword: () => string;
};

export const useGeneratePassword = (): UseGeneratePasswordResult => {
  const generatePassword = useCallback((): string => {
    const characterList =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const characterListLength = characterList.length;
    const randomArray = new Uint8Array(characterListLength);
    crypto.getRandomValues(randomArray);
    let password = "";

    for (let i = 0; i < 52; i++) {
      const randomNumber = randomArray[i] / 256;
      const characterIndex = Math.round(randomNumber * characterListLength);
      password += characterList.charAt(characterIndex);
    }
    return password;
  }, []);
  return {
    generatePassword,
  };
};
