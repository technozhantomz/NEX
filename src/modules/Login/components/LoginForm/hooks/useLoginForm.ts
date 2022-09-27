import counterpart from "counterpart";
import { useEffect, useState } from "react";

import { useAccount } from "../../../../../common/hooks";
import {
  useBrowserHistoryContext,
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../common/providers";
import { FullAccount } from "../../../../../common/types";
import { CheckboxChangeEvent, Form } from "../../../../../ui/src";

import { LoginForm, UseLoginFormResult } from "./useLoginForm.types";

export function useLoginForm(): UseLoginFormResult {
  const [submitting, setSubmitting] = useState(false);
  const [validUser, setValidUser] = useState(false);
  const [temporaryFullAccount, setTemporaryFullAccount] = useState<
    FullAccount | undefined
  >(undefined);
  const [useWhaleVault, setUseWhaleVault] = useState<boolean>(false);

  const {
    getFullAccount,
    formAccountAfterConfirmation,
    validateAccountPassword,
    validateWhaleVaultPubKeys,
  } = useAccount();
  const { localStorageAccount, setLocalStorageAccount } = useUserContext();
  const { handleLoginRedirect } = useBrowserHistoryContext();
  const { whaleVaultInstance } = usePeerplaysApiContext();
  const [loginForm] = Form.useForm<LoginForm>();

  const handleLogin = async () => {
    setSubmitting(true);
    loginForm
      .validateFields()
      .then(async () => {
        if (temporaryFullAccount) {
          await formAccountAfterConfirmation(temporaryFullAccount);
          setLocalStorageAccount(temporaryFullAccount.account.name);
        }
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  const onChangeUseWhaleVault = (e: CheckboxChangeEvent) => {
    setUseWhaleVault(e.target.checked);
  };

  const validateUsername = async (_: unknown, value: string) => {
    const fullAccount = await getFullAccount(value, false);
    if (!fullAccount) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.user_not_found`))
      );
    }
    setTemporaryFullAccount(fullAccount);
    setValidUser(true);
    return Promise.resolve();
  };

  const validatePassword = (_: unknown, value: string) => {
    if (temporaryFullAccount) {
      const account = temporaryFullAccount.account;
      const checkPassword = validateAccountPassword(value, account);
      if (!checkPassword)
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.password_incorrect`))
        );
      return Promise.resolve();
    } else {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.user_name_first`))
      );
    }
  };

  const validateUseWhalevault = async () => {
    if (temporaryFullAccount) {
      const account = temporaryFullAccount.account;
      if (useWhaleVault) {
        if (whaleVaultInstance) {
          try {
            const res = await whaleVaultInstance.promiseRequestPubKeys(
              "peerplays-dex",
              `ppy:${account.name}`
            );
            if (res.success) {
              const pubKeys = res.result[`ppy:${account.name}`];
              if (Object.keys(pubKeys).length) {
                const isValidKeys = validateWhaleVaultPubKeys(pubKeys, account);
                if (!isValidKeys) {
                  return Promise.reject(
                    new Error(
                      counterpart.translate(
                        `field.errors.wrong_whalevault_keys`
                      )
                    )
                  );
                }
              } else {
                return Promise.reject(
                  new Error(
                    counterpart.translate(
                      `field.errors.not_added_to_whalevault`
                    )
                  )
                );
              }
            } else {
              return Promise.reject(
                new Error(
                  counterpart.translate(
                    `field.errors.whalevault_connection_error`
                  )
                )
              );
            }
          } catch (e) {
            console.log(e);
            return Promise.reject(
              new Error(
                counterpart.translate(
                  `field.errors.whalevault_connection_error`
                )
              )
            );
          }
        } else {
          return Promise.reject(
            new Error(
              counterpart.translate(`field.errors.whalevault_not_installed`)
            )
          );
        }
      }
      return Promise.resolve();
    } else {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.user_name_first`))
      );
    }
  };

  const formValdation = {
    username: [
      {
        required: true,
        message: counterpart.translate(`field.errors.username_required`),
      },
      { validator: validateUsername },
    ],
    password: [
      {
        required: true,
        message: counterpart.translate(`field.errors.password_required`),
      },
      {
        min: 12,
        message: counterpart.translate(`field.errors.password_should_be_long`),
      },
      { validator: validatePassword },
    ],
    useWhaleVault: [{ validator: validateUseWhalevault }],
  };

  useEffect(() => {
    if (localStorageAccount) {
      handleLoginRedirect();
    }
  }, [localStorageAccount]);

  return {
    validUser,
    loginForm,
    handleLogin,
    formValdation,
    submitting,
    useWhaleVault,
    onChangeUseWhaleVault,
  };
}
