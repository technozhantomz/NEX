import counterpart from "counterpart";

import { Proxy } from "../../../../common/types";

import * as Styled from "./ProxyTab.styled";
import { ProxyForm, ProxyTable } from "./components";
import { useProxyTab } from "./hooks";

type Props = {
  totalGpos: number;
  serverProxy: Proxy;
  getUserVotes: () => Promise<void>;
  loading: boolean;
};

export const ProxyTab = ({
  totalGpos,
  serverProxy,
  getUserVotes,
  loading,
}: Props): JSX.Element => {
  const {
    name,
    searchError,
    searchedAccount,
    updateAccountFee,
    loadingTransaction,
    transactionErrorMessage,
    transactionSuccessMessage,
    addProxy,
    removeProxy,
    searchChange,
    handlePublishChanges,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    localProxy,
    isPublishable,
    resetChanges,
    searchValue,
    isSameAccount,
    accountAlreadyAdded,
  } = useProxyTab({ serverProxy, totalGpos, getUserVotes });
  return (
    <Styled.ProxyTabWrapper>
      <Styled.ProxyIntroWrapper>
        <Styled.ProxyTitle>
          {counterpart.translate(`field.labels.vote_for_proxy`)}
        </Styled.ProxyTitle>
      </Styled.ProxyIntroWrapper>
      <ProxyForm
        name={name}
        proxy={localProxy}
        loading={loading}
        searchError={searchError}
        searchedAccount={searchedAccount}
        updateAccountFee={updateAccountFee}
        loadingTransaction={loadingTransaction}
        transactionErrorMessage={transactionErrorMessage}
        transactionSuccessMessage={transactionSuccessMessage}
        addProxy={addProxy}
        removeProxy={removeProxy}
        searchChange={searchChange}
        handlePublishChanges={handlePublishChanges}
        setTransactionErrorMessage={setTransactionErrorMessage}
        setTransactionSuccessMessage={setTransactionSuccessMessage}
        isPublishable={isPublishable}
        resetChanges={resetChanges}
        searchValue={searchValue}
        isSameAccount={isSameAccount}
        accountAlreadyAdded={accountAlreadyAdded}
        approvedMembers={serverProxy.name === "" ? 1 : 0}
        removedMembers={serverProxy.name !== "" ? 1 : 0}
      />
      <ProxyTable
        loading={loading}
        proxy={localProxy}
        removeProxy={removeProxy}
      />
    </Styled.ProxyTabWrapper>
  );
};
