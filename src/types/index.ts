export interface User {
  id: number;
  name: string;
}

export interface Message {
  id: string;
  text: string;
  user: User;
  timestamp: number;
}

export interface Thread {
  id: string;
  title: string;
  messages: Message[];
}

export interface Widget {
  id: string;
  title: string;
  chartData: { value: number; label?: string }[];
}

export interface Dashboard {
  id: string;
  name: string;
  widgets: Widget[];
}
