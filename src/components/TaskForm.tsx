import React, { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import type { Task, TaskType } from '../types';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'arrivalTime' | 'status' | 'remainingTime'>) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<TaskType>('check-in');
  const [burstTime, setBurstTime] = useState(30);
  const [priority, setPriority] = useState(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      type,
      burstTime,
      priority,
    });
    setName('');
    setType('check-in');
    setBurstTime(30);
    setPriority(4);
  };

  return (
    <div className="bg-zinc-900 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardList className="text-white" size={24} />
        <h2 className="text-2xl font-bold text-white">New Task</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Passenger Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-2 focus:ring-white text-white placeholder-gray-400"
            required
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
            Task Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as TaskType)}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-2 focus:ring-white text-white"
          >
            <option value="check-in">Check-in</option>
            <option value="booking">Ticket Booking</option>
            <option value="inquiry">Flight Inquiry</option>
            <option value="baggage">Baggage Services</option>
            <option value="assistance">Special Assistance</option>
          </select>
        </div>

        <div>
          <label htmlFor="burstTime" className="block text-sm font-medium text-gray-300 mb-1">
            Estimated Time (seconds)
          </label>
          <input
            type="number"
            id="burstTime"
            min="10"
            max="300"
            value={burstTime}
            onChange={(e) => setBurstTime(Number(e.target.value))}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-2 focus:ring-white text-white"
          />
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-1">
            Passenger Class
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-2 focus:ring-white text-white"
          >
            <option value="1">First Class</option>
            <option value="2">Business Class</option>
            <option value="3">Premium Economy</option>
            <option value="4">Economy</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-zinc-800 text-white py-2 px-4 rounded-md hover:bg-white hover:text-black transition-colors border border-zinc-700"
        >
          Add Passenger
        </button>
      </form>
    </div>
  );
}