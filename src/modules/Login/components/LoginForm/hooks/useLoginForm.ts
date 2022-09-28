import counterpart from "counterpart";
import { useEffect, useState } from "react";

import { useAccount } from "../../../../../common/hooks";
import {
  useBrowserHistoryContext,
  usePeerplaysApiContext,
  useSettingsContext,
  useUserContext,
} from "../../../../../common/providers";
import { FullAccount, KeyType } from "../../../../../common/types";
import { CheckboxChangeEvent, Form } from "../../../../../ui/src";

import { LoginForm, UseLoginFormResult } from "./useLoginForm.types";

export function useLoginForm(): UseLoginFormResult {
  const [submitting, setSubmitting] = useState(false);
  const [validUser, setValidUser] = useState(false);
  const [temporaryFullAccount, setTemporaryFullAccount] = useState<
    FullAccount | undefined
  >(undefined);
  const [useWhaleVault, setUseWhaleVault] = useState<boolean>(false);
  const [loggedInKeyType, setLoggedInKeyType] = useState<KeyType>("");

  const {
    getFullAccount,
    formAccountAfterConfirmation,
    validateAccountPassword,
    validateWhaleVaultPubKeys,
  } = useAccount();
  const { localStorageAccount, setLocalStorageAccount } = useUserContext();
  const { setSettings, settings } = useSettingsContext();
  const { handleLoginRedirect } = useBrowserHistoryContext();
  const { whaleVaultInstance } = usePeerplaysApiContext();
  const [loginForm] = Form.useForm<LoginForm>();

  const handleLogin = async () => {
    setSubmitting(true);

    loginForm
      .validateFields()
      .then(async () => {
        if (temporaryFullAccount) {
          // key loggin
          if (!useWhaleVault) {
            await formAccountAfterConfirmation(
              temporaryFullAccount,
              loginForm.getFieldValue("password"),
              loggedInKeyType
            );
            //WhaleVault loggin
          } else {
            await formAccountAfterConfirmation(
              temporaryFullAccount,
              "",
              "whaleVault"
            );
          }
          setLocalStorageAccount(temporaryFullAccount.account.name);
        }
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  const onChangeWalletLock = (value: number) => {
    setSettings({ ...settings, walletLock: value });
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
      const { checkPassword, keyType } = validateAccountPassword(
        value,
        account
      );
      if (!checkPassword)
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.password_incorrect`))
        );
      setLoggedInKeyType(keyType);
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
    onChangeWalletLock,
  };
}
