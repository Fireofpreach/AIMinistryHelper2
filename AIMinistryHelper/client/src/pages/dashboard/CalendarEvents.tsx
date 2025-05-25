import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Event } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { format, isToday, isTomorrow } from "date-fns";

interface CalendarEventsProps {
  events: Event[];
  isLoading: boolean;
}

export default function CalendarEvents({ events, isLoading }: CalendarEventsProps) {
  // Group events by day
  const groupedEvents = React.useMemo(() => {
    const grouped: Record<string, Event[]> = {};
    
    if (events) {
      events.forEach(event => {
        const date = new Date(event.startTime);
        const dateKey = format(date, 'yyyy-MM-dd');
        
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        
        grouped[dateKey].push(event);
      });
    }
    
    return grouped;
  }, [events]);

  // Sort days
  const sortedDays = React.useMemo(() => {
    return Object.keys(groupedEvents).sort();
  }, [groupedEvents]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-medium text-slate-800 dark:text-white">Upcoming Events</h3>
          <Link href="/calendar" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">View Calendar</Link>
        </div>
        
        <div className="divide-y divide-slate-200 dark:divide-gray-700">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
        
        <div className="px-6 py-4 bg-slate-50 dark:bg-gray-700/50 border-t border-slate-200 dark:border-gray-700">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-medium text-slate-800 dark:text-white">Upcoming Events</h3>
        <Link href="/calendar" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">View Calendar</Link>
      </div>
      
      <div className="divide-y divide-slate-200 dark:divide-gray-700">
        {sortedDays.length > 0 ? (
          sortedDays.map(dateKey => {
            const date = new Date(dateKey);
            const dayEvents = groupedEvents[dateKey];
            
            return (
              <React.Fragment key={dateKey}>
                {/* Date header */}
                <div className="px-6 py-3 bg-slate-50 dark:bg-gray-700/50">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 ${
                      isToday(date) 
                        ? "bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300" 
                        : "bg-slate-200 dark:bg-gray-600 text-slate-800 dark:text-slate-200"
                    } rounded-lg flex items-center justify-center text-sm font-medium mr-3`}>
                      <span>{format(date, 'd')}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {isToday(date) 
                        ? "Today" 
                        : isTomorrow(date) 
                          ? "Tomorrow" 
                          : format(date, 'EEEE, MMMM d')}
                    </span>
                  </div>
                </div>
                
                {/* Events for this day */}
                {dayEvents.map(event => (
                  <div className="px-6 py-4" key={event.id}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {format(new Date(event.startTime), 'hh:mm a')}
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-slate-800 dark:text-white">{event.title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{event.location}</p>
                        {event.participants && event.participants.length > 0 && (
                          <div className="flex items-center mt-2">
                            <div className="flex -space-x-1">
                              {event.participants.slice(0, 3).map((participant, i) => (
                                <div key={i} className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-600 text-xs flex items-center justify-center border border-white dark:border-gray-800">
                                  {participant.substring(0, 1)}
                                </div>
                              ))}
                              {event.participants.length > 3 && (
                                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-gray-700 border border-white dark:border-gray-800 flex items-center justify-center">
                                  <span className="text-xs text-slate-500 dark:text-slate-400">+{event.participants.length - 3}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      {event.category && (
                        <div className="ml-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            event.category === 'Staff' 
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' 
                              : event.category === 'Youth' 
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                                : event.category === 'Community' 
                                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' 
                                  : event.category === 'Outreach'
                                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300'
                          }`}>
                            {event.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </React.Fragment>
            );
          })
        ) : (
          <div className="px-6 py-8 text-center">
            <p className="text-slate-500 dark:text-slate-400">No upcoming events scheduled</p>
          </div>
        )}
      </div>
      
      <div className="px-6 py-4 bg-slate-50 dark:bg-gray-700/50 border-t border-slate-200 dark:border-gray-700">
        <Button 
          variant="outline" 
          className="w-full bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-600 hover:bg-slate-50 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-200"
          asChild
        >
          <Link href="/calendar">+ Add New Event</Link>
        </Button>
      </div>
    </div>
  );
}
