import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { TeamMember } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface MinistryTeamProps {
  teamMembers: TeamMember[];
  isLoading: boolean;
}

export default function MinistryTeam({ teamMembers, isLoading }: MinistryTeamProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-medium text-slate-800 dark:text-white">Ministry Team</h3>
          <Link href="/ministry-team" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">View All</Link>
        </div>
        
        <div className="p-6">
          <Skeleton className="h-40 w-full rounded-lg mb-4" />
          
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
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
        <h3 className="font-medium text-slate-800 dark:text-white">Ministry Team</h3>
        <Link href="/ministry-team" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">View All</Link>
      </div>
      
      <div className="p-6">
        {/* Team image */}
        <img 
          src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300" 
          alt="Ministry team working together" 
          className="w-full h-40 object-cover rounded-lg mb-4" 
        />
        
        <div className="space-y-3">
          {teamMembers.length > 0 ? (
            teamMembers.map(member => (
              <div className="flex items-center" key={member.id}>
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-9 h-9 rounded-full" 
                  />
                ) : (
                  <div className="w-9 h-9 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-700 dark:text-primary-300 font-medium">
                    {member.name.substring(0, 1)}
                  </div>
                )}
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{member.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{member.position}</p>
                </div>
                <button className="text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">No team members available</p>
          )}
        </div>
      </div>
      
      <div className="px-6 py-4 bg-slate-50 dark:bg-gray-700/50 border-t border-slate-200 dark:border-gray-700">
        <Button 
          variant="outline" 
          className="w-full bg-white dark:bg-gray-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-200"
          asChild
        >
          <Link href="/ministry-team">Schedule Team Meeting</Link>
        </Button>
      </div>
    </div>
  );
}
