import counterpart from "counterpart";
import Link from "next/link";

import { Proxy } from "../../../../common/types";
import { InfoCircleOutlined } from "../../../../ui/src";

import * as Styled from "./ProxyTab.styled";
import { ProxyForm, ProxyTable } from "./components";
import { useProxyTab } from "./hooks";

type Props = {
  totalGpos: number;
  serverProxy: Proxy;
  getProxyAccount: (proxyId: string) => Promise<void>;
  loading: boolean;
};

export const ProxyTab = ({
  totalGpos,
  serverProxy,
  getProxyAccount,
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
    addChange,
    cancelChange,
    searchChange,
    handlePublishChanges,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    localProxy,
    pendingChanges,
    isPublishable,
    resetChanges,
    searchValue,
    isSameAccount,
    accountAlreadyAdded,
  } = useProxyTab({ serverProxy, totalGpos, getProxyAccount });
  return (
    <Styled.ProxyTabWrapper>
      <Styled.ProxyIntroWrapper>
        <Styled.ProxyTitle>
          {counterpart.translate(`field.labels.vote_for_proxy`)}
          <InfoCircleOutlined />
          <Link href={""}>{counterpart.translate(`links.learn_more`)}</Link>
        </Styled.ProxyTitle>
      </Styled.ProxyIntroWrapper>
      {pendingChanges.length > 0 ? (
        <>
          <ProxyTable
            loading={loading}
            proxyVotes={pendingChanges}
            type="pendingChanges"
            addChange={addChange}
            cancelChange={cancelChange}
          />
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
            addChange={addChange}
            cancelChange={cancelChange}
            searchChange={searchChange}
            handlePublishChanges={handlePublishChanges}
            setTransactionErrorMessage={setTransactionErrorMessage}
            setTransactionSuccessMessage={setTransactionSuccessMessage}
            isPublishable={isPublishable}
            resetChanges={resetChanges}
            searchValue={searchValue}
            isSameAccount={isSameAccount}
            accountAlreadyAdded={accountAlreadyAdded}
          />
        </>
      ) : (
        ""
      )}
      <ProxyTable
        loading={loading}
        proxyVotes={[]}
        type="allVotes"
        addChange={addChange}
        cancelChange={cancelChange}
      />
    </Styled.ProxyTabWrapper>
  );
};
