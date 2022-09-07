import { GeneratedKey } from "../../../common/types";
import { EyeInvisibleOutlined, EyeOutlined } from "../../../ui/src";
import { CopyButton } from "../../components";

import * as Styled from "./CopyAndShowHideInput.styled";
import { useCopyAndShowHideInput } from "./hooks";

type Props = {
  inputValue: GeneratedKey;
};

export const CopyAndShowHideInput = ({ inputValue }: Props): JSX.Element => {
  const { isVisible, handleVisible } = useCopyAndShowHideInput();

  return (
    <div>
      <Styled.GeneratedKeyInput
        value={inputValue.key}
        type={isVisible ? "password" : "text"}
        suffix={
          <div>
            <CopyButton copyValue={`${inputValue.key}`}></CopyButton>
            {isVisible ? (
              <EyeInvisibleOutlined onClick={handleVisible} />
            ) : (
              <EyeOutlined onClick={handleVisible} />
            )}
          </div>
        }
      />
    </div>
  );
};
