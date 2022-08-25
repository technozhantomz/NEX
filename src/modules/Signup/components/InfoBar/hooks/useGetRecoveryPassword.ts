import { useCallback } from "react";

type UseGetRecoveryPasswordResult = {
  getRecoveryPassword: (username: string, password: string) => void;
};
export const useGetRecoveryPassword = (): UseGetRecoveryPasswordResult => {
  const getRecoveryPassword = useCallback(
    (username: string, password: string): void => {
      const element = document.createElement("a");
      const file = new Blob([password], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = `Peerplays_account_recovery${
        username ? "_" + username : ""
      }`;
      document.body.appendChild(element);
      element.click();
    },
    []
  );
  return {
    getRecoveryPassword,
  };
};
