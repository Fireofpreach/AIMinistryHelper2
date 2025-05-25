import React from "react";
import WelcomeCard from "./WelcomeCard";
import QuickActions from "./QuickActions";
import SermonAssistant from "./SermonAssistant";
import CalendarEvents from "./CalendarEvents";
import PrayerRequests from "./PrayerRequests";
import MinistryTasks from "./MinistryTasks";
import MinistryTeam from "./MinistryTeam";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const userId = 1; // In a real app, this would come from authentication
  
  // Fetch events
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['/api/events', userId],
    queryFn: () => fetch(`/api/events?userId=${userId}`).then(res => res.json())
  });
  
  // Fetch prayer requests
  const { data: prayerRequests, isLoading: prayerRequestsLoading } = useQuery({
    queryKey: ['/api/prayer-requests', userId],
    queryFn: () => fetch(`/api/prayer-requests?userId=${userId}`).then(res => res.json())
  });
  
  // Fetch tasks
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['/api/tasks', userId],
    queryFn: () => fetch(`/api/tasks?userId=${userId}`).then(res => res.json())
  });
  
  // Fetch sermons
  const { data: sermons, isLoading: sermonsLoading } = useQuery({
    queryKey: ['/api/sermons', userId],
    queryFn: () => fetch(`/api/sermons?userId=${userId}`).then(res => res.json())
  });
  
  // Fetch team members
  const { data: teamMembers, isLoading: teamMembersLoading } = useQuery({
    queryKey: ['/api/team-members', userId],
    queryFn: () => fetch(`/api/team-members?userId=${userId}`).then(res => res.json())
  });
  
  // Calculate counts for the welcome card
  const todayEvents = events?.filter((event: any) => {
    const eventDate = new Date(event.startTime);
    const today = new Date();
    return eventDate.getDate() === today.getDate() &&
           eventDate.getMonth() === today.getMonth() &&
           eventDate.getFullYear() === today.getFullYear();
  }).length || 0;
  
  const totalPrayerRequests = prayerRequests?.length || 0;
  
  const dueTasks = tasks?.filter((task: any) => {
    return !task.completed;
  }).length || 0;
  
  return (
    <>
      {/* Welcome card */}
      <WelcomeCard 
        eventsToday={todayEvents}
        prayerRequests={totalPrayerRequests}
        tasksDue={dueTasks}
      />
      
      {/* Quick Actions */}
      <QuickActions />
      
      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Sermon Assistant */}
          <SermonAssistant sermon={sermons && sermons.length > 0 ? sermons[0] : null} isLoading={sermonsLoading} />
          
          {/* Upcoming Calendar Events */}
          <CalendarEvents events={events || []} isLoading={eventsLoading} />
        </div>
        
        {/* Sidebar column */}
        <div className="space-y-6">
          {/* Prayer Requests */}
          <PrayerRequests prayerRequests={prayerRequests || []} isLoading={prayerRequestsLoading} />
          
          {/* Ministry Tasks */}
          <MinistryTasks tasks={tasks || []} isLoading={tasksLoading} />
          
          {/* Ministry Team */}
          <MinistryTeam teamMembers={teamMembers || []} isLoading={teamMembersLoading} />
        </div>
      </div>
    </>
  );
}
