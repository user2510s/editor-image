import { useState } from "react";
import DEFAULT_PARAMS from "../constants/defaultParams";
import PRESETS, { type PresetKey } from "../constants/presets";

export function ActivePreset() {
  const [activePreset, setActivePreset] = useState<PresetKey | null>(null);

  const [params, setParams] = useState(DEFAULT_PARAMS);

  const updateParam = <K extends keyof typeof DEFAULT_PARAMS>(
    key: K,
    value: (typeof DEFAULT_PARAMS)[K],
  ) => {
    setActivePreset(null);
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const applyPreset = (presetKey: PresetKey) => {
    setActivePreset(presetKey);

    setParams((prev) => ({
      ...prev,
      ...PRESETS[presetKey],
    }));
  };

  const resetParams = () => {
    setActivePreset(null);
    setParams(DEFAULT_PARAMS);
  };

  return {
    resetParams,
    applyPreset,
    updateParam,
    activePreset,
    params,
  };
}
