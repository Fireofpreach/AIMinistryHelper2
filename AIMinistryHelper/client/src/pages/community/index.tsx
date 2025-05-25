import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Community() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("members");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for community page
  const communityMembers = [
    { id: 1, name: "Sarah Johnson", email: "sarahj@example.com", phone: "(555) 123-4567", role: "Member", notes: "Active in worship team", lastAttended: "2 days ago" },
    { id: 2, name: "Michael Thompson", email: "michaelt@example.com", phone: "(555) 234-5678", role: "Leader", notes: "Youth group leader", lastAttended: "1 week ago" },
    { id: 3, name: "Emily Davis", email: "emilyd@example.com", phone: "(555) 345-6789", role: "Member", notes: "Prayer team", lastAttended: "Today" },
    { id: 4, name: "David Wilson", email: "davidw@example.com", phone: "(555) 456-7890", role: "Staff", notes: "Administrative pastor", lastAttended: "Yesterday" },
    { id: 5, name: "Jessica Miller", email: "jessicam@example.com", phone: "(555) 567-8901", role: "Member", notes: "New member", lastAttended: "3 weeks ago" },
    { id: 6, name: "Robert Brown", email: "robertb@example.com", phone: "(555) 678-9012", role: "Visitor", notes: "Attended twice", lastAttended: "1 month ago" },
    { id: 7, name: "Jennifer Clark", email: "jenniferc@example.com", phone: "(555) 789-0123", role: "Leader", notes: "Children's ministry", lastAttended: "Yesterday" },
    { id: 8, name: "William Taylor", email: "williamt@example.com", phone: "(555) 890-1234", role: "Member", notes: "Missions committee", lastAttended: "3 days ago" },
  ];
  
  const groups = [
    { id: 1, name: "Sunday School", members: 24, leader: "Jennifer Clark", meetingTime: "Sundays, 9:00 AM" },
    { id: 2, name: "Men's Bible Study", members: 12, leader: "David Wilson", meetingTime: "Tuesdays, 7:00 PM" },
    { id: 3, name: "Women's Fellowship", members: 18, leader: "Sarah Johnson", meetingTime: "Wednesdays, 6:30 PM" },
    { id: 4, name: "Youth Group", members: 32, leader: "Michael Thompson", meetingTime: "Fridays, 7:00 PM" },
    { id: 5, name: "Worship Team", members: 10, leader: "Emily Davis", meetingTime: "Thursdays, 6:00 PM" },
    { id: 6, name: "Prayer Warriors", members: 15, leader: "Robert Brown", meetingTime: "Mondays, 7:00 AM" },
  ];
  
  const events = [
    { id: 1, name: "Church Picnic", date: "July 15, 2023", location: "City Park", attendees: 120 },
    { id: 2, name: "Youth Summer Camp", date: "August 5-10, 2023", location: "Camp Wilderness", attendees: 45 },
    { id: 3, name: "Christmas Service", date: "December 24, 2023", location: "Main Sanctuary", attendees: 350 },
    { id: 4, name: "Easter Service", date: "April 9, 2023", location: "Main Sanctuary", attendees: 400 },
  ];
  
  // Filter members based on search term
  const filteredMembers = communityMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Add member notification
  const handleAddMember = () => {
    toast({
      title: "Feature coming soon",
      description: "The ability to add new members will be available in a future update.",
    });
  };
  
  // Add group notification
  const handleAddGroup = () => {
    toast({
      title: "Feature coming soon",
      description: "The ability to create new groups will be available in a future update.",
    });
  };
  
  // Add event notification
  const handleAddEvent = () => {
    toast({
      title: "Feature coming soon",
      description: "Please use the Calendar page to add new events.",
    });
  };
  
  // Send message notification
  const handleSendMessage = () => {
    toast({
      title: "Feature coming soon",
      description: "The messaging functionality will be available in a future update.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">Community</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">Manage your church community and groups</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div className="relative w-full md:w-72">
          <Input
            type="text"
            placeholder="Search community..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Send Message
          </Button>
          <Button onClick={handleAddMember}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Add Member
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        
        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.length > 0 ? (
              filteredMembers.map(member => (
                <Card key={member.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.role === 'Staff' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300' :
                        member.role === 'Leader' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' :
                        member.role === 'Member' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                      }`}>
                        {member.role}
                      </div>
                    </div>
                    <CardTitle className="mt-2">{member.name}</CardTitle>
                    <CardDescription>Last attended: {member.lastAttended}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center text-slate-600 dark:text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {member.email}
                      </div>
                      <div className="flex items-center text-slate-600 dark:text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {member.phone}
                      </div>
                    </div>
                    {member.notes && (
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="font-medium">Notes:</span> {member.notes}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <div className="flex space-x-2 w-full">
                      <Button variant="outline" size="sm" className="flex-1" onClick={handleSendMessage}>
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        View Profile
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">No members found</h3>
                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  Try adjusting your search or add a new member
                </p>
                <Button className="mt-4" onClick={handleAddMember}>
                  Add New Member
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Groups Tab */}
        <TabsContent value="groups" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={handleAddGroup}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Group
            </Button>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {groups.map(group => (
              <Card key={group.id}>
                <CardHeader>
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription>{group.members} members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Leader: {group.leader}
                    </div>
                    <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {group.meetingTime}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex space-x-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1" onClick={handleSendMessage}>
                      Message Group
                    </Button>
                    <Button size="sm" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={handleAddEvent}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Event
            </Button>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {events.map(event => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.name}</CardTitle>
                  <CardDescription>{event.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                    <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.attendees} expected attendees
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex space-x-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1">
                      Manage RSVPs
                    </Button>
                    <Button size="sm" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
