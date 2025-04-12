import React, { useState } from 'react';
import { Plane } from 'lucide-react';
import type { Passenger } from '../types';

interface CheckInFormProps {
  onCheckIn: (passenger: Omit<Passenger, 'id' | 'checkInTime' | 'status'>) => void;
}

export function CheckInForm({ onCheckIn }: CheckInFormProps) {
  const [name, setName] = useState('');
  const [ticketClass, setTicketClass] = useState<'first' | 'business' | 'normal'>('normal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckIn({
      name,
      ticketClass,
    });
    setName('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Plane className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Passenger Check-In</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Passenger Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="ticketClass" className="block text-sm font-medium text-gray-700 mb-1">
            Ticket Class
          </label>
          <select
            id="ticketClass"
            value={ticketClass}
            onChange={(e) => setTicketClass(e.target.value as 'first' | 'business' | 'normal')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="first">First Class</option>
            <option value="business">Business Class</option>
            <option value="normal">Normal Class</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Check In
        </button>
      </form>
    </div>
  );
}