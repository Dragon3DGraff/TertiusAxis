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
    const onStateChange = (evt: EventType) => {
      if (evt.mode === mode) {
        setStateValue(evt.data);
        console.log(evt);
      }
    };
    editor?.state.onEvent("appStateChanged", onStateChange);

    return () => {
      editor?.state.removelistener("appStateChanged", onStateChange);
    };
  }, [editor]);

  return { changeAppState, stateValue };
};
