import React, {
  createContext,
  useReducer,
  Dispatch,
  useContext,
  ReactNode,
} from "react";
import { AppState, Action, appReducer } from "./appReducer";
import { MOCK_THREADS, MOCK_DASHBOARDS } from "../api/mockData";

const initialState: AppState = {
  threads: MOCK_THREADS,
  activeThreadId: MOCK_THREADS.length > 0 ? MOCK_THREADS[0].id : null,
  dashboards: MOCK_DASHBOARDS,
  activeDashboardId: MOCK_DASHBOARDS.length > 0 ? MOCK_DASHBOARDS[0].id : null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
