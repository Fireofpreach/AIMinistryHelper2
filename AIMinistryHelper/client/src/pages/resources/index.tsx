import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Resource } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Resources() {
  const { toast } = useToast();
  const userId = 1; // In a real app, this would come from authentication
  
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showAddResourceDialog, setShowAddResourceDialog] = useState(false);
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    type: "",
    url: ""
  });
  
  // Fetch resources
  const { data: resources, isLoading: resourcesLoading } = useQuery({
    queryKey: ['/api/resources', userId],
    queryFn: () => fetch(`/api/resources?userId=${userId}`).then(res => res.json())
  });
  
  // Add resource mutation
  const addResourceMutation = useMutation({
    mutationFn: async (resource: any) => {
      const response = await apiRequest("POST", "/api/resources", {
        ...resource,
        userId
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/resources'] });
      setShowAddResourceDialog(false);
      resetNewResource();
      toast({
        title: "Resource added",
        description: "Your resource has been added successfully",
      });
    },
    onError: (error) => {
      console.error("Error adding resource:", error);
      toast({
        title: "Error adding resource",
        description: "There was an error adding your resource",
        variant: "destructive",
      });
    }
  });
  
  // Reset new resource form
  const resetNewResource = () => {
    setNewResource({
      title: "",
      description: "",
      type: "",
      url: ""
    });
  };
  
  // Filter resources based on search term and active tab
  const filteredResources = React.useMemo(() => {
    if (!resources) return [];
    
    return resources.filter((resource: Resource) => {
      const matchesSearch = 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (resource.description && resource.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (resource.type && resource.type.toLowerCase().includes(searchTerm.toLowerCase()));
        
      if (activeTab === 'all') {
        return matchesSearch;
      } else {
        return matchesSearch && resource.type === activeTab;
      }
    });
  }, [resources, searchTerm, activeTab]);
  
  // Get resource types for tabs
  const resourceTypes = React.useMemo(() => {
    if (!resources) return [];
    
    const types = new Set<string>();
    resources.forEach((resource: Resource) => {
      if (resource.type) {
        types.add(resource.type);
      }
    });
    
    return Array.from(types);
  }, [resources]);
  
  // Handle adding new resource
  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newResource.title || !newResource.type) {
      toast({
        title: "Missing information",
        description: "Please provide a title and type",
        variant: "destructive",
      });
      return;
    }
    
    addResourceMutation.mutate(newResource);
  };
  
  const getIconForResourceType = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'book':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'article':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      case 'video':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'sermon':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
      case 'template':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">Resource Library</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">Access ministry materials and theological resources</p>
      </div>
      
      {/* Integrated Resources Banner */}
      <Card className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full text-green-700 dark:text-green-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-green-800 dark:text-green-300">Theological Resources Automatically Connected</h3>
              <p className="text-sm text-green-700 dark:text-green-400 mt-1">All theological resources are connected and ready to use - no manual setup required.</p>
            </div>
            <Button variant="outline" className="bg-white dark:bg-transparent border-green-300 dark:border-green-700 text-green-800 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Browse All Resources
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div className="relative w-full md:w-72">
          <Input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <Button onClick={() => setShowAddResourceDialog(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Resource
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="flex overflow-x-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          {resourceTypes.map(type => (
            <TabsTrigger key={type} value={type}>
              {type}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          {resourcesLoading ? (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-2/4 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                  <CardFooter>
                    <div className="flex space-x-2 w-full">
                      <Skeleton className="h-9 w-full" />
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : filteredResources.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource: Resource) => (
                <Card key={resource.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-700 dark:text-primary-300 mr-2">
                        {getIconForResourceType(resource.type || "")}
                      </div>
                      <div className="text-xs font-medium rounded-full px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {resource.type || "Document"}
                      </div>
                    </div>
                    <CardTitle className="mt-2">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    {resource.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {resource.description}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      variant={resource.url ? "default" : "outline"}
                      onClick={() => {
                        if (resource.url) {
                          window.open(resource.url, "_blank");
                        } else {
                          toast({
                            title: "Resource unavailable",
                            description: "This resource does not have a direct URL",
                          });
                        }
                      }}
                    >
                      {resource.url ? "Access Resource" : "View Details"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">No resources found</h3>
              <p className="mt-1 text-slate-500 dark:text-slate-400">
                {searchTerm ? "Try adjusting your search" : "Add a new resource to get started"}
              </p>
              <Button className="mt-4" onClick={() => setShowAddResourceDialog(true)}>
                Add New Resource
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Add Resource Dialog */}
      <Dialog open={showAddResourceDialog} onOpenChange={setShowAddResourceDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Resource</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddResource}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="title">Resource Title</Label>
                <Input
                  id="title"
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type">Resource Type</Label>
                <Select
                  value={newResource.type}
                  onValueChange={(value) => setNewResource({ ...newResource, type: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Book">Book</SelectItem>
                    <SelectItem value="Article">Article</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                    <SelectItem value="Sermon">Sermon</SelectItem>
                    <SelectItem value="Template">Template</SelectItem>
                    <SelectItem value="Document">Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="url">Resource URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={newResource.url}
                  onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                  className="mt-1"
                  placeholder="https://"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newResource.description}
                  onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setShowAddResourceDialog(false);
                resetNewResource();
              }}>
                Cancel
              </Button>
              <Button type="submit" disabled={addResourceMutation.isPending}>
                {addResourceMutation.isPending ? "Adding..." : "Add Resource"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
