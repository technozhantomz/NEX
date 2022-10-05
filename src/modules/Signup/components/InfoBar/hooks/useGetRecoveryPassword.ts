import { useCallback } from "react";

import { useFormKeys } from "../../../../../common/hooks";

type UseGetRecoveryPasswordResult = {
  getRecoveryPassword: (username: string, password: string) => void;
};
export const useGetRecoveryPassword = (): UseGetRecoveryPasswordResult => {
  const { formWifKeys } = useFormKeys();
  const getRecoveryPassword = useCallback(
    (username: string, password: string): void => {
      const wifs = formWifKeys(username, password);
      const element = document.createElement("a");
      const fileContents = `
              \n  ###### Active key ######
              \n ${wifs.active}
              \n
              \n  ###### Owner key ######
              \n ${wifs.owner}
              \n
              \n ##### memo key #####
              \n ${wifs.memo}
              \n
              \n ##### master password #####
              \n ${password}
            `;
      const file = new Blob([fileContents], {
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
