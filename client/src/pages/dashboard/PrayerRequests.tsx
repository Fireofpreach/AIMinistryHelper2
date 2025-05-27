import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PrayerRequest } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/queryClient";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

interface PrayerRequestsProps {
  prayerRequests: PrayerRequest[];
  isLoading: boolean;
}

export default function PrayerRequests({ prayerRequests, isLoading }: PrayerRequestsProps) {
  const queryClient = useQueryClient();
  
  const incrementPrayer = async (id: number) => {
    try {
      await apiRequest("POST", `/api/prayer-requests/${id}/pray`, {});
      // Invalidate the prayer requests query to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ['/api/prayer-requests'] });
    } catch (error) {
      console.error("Error incrementing prayer count:", error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-medium text-slate-800 dark:text-white">Prayer Requests</h3>
          <Link href="/prayer-requests" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">View All</Link>
        </div>
        
        <div className="divide-y divide-slate-200 dark:divide-gray-700">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
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
        <h3 className="font-medium text-slate-800 dark:text-white">Prayer Requests</h3>
        <Link href="/prayer-requests" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">View All</Link>
      </div>
      
      <div className="divide-y divide-slate-200 dark:divide-gray-700">
        {prayerRequests.length > 0 ? (
          prayerRequests.slice(0, 3).map(request => (
            <div className="px-6 py-4" key={request.id}>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-rose-500 dark:text-rose-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    onClick={() => incrementPrayer(request.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-slate-800 dark:text-white">{request.content}</p>
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {request.submittedBy} • {formatDistanceToNow(new Date(request.submittedAt), { addSuffix: true })}
                    </p>
                    <span className="inline-block mx-1 w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full"></span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{request.prayerCount} {request.prayerCount === 1 ? 'prayer' : 'prayers'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-8 text-center">
            <p className="text-slate-500 dark:text-slate-400">No prayer requests available</p>
          </div>
        )}
      </div>
      
      <div className="px-6 py-4 bg-slate-50 dark:bg-gray-700/50 border-t border-slate-200 dark:border-gray-700">
        <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white" asChild>
          <Link href="/prayer-requests">Add Prayer Request</Link>
        </Button>
      </div>
    </div>
  );
}
