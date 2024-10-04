import { useContext, useEffect, useState } from "react";
import { TertiusAxisContext } from "../contexts/TertiusAxisContext";
import { EventType, StateMode } from "../../engine";

export const useTertiusAxis = (mode: StateMode) => {
  const editor = useContext(TertiusAxisContext);
  const [stateValue, setStateValue] = useState<EventType["data"] | null>(null);

  const changeAppState = (mode: StateMode, data: EventType["data"]) => {
    editor?.state.changeAppState(mode, data);
  };

  useEffect(() => {
    const onStateChange = (evt: EventType["data"]) => {
      setStateValue(evt);
    };
    editor?.state.onEvent(mode, onStateChange);

    return () => {
      editor?.state.removelistener(mode, onStateChange);
    };
  }, [editor]);

  return { changeAppState, stateValue };
};
