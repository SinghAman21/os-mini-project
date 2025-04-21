import { Users, CheckCircle } from 'lucide-react';
import type { Task } from '../types';

interface TaskQueueDisplayProps {
  waiting: Task[];
  completed: Task[];
  currentTask?: Task;
}

export function TaskQueueDisplay({ waiting, completed }: TaskQueueDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-zinc-900 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Waiting Queue</h2>
        <div className="flex items-center gap-2 mb-4">
          <Users className="text-white" size={20} />
          <span className="text-gray-300">Tasks waiting: {waiting.length}</span>
        </div>
        <div className="space-y-2">
          {waiting.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-zinc-800 rounded-lg border border-zinc-700"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-white">{task.name}</p>
                <span className="px-2 py-1 bg-white text-black rounded-full text-xs">
                  Priority {task.priority}
                </span>
              </div>
              <div className="text-sm text-gray-300">
                <p>Type: {task.type}</p>
                <p>Estimated time: {task.burstTime}s</p>
                <p className="text-xs opacity-75">
                  Arrived: {task.arrivalTime.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {waiting.length === 0 && (
            <p className="text-gray-300 text-center py-4">No tasks waiting</p>
          )}
        </div>
      </div>

      <div className="bg-zinc-900 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Completed Tasks</h2>
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="text-white" size={20} />
          <span className="text-gray-300">Tasks completed: {completed.length}</span>
        </div>
        <div className="space-y-2">
          {completed.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-zinc-800 rounded-lg border border-zinc-700"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-white">{task.name}</p>
                <span className="px-2 py-1 bg-white text-black rounded-full text-xs">
                  Completed
                </span>
              </div>
              <div className="text-sm text-gray-300">
                <p>Type: {task.type}</p>
                <p>Processing time: {task.burstTime}s</p>
                <p className="text-xs opacity-75">
                  Priority: {task.priority}
                </p>
              </div>
            </div>
          ))}
          {completed.length === 0 && (
            <p className="text-gray-300 text-center py-4">No completed tasks</p>
          )}
        </div>
      </div>
    </div>
  );
}