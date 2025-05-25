import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface WelcomeCardProps {
  eventsToday: number;
  prayerRequests: number;
  tasksDue: number;
}

export default function WelcomeCard({ eventsToday, prayerRequests, tasksDue }: WelcomeCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 mb-6 overflow-hidden">
      <div className="md:flex items-center">
        <div className="p-6 md:w-2/3">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-2">Welcome, Pastor</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">Your ministry dashboard is ready to help you serve your community. Here's what's happening today:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-slate-50 dark:bg-gray-700 rounded-lg p-3 border border-slate-200 dark:border-gray-600">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{eventsToday} Events Today</p>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-gray-700 rounded-lg p-3 border border-slate-200 dark:border-gray-600">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{prayerRequests} Prayer Requests</p>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-gray-700 rounded-lg p-3 border border-slate-200 dark:border-gray-600">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{tasksDue} Tasks Due</p>
              </div>
            </div>
          </div>
          
          <Button asChild className="bg-primary-600 hover:bg-primary-700 text-white">
            <Link href="/calendar">View Your Schedule</Link>
          </Button>
        </div>
        
        <div className="md:w-1/3 bg-slate-100 dark:bg-gray-700 h-full">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
            alt="Pastor using digital ministry tools" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </div>
  );
}
