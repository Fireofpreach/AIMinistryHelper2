import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import { Task } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/queryClient";
import { useQueryClient } from "@tanstack/react-query";
import { format, isToday, isTomorrow, addDays } from "date-fns";

interface MinistryTasksProps {
  tasks: Task[];
  isLoading: boolean;
}

export default function MinistryTasks({ tasks, isLoading }: MinistryTasksProps) {
  const queryClient = useQueryClient();
  
  // Toggle task completion status
  const toggleTaskCompletion = async (task: Task) => {
    try {
      await apiRequest("PUT", `/api/tasks/${task.id}`, {
        ...task,
        completed: !task.completed
      });
      
      // Invalidate the tasks query to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Filter tasks due today
  const dueTodayTasks = React.useMemo(() => {
    if (!tasks) return [];
    
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      return isToday(new Date(task.dueDate)) && !task.completed;
    });
  }, [tasks]);

  // Filter upcoming tasks (not due today and not completed)
  const upcomingTasks = React.useMemo(() => {
    if (!tasks) return [];
    
    return tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      const dueDate = new Date(task.dueDate);
      return !isToday(dueDate) && dueDate >= new Date();
    }).sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime());
  }, [tasks]);

  // Format relative due date text
  const getRelativeDueDate = (dueDate: string) => {
    const date = new Date(dueDate);
    
    if (isToday(date)) {
      return "Today";
    } else if (isTomorrow(date)) {
      return "Tomorrow";
    } else {
      const today = new Date();
      const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 7) {
        return `In ${diffDays} days`;
      } else {
        return format(date, 'MMM d');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-medium text-slate-800 dark:text-white">Ministry Tasks</h3>
          <Link href="/tasks" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">View All</Link>
        </div>
        
        <div className="p-6">
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="space-y-3 mb-6">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
          
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
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
        <h3 className="font-medium text-slate-800 dark:text-white">Ministry Tasks</h3>
        <Link href="/tasks" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">View All</Link>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-200">Due Today</h4>
          <span className="text-xs font-medium text-primary-600 dark:text-primary-400">{dueTodayTasks.length} tasks</span>
        </div>
        
        <div className="space-y-3 mb-6">
          {dueTodayTasks.length > 0 ? (
            dueTodayTasks.map(task => (
              <div className="flex items-center" key={task.id}>
                <Checkbox 
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task)}
                  className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500"
                />
                <div className="ml-3 flex-1">
                  <p className="text-sm text-slate-800 dark:text-white">{task.title}</p>
                  <div className="flex items-center mt-1">
                    {task.priority === "Urgent" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 mr-2">
                        Urgent
                      </span>
                    )}
                    {task.priority === "Important" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 mr-2">
                        Important
                      </span>
                    )}
                    {task.dueDate && (
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Due {format(new Date(task.dueDate), 'h:mm a')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">No tasks due today</p>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-200">Upcoming</h4>
          <span className="text-xs font-medium text-primary-600 dark:text-primary-400">{upcomingTasks.length} tasks</span>
        </div>
        
        <div className="space-y-3">
          {upcomingTasks.length > 0 ? (
            upcomingTasks.slice(0, 2).map(task => (
              <div className="flex items-center" key={task.id}>
                <Checkbox 
                  id={`task-upcoming-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task)}
                  className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500"
                />
                <div className="ml-3">
                  <p className="text-sm text-slate-800 dark:text-white">{task.title}</p>
                  {task.dueDate && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">{getRelativeDueDate(task.dueDate)}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">No upcoming tasks</p>
          )}
        </div>
      </div>
      
      <div className="px-6 py-4 bg-slate-50 dark:bg-gray-700/50 border-t border-slate-200 dark:border-gray-700">
        <Button 
          variant="outline" 
          className="w-full bg-white dark:bg-gray-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-200"
        >
          + Add New Task
        </Button>
      </div>
    </div>
  );
}
