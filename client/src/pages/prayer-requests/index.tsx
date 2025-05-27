import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { PrayerRequest } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

export default function PrayerRequests() {
  const { toast } = useToast();
  const userId = 1; // In a real app, this would come from authentication
  
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPrayerRequestDialog, setShowAddPrayerRequestDialog] = useState(false);
  const [newPrayerRequest, setNewPrayerRequest] = useState({
    content: "",
    submittedBy: "Pastor",
  });
  
  // Fetch prayer requests
  const { data: prayerRequests, isLoading } = useQuery({
    queryKey: ['/api/prayer-requests', userId],
    queryFn: () => fetch(`/api/prayer-requests?userId=${userId}`).then(res => res.json())
  });
  
  // Add prayer request mutation
  const addPrayerRequestMutation = useMutation({
    mutationFn: async (prayerRequest: any) => {
      const response = await apiRequest("POST", "/api/prayer-requests", {
        ...prayerRequest,
        submittedAt: new Date().toISOString(),
        userId
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/prayer-requests'] });
      setShowAddPrayerRequestDialog(false);
      resetNewPrayerRequest();
      toast({
        title: "Prayer request added",
        description: "Your prayer request has been added successfully",
      });
    },
    onError: (error) => {
      console.error("Error adding prayer request:", error);
      toast({
        title: "Error adding prayer request",
        description: "There was an error adding your prayer request",
        variant: "destructive",
      });
    }
  });
  
  // Pray for request mutation
  const prayForRequestMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("POST", `/api/prayer-requests/${id}/pray`, {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/prayer-requests'] });
      toast({
        title: "Prayer counted",
        description: "Thank you for praying for this request",
      });
    },
    onError: (error) => {
      console.error("Error incrementing prayer count:", error);
      toast({
        title: "Error",
        description: "There was an error recording your prayer",
        variant: "destructive",
      });
    }
  });
  
  // Delete prayer request mutation
  const deletePrayerRequestMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/prayer-requests/${id}`, {});
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/prayer-requests'] });
      toast({
        title: "Prayer request deleted",
        description: "The prayer request has been deleted",
      });
    },
    onError: (error) => {
      console.error("Error deleting prayer request:", error);
      toast({
        title: "Error",
        description: "There was an error deleting the prayer request",
        variant: "destructive",
      });
    }
  });
  
  // Reset new prayer request form
  const resetNewPrayerRequest = () => {
    setNewPrayerRequest({
      content: "",
      submittedBy: "Pastor",
    });
  };
  
  // Filter prayer requests based on search term
  const filteredPrayerRequests = React.useMemo(() => {
    if (!prayerRequests) return [];
    
    return prayerRequests.filter((request: PrayerRequest) => {
      return (
        request.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [prayerRequests, searchTerm]);
  
  // Handle adding new prayer request
  const handleAddPrayerRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPrayerRequest.content || !newPrayerRequest.submittedBy) {
      toast({
        title: "Missing information",
        description: "Please provide content and your name",
        variant: "destructive",
      });
      return;
    }
    
    addPrayerRequestMutation.mutate(newPrayerRequest);
  };
  
  // Handle praying for a request
  const handlePrayForRequest = (id: number) => {
    prayForRequestMutation.mutate(id);
  };
  
  // Handle deleting a prayer request
  const handleDeletePrayerRequest = (id: number) => {
    if (confirm("Are you sure you want to delete this prayer request?")) {
      deletePrayerRequestMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">Prayer Requests</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">Manage prayer needs for your community</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div className="relative w-full md:w-72">
          <Input
            type="text"
            placeholder="Search prayer requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <Button 
          className="bg-rose-600 hover:bg-rose-700 text-white"
          onClick={() => setShowAddPrayerRequestDialog(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Add Prayer Request
        </Button>
      </div>
      
      {/* Prayer requests grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full mb-2" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredPrayerRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrayerRequests.map((request: PrayerRequest) => (
            <Card key={request.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800">
                    Prayer Request
                  </Badge>
                  <button 
                    className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                    onClick={() => handleDeletePrayerRequest(request.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-800 dark:text-white mb-4">{request.content}</p>
                <div className="flex justify-between items-center text-sm">
                  <div className="text-slate-500 dark:text-slate-400">
                    <span className="font-medium">{request.submittedBy}</span> · {formatDistanceToNow(new Date(request.submittedAt), { addSuffix: true })}
                  </div>
                  <button 
                    className="flex items-center text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300"
                    onClick={() => handlePrayForRequest(request.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {request.prayerCount || 0}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">No prayer requests found</h3>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            {searchTerm ? "Try adjusting your search" : "Add your first prayer request to get started"}
          </p>
          <Button 
            className="mt-4 bg-rose-600 hover:bg-rose-700 text-white"
            onClick={() => setShowAddPrayerRequestDialog(true)}
          >
            Add Prayer Request
          </Button>
        </div>
      )}
      
      {/* Scripture card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">Scripture for Prayer</h3>
              <p className="text-slate-600 dark:text-slate-300 italic scripture max-w-xl">
                "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Philippians 4:6-7</p>
            </div>
            <Button 
              className="bg-rose-600 hover:bg-rose-700 text-white md:ml-6"
              onClick={() => setShowAddPrayerRequestDialog(true)}
            >
              Add Prayer Request
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Add Prayer Request Dialog */}
      <Dialog open={showAddPrayerRequestDialog} onOpenChange={setShowAddPrayerRequestDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Prayer Request</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddPrayerRequest}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="content">Prayer Request</Label>
                <Textarea
                  id="content"
                  value={newPrayerRequest.content}
                  onChange={(e) => setNewPrayerRequest({ ...newPrayerRequest, content: e.target.value })}
                  className="mt-1"
                  rows={4}
                  placeholder="Share what you'd like prayer for..."
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="submittedBy">Your Name</Label>
                <Input
                  id="submittedBy"
                  value={newPrayerRequest.submittedBy}
                  onChange={(e) => setNewPrayerRequest({ ...newPrayerRequest, submittedBy: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setShowAddPrayerRequestDialog(false);
                resetNewPrayerRequest();
              }}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-rose-600 hover:bg-rose-700 text-white"
                disabled={addPrayerRequestMutation.isPending}
              >
                {addPrayerRequestMutation.isPending ? "Adding..." : "Add Prayer Request"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
