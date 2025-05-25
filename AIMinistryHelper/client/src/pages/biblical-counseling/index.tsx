import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function BiblicalCounseling() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("resources");
  const [showAddClientDialog, setShowAddClientDialog] = useState(false);
  const [showAddResourceDialog, setShowAddResourceDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample counseling areas
  const counselingAreas = [
    { id: "marriage", name: "Marriage & Family", count: 24 },
    { id: "grief", name: "Grief & Loss", count: 18 },
    { id: "addiction", name: "Addiction Recovery", count: 15 },
    { id: "depression", name: "Depression & Anxiety", count: 21 },
    { id: "financial", name: "Financial Stewardship", count: 12 },
    { id: "spiritual", name: "Spiritual Growth", count: 27 },
    { id: "parenting", name: "Parenting", count: 19 },
    { id: "conflict", name: "Conflict Resolution", count: 14 },
  ];
  
  // Sample counseling resources
  const counselingResources = [
    {
      id: 1,
      title: "Biblical Foundation for Marriage Counseling",
      category: "Marriage & Family",
      type: "Guide",
      description: "Comprehensive guide to marriage counseling based on biblical principles",
      scriptures: ["Ephesians 5:22-33", "1 Corinthians 13:4-7", "Genesis 2:24"],
    },
    {
      id: 2,
      title: "Grief Process in Scripture",
      category: "Grief & Loss",
      type: "Study",
      description: "A study of how grief is portrayed and processed in biblical narratives",
      scriptures: ["Psalm 34:18", "Matthew 5:4", "John 11:35"],
    },
    {
      id: 3, 
      title: "Addiction and Idolatry",
      category: "Addiction Recovery",
      type: "Framework",
      description: "Biblical framework for understanding addiction as idolatry and finding freedom",
      scriptures: ["1 Corinthians 10:13-14", "Romans 6:16-18", "Galatians 5:1"],
    },
    {
      id: 4,
      title: "Anxiety and God's Peace",
      category: "Depression & Anxiety",
      type: "Guide",
      description: "Biblical guidance for those struggling with anxiety and worry",
      scriptures: ["Philippians 4:6-7", "1 Peter 5:7", "Isaiah 41:10"],
    },
    {
      id: 5,
      title: "Biblical Financial Principles",
      category: "Financial Stewardship",
      type: "Study",
      description: "Study of biblical principles for financial management and stewardship",
      scriptures: ["Proverbs 3:9-10", "Matthew 6:24", "1 Timothy 6:10"],
    },
  ];
  
  // Sample counseling sessions
  const counselingSessions = [
    {
      id: 1,
      client: "John & Sarah Thompson",
      type: "Marriage",
      date: "2023-05-15T14:00:00",
      status: "Upcoming",
      notes: "Pre-marital counseling, session 3 of 6",
    },
    {
      id: 2,
      client: "Michael Davis",
      type: "Grief",
      date: "2023-05-16T10:30:00",
      status: "Upcoming",
      notes: "Follow-up after father's passing",
    },
    {
      id: 3,
      client: "Rebecca Johnson",
      type: "Anxiety",
      date: "2023-05-12T16:00:00",
      status: "Completed",
      notes: "Made good progress on identifying anxiety triggers",
    },
    {
      id: 4,
      client: "David Wilson",
      type: "Addiction",
      date: "2023-05-10T13:00:00",
      status: "Completed",
      notes: "Discussed accountability structures and scripture memorization",
    },
    {
      id: 5,
      client: "Jennifer & Mark Phillips",
      type: "Parenting",
      date: "2023-05-18T15:30:00",
      status: "Upcoming",
      notes: "Initial consultation for teenage behavioral issues",
    },
  ];
  
  // Handler for adding a new client
  const handleAddClient = () => {
    toast({
      title: "Client added",
      description: "The client has been added to your counseling records.",
    });
    setShowAddClientDialog(false);
  };
  
  // Handler for adding a new resource
  const handleAddResource = () => {
    toast({
      title: "Resource added",
      description: "The counseling resource has been added to your library.",
    });
    setShowAddResourceDialog(false);
  };
  
  // Filter resources based on search query
  const filteredResources = counselingResources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">Biblical Counseling</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">Resources and tools for biblical counseling ministry</p>
      </div>
      
      {/* Quick actions card */}
      <Card className="bg-slate-50 dark:bg-gray-800/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Counseling Dashboard</h2>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Manage sessions, access resources, and track progress
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowAddResourceDialog(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Resource
              </Button>
              <Button onClick={() => setShowAddClientDialog(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Client
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Main content with tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="scripture">Scripture Database</TabsTrigger>
        </TabsList>
        
        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-slate-800 dark:text-white">Counseling Resources</h3>
            <div className="w-full max-w-xs">
              <Input 
                placeholder="Search resources..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map(resource => (
              <Card key={resource.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>
                        {resource.category} • {resource.type}
                      </CardDescription>
                    </div>
                    <div className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300">
                      {resource.type}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {resource.description}
                  </p>
                  <div className="mt-2">
                    <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">KEY SCRIPTURES:</h4>
                    <div className="flex flex-wrap gap-1">
                      {resource.scriptures.map((scripture, idx) => (
                        <span key={idx} className="inline-block px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded text-slate-700 dark:text-slate-300">
                          {scripture}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Sessions Tab */}
        <TabsContent value="sessions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-slate-800 dark:text-white">Counseling Sessions</h3>
            <div className="flex items-center space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sessions</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Sessions List */}
          <div className="space-y-4">
            {counselingSessions.map(session => (
              <Card key={session.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{session.client}</CardTitle>
                      <CardDescription>
                        {new Date(session.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long', 
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric'
                        })} • {session.type} Counseling
                      </CardDescription>
                    </div>
                    <div className={`px-2 py-1 rounded-md text-xs font-medium ${
                      session.status === 'Upcoming' 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                        : session.status === 'Completed'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    }`}>
                      {session.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Session Notes:</span> {session.notes}
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit Notes
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Reschedule
                    </Button>
                    <Button variant={session.status === 'Upcoming' ? 'default' : 'outline'} size="sm" className="flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {session.status === 'Upcoming' ? 'Add Resources' : 'View Resources'}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Scripture Database Tab */}
        <TabsContent value="scripture" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-slate-800 dark:text-white">Scripture Database</h3>
            <div className="w-full max-w-xs">
              <Input placeholder="Search by topic, emotion, or situation..." />
            </div>
          </div>
          
          {/* Scripture Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {counselingAreas.map(area => (
              <Card key={area.id} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <h4 className="font-medium text-slate-800 dark:text-white">{area.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{area.count} passages</p>
                  <Button variant="ghost" size="sm" className="absolute bottom-2 right-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Featured Scripture Section */}
          <Card className="border-primary-100 dark:border-primary-800">
            <CardHeader className="pb-2">
              <CardTitle>Featured Scripture Collection</CardTitle>
              <CardDescription>Verses for comfort and encouragement during difficult times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium text-slate-800 dark:text-white">Isaiah 41:10</h4>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">Anxiety</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic">
                    "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand."
                  </p>
                </div>
                
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium text-slate-800 dark:text-white">Psalm 34:18</h4>
                    <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">Grief</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic">
                    "The LORD is near to the brokenhearted and saves the crushed in spirit."
                  </p>
                </div>
                
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium text-slate-800 dark:text-white">Philippians 4:6-7</h4>
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">Worry</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic">
                    "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus."
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Scripture Collections</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Client Dialog */}
      <Dialog open={showAddClientDialog} onOpenChange={setShowAddClientDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Counseling Client</DialogTitle>
            <DialogDescription>
              Enter the client's information to create a new counseling record.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Client Name</Label>
              <Input id="name" placeholder="Enter client name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Counseling Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select counseling type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marriage">Marriage & Family</SelectItem>
                  <SelectItem value="grief">Grief & Loss</SelectItem>
                  <SelectItem value="addiction">Addiction Recovery</SelectItem>
                  <SelectItem value="depression">Depression & Anxiety</SelectItem>
                  <SelectItem value="financial">Financial Stewardship</SelectItem>
                  <SelectItem value="spiritual">Spiritual Growth</SelectItem>
                  <SelectItem value="parenting">Parenting</SelectItem>
                  <SelectItem value="conflict">Conflict Resolution</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Session Date</Label>
              <Input id="date" type="datetime-local" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Initial Notes</Label>
              <Textarea id="notes" placeholder="Enter initial notes about the counseling need" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddClient}>Add Client</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Resource Dialog */}
      <Dialog open={showAddResourceDialog} onOpenChange={setShowAddResourceDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Counseling Resource</DialogTitle>
            <DialogDescription>
              Enter the resource details to add to your counseling library.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Resource Title</Label>
              <Input id="title" placeholder="Enter resource title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marriage">Marriage & Family</SelectItem>
                  <SelectItem value="grief">Grief & Loss</SelectItem>
                  <SelectItem value="addiction">Addiction Recovery</SelectItem>
                  <SelectItem value="depression">Depression & Anxiety</SelectItem>
                  <SelectItem value="financial">Financial Stewardship</SelectItem>
                  <SelectItem value="spiritual">Spiritual Growth</SelectItem>
                  <SelectItem value="parenting">Parenting</SelectItem>
                  <SelectItem value="conflict">Conflict Resolution</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Resource Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="guide">Guide</SelectItem>
                  <SelectItem value="study">Study</SelectItem>
                  <SelectItem value="framework">Framework</SelectItem>
                  <SelectItem value="worksheet">Worksheet</SelectItem>
                  <SelectItem value="book">Book Reference</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter resource description" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="scriptures">Key Scriptures</Label>
              <Input id="scriptures" placeholder="e.g. John 3:16, Romans 8:28" />
              <p className="text-xs text-slate-500">Separate multiple references with commas</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddResource}>Add Resource</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}