import { CopyButton } from "..";
import { EyeInvisibleOutlined, EyeOutlined } from "../../../ui/src";

import * as Styled from "./KeyInput.styled";
import { useKeyInput } from "./hooks";

type Props = {
  keyValue: string;
  className?: string;
};

export const KeyInput = ({ keyValue, className }: Props): JSX.Element => {
  const { isVisible, toggleVisibility } = useKeyInput();

  return (
    <div>
      <Styled.KeyInput
        className={className}
        value={keyValue}
        type={!isVisible ? "password" : "text"}
        suffix={
          <div>
            <CopyButton copyValue={`${keyValue}`}></CopyButton>
            {!isVisible ? (
              <EyeInvisibleOutlined onClick={toggleVisibility} />
            ) : (
              <EyeOutlined onClick={toggleVisibility} />
            )}
          </div>
        }
      />
    </div>
  );
};
