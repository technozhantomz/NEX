import counterpart from "counterpart";
import { ChangeEvent, Dispatch } from "react";

import {
  PasswordModal,
  TransactionModal,
} from "../../../../../../common/components";
import {
  TransactionMessageAction,
  TransactionMessageState,
  useHandleTransactionForm,
} from "../../../../../../common/hooks";
import { useViewportContext } from "../../../../../../common/providers";
import { Account, Proxy, SignerKey } from "../../../../../../common/types";
import { Form, RedoOutlined } from "../../../../../../ui/src";

import * as Styled from "./ProxyForm.styled";

type Props = {
  name: string;
  proxy: Proxy;
  loading: boolean;
  searchError: boolean;
  searchedAccount: Account | undefined;
  updateAccountFee: number;
  addProxy: (account: Account) => void;
  removeProxy: () => void;
  searchChange: (inputEvent: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handlePublishChanges: (signerKey: SignerKey) => Promise<void>;
  isPublishable: boolean;
  resetChanges: () => void;
  searchValue: string;
  isSameAccount: boolean;
  accountAlreadyAdded: boolean;
  transactionMessageState: TransactionMessageState;
  transactionMessageDispatch: Dispatch<TransactionMessageAction>;
};

export const ProxyForm = ({
  name,
  proxy,
  loading,
  searchError,
  searchedAccount,
  updateAccountFee,
  addProxy,
  searchValue,
  searchChange,
  handlePublishChanges,
  isPublishable,
  resetChanges,
  isSameAccount,
  accountAlreadyAdded,
  transactionMessageState,
  transactionMessageDispatch,
}: Props): JSX.Element => {
  const [proxyForm] = Form.useForm();
  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: handlePublishChanges,
    transactionMessageDispatch,
    neededKeyType: "active",
  });
  const { sm } = useViewportContext();

  const alreadyAddedNoAccountError = accountAlreadyAdded
    ? counterpart.translate(`field.errors.added_account`)
    : counterpart.translate(`field.errors.no_account`);

  const accountErrors = isSameAccount
    ? counterpart.translate(`field.errors.same_account`)
    : alreadyAddedNoAccountError;

  const searchErrorMessage = searchError ? accountErrors : undefined;

  return (
    <>
      <Styled.ProxySearchWrapper>
        <Form.Item
          className="search-input"
          validateStatus={searchError ? "error" : undefined}
          help={searchErrorMessage}
        >
          <Styled.ProxyFormSearch
            value={searchValue}
            placeholder={counterpart.translate(
              `field.placeholder.search_accounts`
            )}
            onChange={searchChange}
            onPressEnter={() => {
              addProxy(searchedAccount as Account);
            }}
            loading={loading}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Styled.ProxyFormButton
            type="primary"
            onClick={() => addProxy(searchedAccount as Account)}
            disabled={searchError || searchedAccount === undefined}
          >
            {counterpart.translate(`buttons.add`)}
          </Styled.ProxyFormButton>
        </Form.Item>
      </Styled.ProxySearchWrapper>
      <Form.Provider onFormFinish={handleFormFinish}>
        <Styled.ProxyForm
          form={proxyForm}
          name="proxyForm"
          onFinish={showPasswordModal}
          size="large"
          layout={sm ? "horizontal" : "inline"}
        >
          <Form.Item className="publish-btn">
            <Styled.ProxyFormButton
              type="primary"
              htmlType="submit"
              disabled={!isPublishable}
            >
              {counterpart.translate(`buttons.publish_changes`)}
            </Styled.ProxyFormButton>
          </Form.Item>
          <Form.Item>
            <Styled.ProxyFormButton
              disabled={!isPublishable}
              type="link"
              onClick={resetChanges}
            >
              <RedoOutlined rotate={-90} />{" "}
              {counterpart.translate(`buttons.reset_changes`)}
            </Styled.ProxyFormButton>
          </Form.Item>
        </Styled.ProxyForm>
        <PasswordModal
          visible={isPasswordModalVisible}
          onCancel={hidePasswordModal}
          neededKeyType="active"
        />
        <TransactionModal
          visible={isTransactionModalVisible}
          onCancel={hideTransactionModal}
          transactionMessageState={transactionMessageState}
          account={name}
          fee={updateAccountFee}
          transactionType="account_update"
          proxy={proxy}
          memberType="proxy"
        />
      </Form.Provider>
    </>
  );
};
