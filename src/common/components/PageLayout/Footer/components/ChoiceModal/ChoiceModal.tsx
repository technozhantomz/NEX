import counterpart from "counterpart";
import React, { useCallback } from "react";

import { CardFormButton } from "../../../../../../ui/src";

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
      }, 800);
      callback();
    },
    [hideModal]
  );

  choices.forEach((choice, key) => {
    footer.push(
      <CardFormButton
        type="primary"
        key={key}
        onClick={(event) => {
          confirmClicked(choice.callback, event);
        }}
      >
        {counterpart.translate(choice.translationKey)}
      </CardFormButton>
    );
  });

  footer.push(
    <CardFormButton key="cancel" className="cancel" onClick={hideModal}>
      {counterpart.translate("pages.modal.cancel")}
    </CardFormButton>
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
      {content && <div>{content}</div>}
    </Styled.ChoiceModal>
  );
};
