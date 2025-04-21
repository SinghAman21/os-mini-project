import React from 'react';
import { Plane, Users, Clock, CheckCircle } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="text-center text-white p-8 max-w-4xl mx-auto relative">
        <div className="mb-8 flex justify-center">
          <Plane className="h-20 w-20 animate-[fly_2s_ease-in-out_infinite] text-white" />
        </div>
        <h1 className="text-5xl font-bold mb-6 animate-[slideDown_1s_ease-out]">
          Welcome to Airline Check-Ins with Priority 

        </h1>
        <p className="text-xl mb-12 text-gray-300 animate-[fadeIn_2s_ease-out]">
          Streamlining passenger processing with intelligent priority scheduling
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-zinc-900 backdrop-blur-lg rounded-lg p-6 animate-[slideUp_1s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex justify-center mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Priority Classes</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>1. First Class</li>
              <li>2. Business Class</li>
              <li>3. Premium Economy</li>
              <li>4. Economy</li>
            </ul>
          </div>
          
          <div className="bg-zinc-900 backdrop-blur-lg rounded-lg p-6 animate-[slideUp_1s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex justify-center mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Real-time Processing</h3>
            <p className="text-sm text-gray-300">
              Efficient queue management with priority-based scheduling
            </p>
          </div>
          
          <div className="bg-zinc-900 backdrop-blur-lg rounded-lg p-6 animate-[slideUp_1s_ease-out_0.9s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Smart Allocation</h3>
            <p className="text-sm text-gray-300">
              Automated task distribution based on passenger class priority
            </p>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl opacity-5 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-white rounded-full blur-3xl opacity-5 animate-pulse delay-1000"></div>
        </div>
      </div>
    </div>
  );
}