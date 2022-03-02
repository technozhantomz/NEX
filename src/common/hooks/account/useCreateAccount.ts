import { useCallback } from "react";

import { faucetUrl } from "../../../api/params";
import { FullAccount, ISignupFormData } from "../../types";
import { useFormKeys } from "../useFormKeys";

import { useAccount } from "./useAccount";

export function useCreateAccount(): {
  createAccount: (data: ISignupFormData) => Promise<FullAccount | undefined>;
} {
  const { getFullAccount } = useAccount();

  const createAccount = useCallback(
    async (data: ISignupFormData) => {
      const keys = useFormKeys(data.username, data.password);
      const account = {
        name: data.username,
        active_key: keys?.active,
        memo_key: keys.memo,
        owner_key: keys.owner,
        refcode: null,
        referrer: data.referrer || null,
      };
      try {
        const newUser = await fetch(faucetUrl as string, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ account }),
        }).then((e) => e.json());
        if (newUser.account) {
          const fullAccount = await getFullAccount(newUser.account.name, false);
          return fullAccount;
        } else {
          console.log(newUser.error);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [useFormKeys, getFullAccount]
  );
  return {
    createAccount,
  };
}
