import React from 'react';
import { UserCheck } from 'lucide-react';
import type { Passenger, Queue } from '../types';

interface ReceptionistDashboardProps {
  queue: Queue;
  onServeNext: (ticketClass: keyof Queue) => void;
}

export function ReceptionistDashboard({ queue, onServeNext }: ReceptionistDashboardProps) {
  const getTotalWaiting = () => {
    return queue.first.length + queue.business.length + queue.normal.length;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <UserCheck className="text-purple-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Receptionist Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['first', 'business', 'normal'] as const).map((classType) => (
          <div key={classType} className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3 capitalize">{classType} Class</h3>
            <p className="text-gray-600 mb-4">Waiting: {queue[classType].length}</p>
            <button
              onClick={() => onServeNext(classType)}
              disabled={queue[classType].length === 0}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-300"
            >
              Serve Next
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Queue Summary</h3>
        <p className="text-gray-600">Total passengers waiting: {getTotalWaiting()}</p>
      </div>
    </div>
  );
}