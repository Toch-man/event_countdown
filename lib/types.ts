export interface Count_down {
  id: string;
  name: string;
  date: string;
  description?: string;
  createdAt: string;
}

export interface Time_Left {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}
