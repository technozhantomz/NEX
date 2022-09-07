import { useState } from "react";

import { UseCopyAndShowHideInputResult } from "./useCopyAndShowHideInput.ts.types";

export function useCopyAndShowHideInput(): UseCopyAndShowHideInputResult {
  const [isVisible, setIsVisible] = useState(true);

  const handleVisible = () => {
    setIsVisible(!isVisible);
  };

  return {
    isVisible,
    handleVisible,
  };
}
