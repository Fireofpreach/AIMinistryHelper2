import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format, isToday, isTomorrow, parseISO, startOfDay, isSameDay } from "date-fns";
import { Event } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Calendar() {
  const { toast } = useToast();
  const userId = 1; // In a real app, this would come from authentication
  
  // State
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showAddEventDialog, setShowAddEventDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    category: "",
    participants: [] as string[]
  });
  
  // Fetch events
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['/api/events', userId],
    queryFn: () => fetch(`/api/events?userId=${userId}`).then(res => res.json())
  });
  
  // Add event mutation
  const addEventMutation = useMutation({
    mutationFn: async (event: any) => {
      const response = await apiRequest("POST", "/api/events", {
        ...event,
        userId,
        participants: event.participants.length ? event.participants.split(",").map((p: string) => p.trim()) : []
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      setShowAddEventDialog(false);
      resetNewEvent();
      toast({
        title: "Event added",
        description: "Your event has been added successfully",
      });
    },
    onError: (error) => {
      console.error("Error adding event:", error);
      toast({
        title: "Error adding event",
        description: "There was an error adding your event",
        variant: "destructive",
      });
    }
  });
  
  // Reset new event form
  const resetNewEvent = () => {
    setNewEvent({
      title: "",
      description: "",
      location: "",
      startTime: "",
      endTime: "",
      category: "",
      participants: []
    });
  };
  
  // Get events for the selected date
  const eventsForSelectedDate = React.useMemo(() => {
    if (!events || !selectedDate) return [];
    
    return events.filter((event: Event) => {
      const eventDate = new Date(event.startTime);
      return isSameDay(eventDate, selectedDate);
    });
  }, [events, selectedDate]);
  
  // Format date for display
  const formatDateHeader = (date: Date) => {
    if (isToday(date)) {
      return "Today";
    } else if (isTomorrow(date)) {
      return "Tomorrow";
    } else {
      return format(date, "EEEE, MMMM d, yyyy");
    }
  };
  
  // Handle adding new event
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEvent.title || !newEvent.startTime) {
      toast({
        title: "Missing information",
        description: "Please provide a title and start time",
        variant: "destructive",
      });
      return;
    }
    
    // Format dates correctly
    const startDateTime = selectedDate 
      ? new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${newEvent.startTime}`) 
      : new Date();
    
    const endDateTime = newEvent.endTime && selectedDate
      ? new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${newEvent.endTime}`)
      : undefined;
    
    addEventMutation.mutate({
      ...newEvent,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime ? endDateTime.toISOString() : undefined
    });
  };
  
  // Handle date with events
  const dateHasEvents = (date: Date) => {
    if (!events) return false;
    
    return events.some((event: Event) => {
      const eventDate = new Date(event.startTime);
      return isSameDay(eventDate, date);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">Calendar</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">Manage your ministry events and schedule</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Monthly View</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                hasEvents: (date) => dateHasEvents(date)
              }}
              modifiersClassNames={{
                hasEvents: "bg-primary-50 dark:bg-primary-900/20 font-semibold text-primary-700 dark:text-primary-300"
              }}
            />
            
            <Button 
              className="w-full mt-4"
              onClick={() => {
                setShowAddEventDialog(true);
              }}
            >
              Add New Event
            </Button>
          </CardContent>
        </Card>
        
        {/* Daily Schedule */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {selectedDate ? formatDateHeader(selectedDate) : "Events"}
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="sm">
                Week View
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {eventsLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : eventsForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {eventsForSelectedDate
                  .sort((a: Event, b: Event) => 
                    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
                  )
                  .map((event: Event) => (
                    <div 
                      key={event.id}
                      className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-col sm:flex-row"
                    >
                      <div className="flex-shrink-0 mb-2 sm:mb-0 sm:mr-4">
                        <div className="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-center p-2 rounded-lg w-24">
                          <div className="text-sm font-medium">
                            {format(new Date(event.startTime), "h:mm a")}
                          </div>
                          {event.endTime && (
                            <div className="text-xs">
                              to {format(new Date(event.endTime), "h:mm a")}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-slate-800 dark:text-white">{event.title}</h3>
                          {event.category && (
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
                          )}
                        </div>
                        
                        {event.location && (
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.location}
                          </p>
                        )}
                        
                        {event.description && (
                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                            {event.description}
                          </p>
                        )}
                        
                        {event.participants && event.participants.length > 0 && (
                          <div className="mt-3 flex items-center">
                            <span className="text-xs text-slate-500 dark:text-slate-400 mr-2">Participants:</span>
                            <div className="flex -space-x-1 overflow-hidden">
                              {event.participants.slice(0, 3).map((participant, i) => (
                                <div key={i} className="inline-block h-6 w-6 rounded-full bg-primary-100 dark:bg-primary-800 text-xs flex items-center justify-center ring-2 ring-white dark:ring-gray-800">
                                  {participant.substring(0, 1)}
                                </div>
                              ))}
                              {event.participants.length > 3 && (
                                <div className="inline-block h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-700 text-xs flex items-center justify-center ring-2 ring-white dark:ring-gray-800">
                                  +{event.participants.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">No events scheduled</h3>
                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  Click "Add New Event" to schedule something for this day
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => {
                    setShowAddEventDialog(true);
                  }}
                >
                  Add New Event
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Add Event Dialog */}
      <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddEvent}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newEvent.category}
                  onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Staff">Staff</SelectItem>
                    <SelectItem value="Youth">Youth</SelectItem>
                    <SelectItem value="Community">Community</SelectItem>
                    <SelectItem value="Outreach">Outreach</SelectItem>
                    <SelectItem value="Worship">Worship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="participants">Participants (comma separated)</Label>
                <Input
                  id="participants"
                  value={newEvent.participants}
                  onChange={(e) => setNewEvent({ ...newEvent, participants: e.target.value })}
                  className="mt-1"
                  placeholder="e.g. John Smith, Jane Doe"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setShowAddEventDialog(false);
                resetNewEvent();
              }}>
                Cancel
              </Button>
              <Button type="submit" disabled={addEventMutation.isPending}>
                {addEventMutation.isPending ? "Adding..." : "Add Event"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
