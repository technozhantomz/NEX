import React, { SetStateAction, useEffect, useRef, useState } from "react";

import { PasswordModal } from "../../../../../common/components/PasswordModal";
import { VoteModalData } from "../../../../../common/types";
import { Modal } from "../../../../../ui/src";
import * as StyledTable from "../VoteTable/VoteTable.styled";
import { IVoteRow } from "../VoteTable/hooks/useVoteTable.types";

import * as Styled from "./VoteForm.styled";

type Props = {
  isChangeTableEmpty: boolean;
  tab: string;
  doAction: (txt: string, tableRow?: IVoteRow, tab?: string) => Promise<void>;
  doSearch: (searchInput: string) => void;
  modalData: VoteModalData;
  isModalVisible: boolean;
  setIsModalVisible: (value: SetStateAction<boolean>) => void;
  isPassModalVisible: boolean;
  setIsPassModalVisible: (value: SetStateAction<boolean>) => void;
  sendVotes: (password: string) => Promise<void>;
};

export const VoteForm = ({
  isChangeTableEmpty,
  tab,
  doAction,
  doSearch,
  modalData,
  isModalVisible,
  setIsModalVisible,
  isPassModalVisible,
  setIsPassModalVisible,
  sendVotes,
}: Props): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>("");
  //const [, updateState] = useState();
  //const forceUpdate = useCallback(() => updateState({}), []);
  const modalDataSource = useRef<any[]>([]);
  useEffect(() => {
    doSearch(searchValue);
  }, [searchValue]);
  useEffect(() => {
    if (tab === "Proxy") {
      modalDataSource.current = [
        {
          key: "1",
          colName: "Account Name",
          colData: modalData.account,
        },
        {
          key: "2",
          colName: "Proxy Voting Account",
          colData: modalData.proxy,
        },
        {
          key: "3",
          colName: `Desired # of ${tab}`,
          colData: modalData.candidateCount,
        },
        {
          key: "4",
          colName: "Fee",
          colData: `${modalData.fee} PPY`,
        },
      ];
    } else {
      modalDataSource.current = [
        {
          key: "1",
          colName: "Account Name",
          colData: modalData.account,
        },
        {
          key: "2",
          colName: `Desired # of ${tab}`,
          colData: modalData.candidateCount,
        },
        {
          key: "3",
          colName: "Fee",
          colData: `${modalData.fee} PPY`,
        },
      ];
    }
  }, [modalData]);
  return (
    <>
      <Styled.Title>Vote for {tab}</Styled.Title>
      <a href="#">
        <Styled.Info />
        <Styled.DetailsLink>See details here</Styled.DetailsLink>
      </a>
      <Styled.FormContainer>
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
      >
        <PasswordModal
          visible={isPassModalVisible}
          onCancel={() => {
            setIsPassModalVisible(false);
          }}
        />
      </Styled.Form.Provider>
    </>
  );
};
