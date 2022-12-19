import { useState } from "react";

import { useAppSettingsContext } from "../../../../../../providers";
import { Settings } from "../../../../../../types";

import { UseAdvancedModeResult } from "./useAdvancedMode.types";

export function useAdvancedMode(): UseAdvancedModeResult {
  const { settings, setSettings } = useAppSettingsContext();
  const [advancedMode, setAdvancedMode] = useState<boolean>(
    settings?.advancedMode
  );

  const handleAdvancedModeChange = (checked: boolean): void => {
    setAdvancedMode(checked);
    const newSettings: Settings = {
      ...settings,
      advancedMode: checked,
    };
    setSettings(newSettings);
  };

  return {
    advancedMode,
    handleAdvancedModeChange,
  };
}
