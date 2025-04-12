export type TaskType = 'check-in' | 'booking' | 'inquiry' | 'baggage' | 'assistance';
export type TaskStatus = 'waiting' | 'running' | 'completed';

export interface Task {
  id: string;
  name: string;
  type: TaskType;
  arrivalTime: Date;
  burstTime: number; // in seconds
  priority: number; // 1-5, lower number = higher priority
  remainingTime: number;
  status: TaskStatus;
}

export interface TaskQueue {
  waiting: Task[];
  completed: Task[];
}