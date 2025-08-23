import { Thread, Dashboard, User } from "../types";

export const USER: User = { id: 1, name: "You" };
export const AI: User = { id: 2, name: "Lattice AI" };

export const MOCK_THREADS: Thread[] = [
  {
    id: "thread-1",
    title: "Brainstorming Session",
    messages: [
      {
        id: "msg-1",
        text: "Hi, let's brainstorm some ideas for a new mobile app.",
        user: USER,
        timestamp: Date.now() - 10000,
      },
      {
        id: "msg-2",
        text: "Of course! I can help with that. What industry are you targeting?",
        user: AI,
        timestamp: Date.now() - 9000,
      },
    ],
  },
  {
    id: "thread-2",
    title: "Q3 Marketing Plan",
    messages: [
      {
        id: "msg-3",
        text: "What are the key components of our Q3 marketing plan?",
        user: USER,
        timestamp: Date.now() - 5000,
      },
    ],
  },
];

export const MOCK_DASHBOARDS: Dashboard[] = [
  {
    id: "dash-1",
    name: "User Engagement",
    widgets: [
      {
        id: "widget-1",
        title: "Daily Active Users",
        chartData: [
          { value: 50, label: "Mon" },
          { value: 80, label: "Tue" },
          { value: 90, label: "Wed" },
          { value: 70, label: "Thu" },
        ],
      },
      {
        id: "widget-2",
        title: "Session Duration (min)",
        chartData: [
          { value: 20, label: "Mon" },
          { value: 45, label: "Tue" },
          { value: 30, label: "Wed" },
          { value: 60, label: "Thu" },
        ],
      },
    ],
  },
];

export const SIMULATED_AI_RESPONSES: string[] = [
  "That's an interesting point. Could you elaborate further?",
  "I agree. Building on that, we could also consider...",
  "Let me process that. Here is a summary of what I found:",
  "Excellent question. The data suggests the following approach:",
];
