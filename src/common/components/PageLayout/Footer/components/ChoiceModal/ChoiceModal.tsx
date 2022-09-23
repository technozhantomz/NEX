import counterpart from "counterpart";
import React, { useCallback } from "react";

import { Button } from "../../../../../../ui/src";

import * as Styled from "./ChoiceModal.styled";

type ChoiceType = {
  translationKey: string;
  callback: () => void;
};

type Props = {
  content: React.ReactNode | React.ReactNode[];
  choices: ChoiceType[];
  visible: boolean;
  hideModal: () => void;
};

export const ChoiceModal = ({
  content,
  choices,
  visible,
  hideModal,
}: Props): JSX.Element => {
  const footer: React.ReactNode[] = [];

  const confirmClicked = useCallback(
    (callback: () => void, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setTimeout(() => {
        hideModal();
      }, 500);
      callback();
    },
    [hideModal]
  );

  choices.map((choice, key) => {
    footer.push(
      <Button
        type="primary"
        key={key}
        onClick={(event) => {
          confirmClicked(choice.callback, event);
        }}
      >
        {counterpart.translate(choice.translationKey)}
      </Button>
    );
  });

  footer.push(
    <Button key="cancel" onClick={hideModal}>
      {counterpart.translate("pages.modal.cancel")}
    </Button>
  );

  return (
    <Styled.ChoiceModal
      width={600}
      title={counterpart.translate("connection.title_out_of_sync")}
      visible={visible}
      onCancel={hideModal}
      footer={footer}
      centered={true}
    >
      <div>{content && content}</div>
    </Styled.ChoiceModal>
  );
};
