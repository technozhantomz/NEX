import { useCallback } from "react";

type UseGetRecoveryPasswordResult = {
  getRecoveryPassword: (password: string) => void;
};
export const useGetRecoveryPassword = (): UseGetRecoveryPasswordResult => {
  const getRecoveryPassword = useCallback((password: string): void => {
    const element = document.createElement("a");
    const file = new Blob([password], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "password.txt";
    document.body.appendChild(element);
    element.click();
  }, []);
  return {
    getRecoveryPassword,
  };
};
