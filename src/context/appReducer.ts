import { Thread, Dashboard, Message, Widget } from "../types";
import { SIMULATED_AI_RESPONSES, AI } from "../api/mockData";

export interface AppState {
  threads: Thread[];
  activeThreadId: string | null;
  dashboards: Dashboard[];
  activeDashboardId: string | null;
}

export type Action =
  | { type: "SWITCH_THREAD"; payload: string }
  | {
      type: "ADD_MESSAGE";
      payload: { text: string; user: { id: number; name: string } };
    }
  | { type: "DELETE_THREAD"; payload: string }
  | {
      type: "EDIT_THREAD_TITLE";
      payload: { threadId: string; newTitle: string };
    }
  | { type: "SWITCH_DASHBOARD"; payload: string }
  | { type: "ADD_DASHBOARD"; payload: string }
  | { type: "DELETE_DASHBOARD"; payload: string }
  | { type: "ADD_WIDGET" }
  | { type: "DELETE_WIDGET"; payload: string };

export const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SWITCH_THREAD":
      return { ...state, activeThreadId: action.payload };

    case "ADD_MESSAGE": {
      const activeThread = state.threads.find(
        (t) => t.id === state.activeThreadId
      );
      if (!activeThread) return state;

      const newUserMessage: Message = {
        id: `msg-${Date.now()}`,
        ...action.payload,
        timestamp: Date.now(),
      };

      const aiResponse: Message = {
        id: `msg-${Date.now() + 1}`,
        text: SIMULATED_AI_RESPONSES[
          Math.floor(Math.random() * SIMULATED_AI_RESPONSES.length)
        ],
        user: AI,
        timestamp: Date.now() + 1,
      };

      const updatedThreads = state.threads.map((thread) =>
        thread.id === state.activeThreadId
          ? {
              ...thread,
              messages: [...thread.messages, newUserMessage, aiResponse],
            }
          : thread
      );

      return { ...state, threads: updatedThreads };
    }

    case "DELETE_THREAD": {
      const remainingThreads = state.threads.filter(
        (t) => t.id !== action.payload
      );
      const newActiveThreadId =
        state.activeThreadId === action.payload
          ? remainingThreads.length > 0
            ? remainingThreads[0].id
            : null
          : state.activeThreadId;
      return {
        ...state,
        threads: remainingThreads,
        activeThreadId: newActiveThreadId,
      };
    }

    case "EDIT_THREAD_TITLE": {
      const updatedThreads = state.threads.map((t) =>
        t.id === action.payload.threadId
          ? { ...t, title: action.payload.newTitle }
          : t
      );
      return { ...state, threads: updatedThreads };
    }

    case "SWITCH_DASHBOARD":
      return { ...state, activeDashboardId: action.payload };

    case "ADD_DASHBOARD": {
      const newDashboard: Dashboard = {
        id: `dash-${Date.now()}`,
        name: action.payload,
        widgets: [],
      };
      return {
        ...state,
        dashboards: [...state.dashboards, newDashboard],
        activeDashboardId: newDashboard.id,
      };
    }

    case "DELETE_DASHBOARD": {
      const remainingDashboards = state.dashboards.filter(
        (d) => d.id !== action.payload
      );
      const newActiveDashboardId =
        state.activeDashboardId === action.payload
          ? remainingDashboards.length > 0
            ? remainingDashboards[0].id
            : null
          : state.activeDashboardId;
      return {
        ...state,
        dashboards: remainingDashboards,
        activeDashboardId: newActiveDashboardId,
      };
    }

    case "ADD_WIDGET": {
      if (!state.activeDashboardId) return state;
      const newWidget: Widget = {
        id: `widget-${Date.now()}`,
        title: "New Metric",
        chartData: [{ value: 10 }, { value: 30 }, { value: 20 }, { value: 50 }],
      };
      const updatedDashboards = state.dashboards.map((d) =>
        d.id === state.activeDashboardId
          ? { ...d, widgets: [...d.widgets, newWidget] }
          : d
      );
      return { ...state, dashboards: updatedDashboards };
    }

    case "DELETE_WIDGET": {
      if (!state.activeDashboardId) return state;
      const updatedDashboards = state.dashboards.map((d) =>
        d.id === state.activeDashboardId
          ? { ...d, widgets: d.widgets.filter((w) => w.id !== action.payload) }
          : d
      );
      return { ...state, dashboards: updatedDashboards };
    }

    default:
      return state;
  }
};
