import counterpart from "counterpart";

import { Tooltip } from "../../../ui/src";
import { CopyIcon } from "../../../ui/src/icons";

import * as Styled from "./CopyButton.styled";
import { useCopyButton } from "./hooks";

type Props = {
  buttonText?: string;
  copyValue: string;
  className?: string;
};

export const CopyButton = ({
  buttonText,
  copyValue,
  className,
}: Props): JSX.Element => {
  const { copied, handleClick } = useCopyButton();

  return (
    <span className={className}>
      {buttonText && buttonText !== "" ? (
        !copied ? (
          <Tooltip
            placement="top"
            title={`${counterpart.translate(`tooltips.copy`)}`}
          >
            <Styled.TextButton
              type="link"
              onClick={() => handleClick(copyValue)}
            >
              {`${buttonText} `} <CopyIcon />
            </Styled.TextButton>
          </Tooltip>
        ) : (
          <Tooltip
            placement="top"
            title={`${counterpart.translate(`tooltips.copied`)}`}
          >
            <Styled.TextButton
              type="link"
              onClick={() => handleClick(copyValue)}
            >
              {`${buttonText} `} <Styled.Check />
            </Styled.TextButton>
          </Tooltip>
        )
      ) : !copied ? (
        <Tooltip
          placement="top"
          title={`${counterpart.translate(`tooltips.copy`)}`}
        >
          <CopyIcon onClick={() => handleClick(copyValue)} />
        </Tooltip>
      ) : (
        <Tooltip
          placement="top"
          title={`${counterpart.translate(`tooltips.copied`)}`}
        >
          <Styled.Check />
        </Tooltip>
      )}
    </span>
  );
};
