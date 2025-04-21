import { useState, useEffect, useCallback } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskQueueDisplay } from './components/TaskQueueDisplay';
import { GanttChart } from './components/GanttChart';
import { LandingPage } from './components/LandingPage';
import type { Task, TaskQueue } from './types';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [taskQueue, setTaskQueue] = useState<TaskQueue>({
    waiting: [],
    completed: [],
  });
  const [currentTask, setCurrentTask] = useState<Task | undefined>();
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddTask = (taskData: Omit<Task, 'id' | 'arrivalTime' | 'status' | 'remainingTime'>) => {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      arrivalTime: new Date(),
      status: 'waiting',
      remainingTime: taskData.burstTime,
    };

    setTaskQueue((prev) => ({
      ...prev,
      waiting: [...prev.waiting, newTask].sort((a, b) => a.priority - b.priority),
    }));
  };

  const processNextTask = useCallback(() => {
    if (taskQueue.waiting.length === 0 || currentTask) return;

    const nextTask = taskQueue.waiting[0];
    const remainingTasks = taskQueue.waiting.slice(1);

    setTaskQueue((prev) => ({
      ...prev,
      waiting: remainingTasks,
    }));

    setCurrentTask({ ...nextTask, status: 'running' });
    setTimer(nextTask.burstTime);
  }, [taskQueue.waiting, currentTask]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (currentTask && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCurrentTask((current) => {
              if (current) {
                setTaskQueue((prev) => ({
                  ...prev,
                  completed: [...prev.completed, { ...current, status: 'completed' }],
                }));
              }
              return undefined;
            });
            processNextTask();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentTask, timer, processNextTask]);

  useEffect(() => {
    if (!currentTask && taskQueue.waiting.length > 0) {
      processNextTask();
    }
  }, [currentTask, taskQueue.waiting, processNextTask]);

  if (showLanding) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
           Airline Check-Ins with Priority 

        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <TaskForm onSubmit={handleAddTask} />
          
          <div className="space-y-8">
            <div className="bg-zinc-900 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-white">Current Task</h2>
              {currentTask ? (
                <div className="mb-6 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                  <h3 className="font-semibold text-white">Now Processing</h3>
                  <p className="text-white">{currentTask.name}</p>
                  <p className="text-sm text-gray-300">
                    Type: {currentTask.type} | Priority: {currentTask.priority}
                  </p>
                  <div className="mt-2">
                    <div className="w-full bg-black rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(timer / currentTask.burstTime) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-300 mt-1">Time remaining: {timer}s</p>
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                  <p className="text-gray-300">No task currently being processed</p>
                </div>
              )}
            </div>

            <GanttChart tasks={[...taskQueue.completed, ...(currentTask ? [currentTask] : [])]} />
          </div>
        </div>

        <TaskQueueDisplay
          waiting={taskQueue.waiting}
          completed={taskQueue.completed}
          currentTask={currentTask}
        />
      </div>
    </div>
  );
}

export default App;