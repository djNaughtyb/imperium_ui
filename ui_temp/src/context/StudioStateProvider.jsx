import React, { createContext, useReducer, useMemo, useContext } from "react";

const initialState = {
  mode: "IDLE",
  activePanel: null,
  activeCharacter: null,
  overlay: null,
  transitioning: false,
  payload: null,
  vrEnabled: false,
  merchMode: false,
  enterpriseMode: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.mode, payload: action.payload || null };
    case "SET_PANEL":
      return { ...state, activePanel: action.panel };
    case "SET_CHARACTER":
      return { ...state, activeCharacter: action.character };
    case "SET_OVERLAY":
      return { ...state, overlay: action.overlay };
    case "START_TRANSITION":
      return { ...state, transitioning: true };
    case "END_TRANSITION":
      return { ...state, transitioning: false };
    case "AGENT_OVERRIDE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const StudioStateContext = createContext();

export function StudioStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const api = useMemo(
    () => ({
      studioState: state.mode,
      activePanel: state.activePanel,
      activeCharacter: state.activeCharacter,
      overlay: state.overlay,
      transitioning: state.transitioning,
      payload: state.payload,
      setMode: (mode, payload) => dispatch({ type: "SET_MODE", mode, payload }),
      setPanel: (panel) => dispatch({ type: "SET_PANEL", panel }),
      setCharacter: (character) =>
        dispatch({ type: "SET_CHARACTER", character }),
      setOverlay: (overlay) => dispatch({ type: "SET_OVERLAY", overlay }),
      startTransition: () => dispatch({ type: "START_TRANSITION" }),
      endTransition: () => dispatch({ type: "END_TRANSITION" }),
      agentOverride: (payload) =>
        dispatch({ type: "AGENT_OVERRIDE", payload }),
    }),
    [state]
  );

  return (
    <StudioStateContext.Provider value={api}>
      {children}
    </StudioStateContext.Provider>
  );
}

export const useStudioState = () => useContext(StudioStateContext);