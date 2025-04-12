import React from 'react';
import { Clock, Users } from 'lucide-react';
import type { Passenger } from '../types';

interface QueueDisplayProps {
  title: string;
  queue: Passenger[];
  currentlyServing?: Passenger;
}

export function QueueDisplay({ title, queue, currentlyServing }: QueueDisplayProps) {
  const estimatedWaitTime = queue.length * 30; // 30 seconds per passenger

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      
      {currentlyServing && (
        <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-700">Currently Serving</h3>
          <p className="text-green-600">{currentlyServing.name}</p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full animate-[progress_30s_linear]"></div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mb-4">
        <Users className="text-gray-500" size={20} />
        <span className="text-gray-600">Passengers in queue: {queue.length}</span>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Clock className="text-gray-500" size={20} />
        <span className="text-gray-600">Estimated wait: {estimatedWaitTime} seconds</span>
      </div>

      <div className="space-y-2">
        {queue.map((passenger, index) => (
          <div
            key={passenger.id}
            className="p-3 bg-gray-50 rounded border border-gray-200 flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-gray-800">{passenger.name}</p>
              <p className="text-sm text-gray-500">
                Checked in: {passenger.checkInTime.toLocaleTimeString()}
              </p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {passenger.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}