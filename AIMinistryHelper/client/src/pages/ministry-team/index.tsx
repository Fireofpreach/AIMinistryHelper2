import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { TeamMember } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function MinistryTeam() {
  const { toast } = useToast();
  const userId = 1; // In a real app, this would come from authentication
  
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    position: "",
    image: ""
  });
  const [messageData, setMessageData] = useState({
    recipient: "",
    subject: "",
    message: ""
  });
  
  // Fetch team members
  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ['/api/team-members', userId],
    queryFn: () => fetch(`/api/team-members?userId=${userId}`).then(res => res.json())
  });
  
  // Add team member mutation
  const addTeamMemberMutation = useMutation({
    mutationFn: async (member: any) => {
      const response = await apiRequest("POST", "/api/team-members", {
        ...member,
        userId
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/team-members'] });
      setShowAddMemberDialog(false);
      resetNewMember();
      toast({
        title: "Team member added",
        description: "The team member has been added successfully",
      });
    },
    onError: (error) => {
      console.error("Error adding team member:", error);
      toast({
        title: "Error adding team member",
        description: "There was an error adding the team member",
        variant: "destructive",
      });
    }
  });
  
  // Delete team member mutation
  const deleteTeamMemberMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/team-members/${id}`, {});
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/team-members'] });
      toast({
        title: "Team member removed",
        description: "The team member has been removed",
      });
    },
    onError: (error) => {
      console.error("Error deleting team member:", error);
      toast({
        title: "Error",
        description: "There was an error removing the team member",
        variant: "destructive",
      });
    }
  });
  
  // Reset new member form
  const resetNewMember = () => {
    setNewMember({
      name: "",
      position: "",
      image: ""
    });
  };
  
  // Handle sending a message (currently just a toast notification)
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${messageData.recipient}`,
    });
    
    setShowMessageDialog(false);
    setMessageData({
      recipient: "",
      subject: "",
      message: ""
    });
  };
  
  // Filter team members based on search term
  const filteredTeamMembers = React.useMemo(() => {
    if (!teamMembers) return [];
    
    return teamMembers.filter((member: TeamMember) => {
      return (
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.position && member.position.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  }, [teamMembers, searchTerm]);
  
  // Handle adding new team member
  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMember.name || !newMember.position) {
      toast({
        title: "Missing information",
        description: "Please provide a name and position",
        variant: "destructive",
      });
      return;
    }
    
    addTeamMemberMutation.mutate(newMember);
  };
  
  // Handle deleting a team member
  const handleDeleteTeamMember = (id: number) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      deleteTeamMemberMutation.mutate(id);
    }
  };
  
  // Open message dialog for a specific team member
  const openMessageDialog = (member: TeamMember) => {
    setMessageData({
      recipient: member.name,
      subject: "",
      message: ""
    });
    setShowMessageDialog(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">Ministry Team</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">Manage your ministry team members</p>
      </div>
      
      {/* Team Overview Card */}
      <Card className="bg-primary-50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-primary-800 dark:text-primary-300">Ministry Leadership Team</h2>
              <p className="text-primary-700 dark:text-primary-400 mt-1">
                Coordinate with your team and manage responsibilities
              </p>
              <div className="flex items-center mt-4">
                <div className="flex -space-x-2 mr-3">
                  {!isLoading && teamMembers && teamMembers.slice(0, 4).map((member: TeamMember, i: number) => (
                    <Avatar key={i} className="w-8 h-8 border-2 border-white dark:border-gray-800">
                      {member.image ? (
                        <AvatarImage src={member.image} alt={member.name} />
                      ) : null}
                      <AvatarFallback className="bg-primary-200 dark:bg-primary-800 text-primary-700 dark:text-primary-300">
                        {member.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {!isLoading && teamMembers && teamMembers.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs text-primary-700 dark:text-primary-300">
                      +{teamMembers.length - 4}
                    </div>
                  )}
                </div>
                <span className="text-sm text-primary-700 dark:text-primary-400">
                  {!isLoading && teamMembers ? teamMembers.length : '...'} team members
                </span>
              </div>
            </div>
            <Button 
              onClick={() => setShowAddMemberDialog(true)} 
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Add Team Member
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div className="relative w-full md:w-72">
          <Input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Schedule Meeting
          </Button>
          <DialogTrigger asChild>
            <Button variant="outline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Message All
            </Button>
          </DialogTrigger>
        </div>
      </div>
      
      {/* Team members grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
              <CardFooter>
                <div className="flex space-x-2 w-full">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredTeamMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTeamMembers.map((member: TeamMember) => (
            <Card key={member.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    {member.image ? (
                      <AvatarImage src={member.image} alt={member.name} />
                    ) : null}
                    <AvatarFallback className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                      {member.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{member.name}</CardTitle>
                    <CardDescription>{member.position}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                {/* Contact methods - this would be expanded in a real app */}
                <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact via email
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex space-x-2 w-full">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => openMessageDialog(member)}
                  >
                    Message
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                    onClick={() => handleDeleteTeamMember(member.id)}
                  >
                    Remove
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">No team members found</h3>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            {searchTerm ? "Try adjusting your search" : "Add your first team member to get started"}
          </p>
          <Button 
            className="mt-4"
            onClick={() => setShowAddMemberDialog(true)}
          >
            Add Team Member
          </Button>
        </div>
      )}
      
      {/* Featured image */}
      <Card>
        <CardContent className="p-0 overflow-hidden">
          <div className="aspect-w-16 aspect-h-5">
            <img 
              src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=600" 
              alt="Ministry team working together" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">Building a Strong Ministry Team</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Effective ministry requires a dedicated team working together to serve the community. Encourage regular communication, clear role definition, and spiritual growth among team members.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Add Team Member Dialog */}
      <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddTeamMember}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={newMember.position}
                  onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                  className="mt-1"
                  placeholder="e.g. Youth Pastor, Worship Director"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="image">Profile Image URL (optional)</Label>
                <Input
                  id="image"
                  type="url"
                  value={newMember.image}
                  onChange={(e) => setNewMember({ ...newMember, image: e.target.value })}
                  className="mt-1"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setShowAddMemberDialog(false);
                resetNewMember();
              }}>
                Cancel
              </Button>
              <Button type="submit" disabled={addTeamMemberMutation.isPending}>
                {addTeamMemberMutation.isPending ? "Adding..." : "Add Team Member"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSendMessage}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="recipient">To</Label>
                <Input
                  id="recipient"
                  value={messageData.recipient}
                  onChange={(e) => setMessageData({ ...messageData, recipient: e.target.value })}
                  className="mt-1"
                  readOnly={!!messageData.recipient}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={messageData.subject}
                  onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
                  className="mt-1"
                  placeholder="Enter message subject"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={messageData.message}
                  onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
                  className="mt-1"
                  rows={4}
                  placeholder="Write your message here..."
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowMessageDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
