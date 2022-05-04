import { capitalize } from "lodash";
import { SetStateAction } from "react";

import { PasswordModal } from "../../../../../common/components";

import * as Styled from "./VoteForm.styled";

type Props = {
  tab: string;
  loading: boolean;
  isVotesChanged: boolean;
  isPassModalVisible: boolean;
  submittingPassword: boolean;
  resetChanges: () => void;
  confirm: () => void;
  publishChanges: (name: string, info: { values: any; forms: any }) => void;
  handleVoteSearch: (name: string) => void;
  setIsPassModalVisible: (value: SetStateAction<boolean>) => void;
  // isChangeTableEmpty: boolean;
  // doAction: (txt: string, tableRow?: IVoteRow, tab?: string) => Promise<void>;
  // doSearch: (searchInput: string) => void;
  // modalData: VoteModalData;
  // isModalVisible: boolean;
  // setIsModalVisible: (value: SetStateAction<boolean>) => void;
  // sendVotes: (password: string) => Promise<void>;
};

export const VoteForm = ({
  tab,
  loading,
  isVotesChanged,
  isPassModalVisible,
  submittingPassword,
  resetChanges,
  confirm,
  publishChanges,
  handleVoteSearch,
  setIsPassModalVisible,
}: // isChangeTableEmpty,
Props): JSX.Element => {
  // const [searchValue, setSearchValue] = useState<string>("");
  // //const [, updateState] = useState();
  // //const forceUpdate = useCallback(() => updateState({}), []);
  // const modalDataSource = useRef<any[]>([]);
  // useEffect(() => {
  //   doSearch(searchValue);
  // }, [searchValue]);
  // useEffect(() => {
  //   if (tab === "Proxy") {
  //     modalDataSource.current = [
  //       {
  //         key: "1",
  //         colName: "Account Name",
  //         colData: modalData.account,
  //       },
  //       {
  //         key: "2",
  //         colName: "Proxy Voting Account",
  //         colData: modalData.proxy,
  //       },
  //       {
  //         key: "3",
  //         colName: `Desired # of ${tab}`,
  //         colData: modalData.candidateCount,
  //       },
  //       {
  //         key: "4",
  //         colName: "Fee",
  //         colData: `${modalData.fee} PPY`,
  //       },
  //     ];
  //   } else {
  //     modalDataSource.current = [
  //       {
  //         key: "1",
  //         colName: "Account Name",
  //         colData: modalData.account,
  //       },
  //       {
  //         key: "2",
  //         colName: `Desired # of ${tab}`,
  //         colData: modalData.candidateCount,
  //       },
  //       {
  //         key: "3",
  //         colName: "Fee",
  //         colData: `${modalData.fee} PPY`,
  //       },
  //     ];
  //   }
  // }, [modalData]);
  return (
    <>
      <Styled.Title>Vote for {capitalize(tab)}</Styled.Title>
      <Styled.VoteSearch
        size="large"
        placeholder="Search account"
        onSearch={handleVoteSearch}
        loading={loading}
      />
      <Styled.VoteForm.Provider onFormFinish={publishChanges}>
        <Styled.VoteForm
          //form={membershipForm}
          name="voteForm"
          onFinish={confirm}
        >
          {/* <MembershipModal
            visible={isMembershipModalVisible}
            onCancel={handleMembershipModalCancel}
            handleOk={handleMembershipModalConfirm}
            transactionErrorMessage={transactionErrorMessage}
            transactionSuccessMessage={transactionSuccessMessage}
            loadingTransaction={loadingTransaction}
            account={name}
            fee={membershipPrice}
          /> */}
          <Styled.ActionsContainer>
            {!isVotesChanged ? (
              <Styled.CardFormLinkButtonDisabled>
                <Styled.Reset />
                Reset Changes
              </Styled.CardFormLinkButtonDisabled>
            ) : (
              <Styled.CardFormLinkButton
                onClick={() => {
                  resetChanges();
                }}
              >
                <Styled.Reset />
                Reset Changes
              </Styled.CardFormLinkButton>
            )}
            <Styled.Publish
              type="primary"
              htmlType="submit"
              disabled={!isVotesChanged}
            >
              Publish Changes
            </Styled.Publish>
          </Styled.ActionsContainer>
          {/* <PasswordModal
            visible={isPassModalVisible}
            onCancel={handlePasswordModalCancel}
            submitting={false}
          /> */}
        </Styled.VoteForm>
      </Styled.VoteForm.Provider>
      {/* <Styled.FormContainer>
        <Styled.Form>
          <Styled.Row>
            <Styled.FormItemRow1 name="search">
              <Styled.OverlapContainer>
                <Styled.InputText
                  type="text"
                  placeholder="Search accounts"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Styled.Search id="searchicon" />
                {searchValue === "" ? (
                  ``
                ) : (
                  <Styled.ClearButton
                    title="Clear search"
                    onClick={() => setSearchValue("")}
                  >
                    Clear search
                  </Styled.ClearButton>
                )}
              </Styled.OverlapContainer>
            </Styled.FormItemRow1>
          </Styled.Row>
          <Styled.Row>
            <Styled.FormItemRow2 name="reset">
              {isChangeTableEmpty ? (
                <Styled.CardFormLinkButtonDisabled>
                  <Styled.Reset />
                  Reset Changes
                </Styled.CardFormLinkButtonDisabled>
              ) : (
                <Styled.CardFormLinkButton onClick={() => doAction("RESET")}>
                  <Styled.Reset />
                  Reset Changes
                </Styled.CardFormLinkButton>
              )}
            </Styled.FormItemRow2>
            <Styled.FormItemRow2 name="publish">
              <Styled.CardFormButton
                disabled={isChangeTableEmpty}
                onClick={() => doAction("PUBLISH", undefined, tab)}
              >
                Publish Changes
              </Styled.CardFormButton>
            </Styled.FormItemRow2>
          </Styled.Row>
        </Styled.Form>
      </Styled.FormContainer>
      <Modal
        title={"Confirm Transaction"}
        visible={isModalVisible}
        okText={"CONFIRM"}
        cancelText={"CANCEL"}
        onOk={() => {
          setIsPassModalVisible(true);
          setIsModalVisible(false);
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        <StyledTable.VoteTable
          title={() => "UPDATE ACCOUNT"}
          pagination={false}
          columns={[
            {
              dataIndex: "colName",
            },
            {
              dataIndex: "colData",
            },
          ]}
          dataSource={modalDataSource.current}
        />
      </Modal>
      <Styled.Form.Provider
        onFormFinish={(name: string, info: { values: any; forms: any }) => {
          const { values, forms } = info;
          const { passwordModal } = forms;
          if (name === "passwordModal") {
            passwordModal.validateFields().then(() => {
              sendVotes(values.password);
            });
          }
        }}
      > */}
      <PasswordModal
        visible={isPassModalVisible}
        onCancel={() => {
          setIsPassModalVisible(false);
        }}
        submitting={submittingPassword}
      />
      {/* </Styled.Form.Provider> */}
    </>
  );
};
