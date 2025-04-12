import type { Task } from '../types';

interface GanttChartProps {
  tasks: Task[];
}

export function GanttChart({ tasks }: GanttChartProps) {
  if (tasks.length === 0) return null;

  const startTime = Math.min(...tasks.map(t => t.arrivalTime.getTime()));
  const endTime = Date.now();
  const totalDuration = endTime - startTime;

  return (
    <div className="bg-zinc-900 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Task Timeline</h2>
      <div className="space-y-2">
        {tasks.map((task) => {
          const start = ((task.arrivalTime.getTime() - startTime) / totalDuration) * 100;
          const width = (task.burstTime / (totalDuration / 1000)) * 100;
          
          return (
            <div key={task.id} className="relative h-8">
              <div className="absolute inset-y-0 bg-zinc-800 w-full rounded" />
              <div
                className={`absolute inset-y-0 rounded ${
                  task.status === 'completed' ? 'bg-white' :
                  task.status === 'running' ? 'bg-gray-400' :
                  'bg-gray-600'
                }`}
                style={{
                  left: `${Math.min(Math.max(start, 0), 100)}%`,
                  width: `${Math.min(width, 100 - start)}%`,
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-black">
                  {task.name} (P{task.priority})
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-sm text-gray-300">
        <span>{new Date(startTime).toLocaleTimeString()}</span>
        <span>{new Date(endTime).toLocaleTimeString()}</span>
      </div>
    </div>
  );
}