import { useCallback } from "react";

import { useFormKeys } from "..";
import { faucetUrl } from "../../../api/params";
import { FullAccount, SignupForm } from "../../types";

import { useAccount } from "./useAccount";

export function useCreateAccount(): {
  createAccount: (data: SignupForm) => Promise<FullAccount | undefined>;
} {
  const { getFullAccount } = useAccount();
  const { formKeys } = useFormKeys();

  const createAccount = useCallback(
    async (data: SignupForm) => {
      const keys = formKeys(data.username, data.password);
      const account = {
        name: data.username,
        active_key: keys?.active,
        memo_key: keys.memo,
        owner_key: keys.owner,
        refcode: null,
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
    [formKeys, getFullAccount]
  );
  return {
    createAccount,
  };
}
