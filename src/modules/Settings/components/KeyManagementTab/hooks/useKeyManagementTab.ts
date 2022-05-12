import { useCallback, useEffect, useState } from "react";

import { isArrayEqual, utils } from "../../../../../api/utils";
import {
  useAccount,
  useFormKeys,
  useTransactionBuilder,
} from "../../../../../common/hooks";
import { useUserContext } from "../../../../../common/providers";
import {
  FullAccount,
  Permissions,
  UserPermissions,
} from "../../../../../common/types";
import { CheckboxValueType, Form } from "../../../../../ui/src";

import {
  FormValidation,
  GeneratedKey,
  ModifiedPermissions,
  UseKeyManagementTabResult,
} from "./useKeyManagementTab.types";

export function useKeyManagementTab(): UseKeyManagementTabResult {
  // should go to upper hook
  const [fullAccount, setFullAccount] = useState<FullAccount | undefined>();
  // should go to upper hook
  const [serverUserActivePermissions, setServerUserActivePermissions] =
    useState<ModifiedPermissions>();
  // should go to upper hook
  const [localUserActivePermissions, setLocalUserActivePermissions] =
    useState<ModifiedPermissions>();
  // should go to upper hook
  const [serverUserOwnerPermissions, setServerUserOwnerPermissions] =
    useState<ModifiedPermissions>();
  // should go to upper hook
  const [localUserOwnerPermissions, setLocalUserOwnerPermissions] =
    useState<ModifiedPermissions>();
  // should go to upper hook
  const [serverUserMemoKey, setServerUserMemoKey] = useState<string>("");
  // should go to upper hook
  const [localUserMemoKey, setLocalUserMemoKey] = useState<string>("");
  // should go to upper hook
  const [loading, setLoading] = useState<boolean>(true);
  // should go to upper hook
  const [generatedKeys, setGeneratedKeys] = useState<GeneratedKey[]>([]);

  const [selectedKeys, setSelectedKeys] = useState<CheckboxValueType[]>([]);
  const [memoWarning, setMemoWarning] = useState<string>("");
  const [fee, setFee] = useState<number>(0);
  const [transactionConfirmed, setTransactionConfirmed] =
    useState<boolean>(false);
  const [keyManagementForm] = Form.useForm();

  const { getFullAccount } = useAccount();
  const { localStorageAccount } = useUserContext();
  const { getTrxFee } = useTransactionBuilder();

  // should go to upper hook
  const handleAddItem = useCallback(
    (
      permissionsType: "active" | "owner",
      itemValue: string,
      weight: number,
      authType: "account" | "address" | "key"
    ) => {
      if (
        localUserActivePermissions !== undefined &&
        localUserOwnerPermissions !== undefined
      ) {
        const isActivePermissions = permissionsType === "active";

        let newLocalPermissions = {} as ModifiedPermissions;
        isActivePermissions
          ? (newLocalPermissions = { ...localUserActivePermissions })
          : (newLocalPermissions = { ...localUserOwnerPermissions });

        authType === "account"
          ? newLocalPermissions.accounts.push(itemValue)
          : authType === "key"
          ? newLocalPermissions.keys.push(itemValue)
          : newLocalPermissions.addresses.push(itemValue);

        Object.assign({}, newLocalPermissions.weights, {
          itemValue: weight,
        });

        isActivePermissions
          ? setLocalUserActivePermissions(newLocalPermissions)
          : setLocalUserOwnerPermissions(newLocalPermissions);
      }
    },
    [
      localUserActivePermissions,
      localUserOwnerPermissions,
      setLocalUserActivePermissions,
      setLocalUserOwnerPermissions,
    ]
  );

  // should go to upper hook
  const handleRemoveItem = useCallback(
    (
      permissionsType: "active" | "owner",
      itemValue: string,
      authType: "account" | "address" | "key"
    ) => {
      if (
        localUserActivePermissions !== undefined &&
        localUserOwnerPermissions !== undefined
      ) {
        const isActivePermissions = permissionsType === "active";

        let newLocalPermissions = {} as ModifiedPermissions;
        isActivePermissions
          ? (newLocalPermissions = { ...localUserActivePermissions })
          : (newLocalPermissions = { ...localUserOwnerPermissions });

        authType === "account"
          ? newLocalPermissions.accounts.filter(
              (account) => account !== itemValue
            )
          : authType === "key"
          ? newLocalPermissions.keys.filter((key) => key !== itemValue)
          : newLocalPermissions.addresses.filter(
              (address) => address !== itemValue
            );

        isActivePermissions
          ? setLocalUserActivePermissions(newLocalPermissions)
          : setLocalUserOwnerPermissions(newLocalPermissions);
      }
    },
    [
      localUserActivePermissions,
      localUserOwnerPermissions,
      setLocalUserActivePermissions,
      setLocalUserOwnerPermissions,
    ]
  );

  // should go to upper hook
  const checkPermissionsChanged = useCallback(
    (permissionsType: "active" | "owner" | "memo") => {
      if (permissionsType === "memo") {
        return serverUserMemoKey !== localUserMemoKey;
      }
      const serverUserPermissions =
        permissionsType === "active"
          ? { ...serverUserActivePermissions }
          : { ...serverUserOwnerPermissions };
      const localUserPermissions =
        permissionsType === "active"
          ? { ...localUserActivePermissions }
          : { ...localUserOwnerPermissions };

      let didChange = false;
      if (
        serverUserPermissions?.threshold !== localUserPermissions?.threshold
      ) {
        didChange = true;
        return didChange;
      }

      const permissionsObjectKeys = ["accounts", "keys", "addresses"];
      permissionsObjectKeys.forEach((key) => {
        if (
          isArrayEqual(
            serverUserPermissions[key] as string[],
            localUserPermissions[key] as string[]
          )
        ) {
          didChange = true;
          return didChange;
        }
      });
      return didChange;
    },
    [
      serverUserMemoKey,
      localUserMemoKey,
      serverUserActivePermissions,
      serverUserOwnerPermissions,
      localUserActivePermissions,
      localUserOwnerPermissions,
      isArrayEqual,
    ]
  );

  // should go to upper hook
  const permissionsFromImmutableObj = useCallback(
    (userKey: Permissions): ModifiedPermissions => {
      const threshold = userKey.weight_threshold;
      const account_auths = userKey.account_auths;
      const key_auths = userKey.key_auths;
      const address_auths = userKey.address_auths;

      const accounts = account_auths.map((account_auth) => account_auth[0]);
      const keys = key_auths.map((key_auth) => key_auth[0]);
      const addresses = address_auths.map((address_auth) => address_auth[0]);

      let weights = account_auths.reduce((previousValue, currentValue) => {
        previousValue[currentValue[0]] = currentValue[1];
        return previousValue;
      }, {} as { [key: string]: number });

      weights = key_auths.reduce((previousValue, currentValue) => {
        previousValue[currentValue[0]] = currentValue[1];
        return previousValue;
      }, weights);
      weights = address_auths.reduce((previousValue, currentValue) => {
        previousValue[currentValue[0]] = currentValue[1];
        return previousValue;
      }, weights);
      return { threshold, accounts, keys, addresses, weights };
    },
    []
  );

  // should go to upper hook
  const permissionsToJson = useCallback(
    (
      threshold: number,
      accounts: string[],
      keys: string[],
      addresses: string[],
      weights: {
        [key: string]: number;
      }
    ): Permissions => {
      const permissions: Permissions = {
        account_auths: [],
        address_auths: [],
        key_auths: [],
        weight_threshold: 0,
      };
      permissions.weight_threshold = threshold;
      permissions.account_auths = accounts
        .sort(utils.sortID)
        .map((a) => [a, weights[a]]);
      permissions.key_auths = keys
        .sort(utils.sortID)
        .map((a) => [a, weights[a]]);
      permissions.address_auths = addresses
        .sort(utils.sortID)
        .map((a) => [a, weights[a]]);

      return permissions;
    },
    []
  );

  // should go to upper hook and get separated
  // const getUpdateAccountTrx = useCallback(() => {
  //   const keys = useFormKeys(
  //     localStorageAccount,
  //     keyManagementForm.getFieldValue("password")
  //   );

  //   if (selectedKeys.includes("active")) {
  //   }

  //   if (selectedKeys.includes("owner")) {
  //   }

  //   if (selectedKeys.includes("memo")) {
  //   }
  //   // setGeneratedKeys([
  //   //   { label: "active", key: keys.active as string },
  //   //   { label: "owner", key: keys.owner as string },
  //   //   { label: "memo", key: keys.memo as string },
  //   // ]);
  //   let updateObject: UserKeys;
  // }, [useFormKeys, keyManagementForm, setGeneratedKeys]);

  // should go to upper hook
  const getAccountWithPermissions = useCallback(async () => {
    try {
      setLoading(true);
      const fullAccount = await getFullAccount(localStorageAccount, false);
      setFullAccount(fullAccount);
      if (fullAccount !== undefined) {
        const userActivePermissions = permissionsFromImmutableObj(
          fullAccount.account.active
        );
        const userOwnerPermissions = permissionsFromImmutableObj(
          fullAccount.account.owner
        );
        setServerUserActivePermissions(userActivePermissions);
        setLocalUserActivePermissions(userActivePermissions);
        setServerUserOwnerPermissions(userOwnerPermissions);
        setLocalUserOwnerPermissions(userOwnerPermissions);
        setServerUserMemoKey(fullAccount.account.options.memo_key);
        setLocalUserMemoKey(fullAccount.account.options.memo_key);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [
    setFullAccount,
    getFullAccount,
    localStorageAccount,
    permissionsFromImmutableObj,
    setServerUserActivePermissions,
    setServerUserOwnerPermissions,
    setServerUserMemoKey,
    setLoading,
  ]);

  const handlePasswordChange = useCallback(() => {
    keyManagementForm.validateFields().then(() => {
      const keys = useFormKeys(
        localStorageAccount,
        keyManagementForm.getFieldValue("password")
      );

      if (selectedKeys.includes("active")) {
      }

      if (selectedKeys.includes("owner")) {
      }

      if (selectedKeys.includes("memo")) {
      }
    });
  }, [keyManagementForm, useFormKeys, selectedKeys, selectedKeys.length]);

  const handleValuesChange = useCallback(() => {
    if (transactionConfirmed) {
      setTransactionConfirmed(false);
    }
  }, [transactionConfirmed, setTransactionConfirmed]);

  const handleCheckboxChange = useCallback(
    (checkedValues: CheckboxValueType[]) => {
      setSelectedKeys(checkedValues);
      if (checkedValues.includes("memo")) {
        setMemoWarning(
          "WARNING: If you replace the memo key you will be unable to read old memos when logging in with your password"
        );
      } else {
        setMemoWarning("");
      }
    },
    [setMemoWarning, setSelectedKeys]
  );

  const validateSelectKeys = (_: unknown) => {
    if (selectedKeys.length > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Please at least select one role"));
  };

  const checkPasswordMatch = (_: unknown, value: { passwordCheck: string }) => {
    if (value === keyManagementForm.getFieldValue("password"))
      return Promise.resolve();
    return Promise.reject(new Error("Password do not match"));
  };

  const formValidation: FormValidation = {
    password: [
      { required: true, message: "Password is required" },
      {
        min: 12,
        message: "Password should be at least 12 characters long",
      },
    ],
    passwordCheck: [
      { required: true, message: "This field is required" },
      { validator: checkPasswordMatch },
    ],
    roles: [{ validator: validateSelectKeys }],
  };

  useEffect(() => {
    getAccountWithPermissions();
  }, [getAccountWithPermissions]);

  return {
    formValidation,
    keyManagementForm,
    generatedKeys,
    handleCheckboxChange,
    memoWarning,
    fee,
    selectedKeys,
    handleValuesChange,
  };
}
