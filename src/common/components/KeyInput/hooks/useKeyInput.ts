import { useState } from "react";

import { UseKeyInputResult } from "./useKeyInput.ts.types";

export function useKeyInput(): UseKeyInputResult {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return {
    isVisible,
    toggleVisibility,
  };
}
