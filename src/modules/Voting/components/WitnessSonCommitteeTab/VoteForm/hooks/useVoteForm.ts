import { useCallback, ChangeEvent, useState } from "react";
import { useAccount } from "../../../../../../common/hooks";
import { useUserContext } from "../../../../../../common/providers";
import { Form } from "../../../../../../ui/src";

import { UseVoteFormResult } from "./useVoteForm.types";

export function useVoteForm(): UseVoteFormResult {
    const [searchError, setSearchError] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [isSameAccount, setIsSameAccount] = useState<boolean>(false);
    const [accountAlreadyAdded, setAccountAlreadyAdded] = useState<boolean>(false);
    const [searchedAccount, setSearchedAccount] = useState<Account | undefined>();
    const [voteForm] = Form.useForm();
    const {
    getAccountByName,
    getFullAccount,
    getPrivateKey,
    formAccountBalancesByName,
    } = useAccount();
    const { id, assets, name, localStorageAccount } = useUserContext();
    
    const searchChange = useCallback(
    async (inputEvent: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(inputEvent.target.value);
      const account = await getAccountByName(inputEvent.target.value);
      if (account) {
        if (account.name === localStorageAccount) {
          setIsSameAccount(true);
          setSearchError(true);
        } else {
          setSearchedAccount(account);
          setIsSameAccount(false);
          setSearchError(false);
        }
      } else {
        setIsSameAccount(false);
        // setAccountAlreadyAdded(false);
        setSearchError(true);
      }
    },
    [
      getAccountByName,
      setSearchedAccount,
      setSearchError,
      setSearchValue,
      setIsSameAccount,
      // setAccountAlreadyAdded,
    ]
    );
  
  return {
    voteForm,
    searchChange,
    searchError,
    isSameAccount,
    searchValue,
    setSearchValue
  };
}
