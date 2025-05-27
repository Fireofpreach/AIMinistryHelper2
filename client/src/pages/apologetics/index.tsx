import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function Apologetics() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("realtime");
  const [query, setQuery] = useState("");
  const [showAddResourceDialog, setShowAddResourceDialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  // Sample apologetics categories
  const categories = [
    { id: "existence", name: "Existence of God", count: 24 },
    { id: "suffering", name: "Problem of Evil/Suffering", count: 18 },
    { id: "reliability", name: "Biblical Reliability", count: 22 },
    { id: "resurrection", name: "Resurrection of Jesus", count: 16 },
    { id: "science", name: "Science and Faith", count: 20 },
    { id: "morality", name: "Objective Morality", count: 15 },
    { id: "religions", name: "World Religions", count: 19 },
    { id: "trinity", name: "The Trinity", count: 12 },
  ];

  // Sample resources (kept as-is)
  const resources = [
    {
      id: 1,
      title: "Evidence for the Resurrection",
      category: "Resurrection of Jesus",
      author: "William Lane Craig",
      type: "Article",
      summary:
        "A scholarly examination of historical evidence for the resurrection of Jesus Christ, addressing common objections and alternative theories.",
      keyPoints: [
        "Empty tomb is attested by multiple independent sources",
        "Post-resurrection appearances were witnessed by groups, not just individuals",
        "Early Christian proclamation began in Jerusalem, where the crucifixion occurred",
        "Transformation of the disciples into bold proclaimers despite threat of death",
      ],
    },
    {
      id: 2,
      title: "The Problem of Pain",
      category: "Problem of Evil/Suffering",
      author: "C.S. Lewis",
      type: "Book Summary",
      summary:
        "Lewis examines the question of why God allows suffering and pain in a world He created, offering a philosophical and theological framework for understanding suffering.",
      keyPoints: [
        "Human free will necessitates the possibility of evil choices",
        "Pain serves as a warning system in the physical world",
        "Suffering can lead to spiritual growth and dependence on God",
        "God's ultimate goodness is compatible with temporary suffering",
      ],
    },
    {
      id: 3,
      title: "The Kalam Cosmological Argument",
      category: "Existence of God",
      author: "William Lane Craig",
      type: "Argument",
      summary:
        "A philosophical argument for God's existence based on the beginning of the universe and the principle of causality.",
      keyPoints: [
        "Whatever begins to exist has a cause",
        "The universe began to exist (supported by Big Bang cosmology)",
        "Therefore, the universe has a cause",
        "This cause must be timeless, spaceless, immaterial, powerful, and personal",
      ],
    },
    {
      id: 4,
      title: "The Historical Reliability of the Gospels",
      category: "Biblical Reliability",
      author: "Craig Blomberg",
      type: "Book Summary",
      summary:
        "An examination of the historical reliability of the Gospel accounts, addressing common criticisms and demonstrating their trustworthiness.",
      keyPoints: [
        "Early dating of gospel manuscripts (within lifetime of eyewitnesses)",
        "Archaeological confirmations of names, places, and customs",
        "Internal consistency of accounts despite different perspectives",
        "Inclusion of embarrassing details unlikely in fictional accounts",
      ],
    },
    {
      id: 5,
      title: "The Moral Argument for God",
      category: "Objective Morality",
      author: "C.S. Lewis",
      type: "Argument",
      summary:
        "An argument for God's existence based on the reality of objective moral values and duties in the world.",
      keyPoints: [
        "If objective moral values exist, God exists",
        "Objective moral values do exist (moral relativism is self-defeating)",
        "Therefore, God exists",
        "Moral law requires a moral lawgiver",
      ],
    },
  ];

  // Submit handler for real-time apologetics
  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setApiResponse(null);

    try {
      const response = await fetch("/api/apologetics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });
      const data = await response.json();
      setApiResponse(data.answer || "No answer found.");

      toast({
        title: "Response generated",
        description: "Apologetic response has been generated based on your query.",
      });
    } catch (error) {
      setApiResponse("There was an error generating the response.");
      toast({
        title: "Error",
        description: "Failed to generate apologetic response.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddResource = () => {
    toast({
      title: "Resource added",
      description: "The apologetics resource has been added to your library.",
    });
    setShowAddResourceDialog(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">Apologetics Assistant</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">
          Tools and resources for defending the faith in real-time
        </p>
      </div>

      {/* Quick actions card */}
      <Card className="bg-slate-50 dark:bg-gray-800/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Apologetics Assistant</h2>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Access apologetics resources and generate real-time responses to objections
              </p>
            </div>
            <Button onClick={() => setShowAddResourceDialog(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Resource
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main content with tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="realtime">Real-Time Defense</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
        </TabsList>

        {/* Real-Time Defense Tab */}
        <TabsContent value="realtime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Apologetics</CardTitle>
              <CardDescription>Generate responses to common objections to the Christian faith</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleQuerySubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue="existence">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="existence">Existence of God</SelectItem>
                      <SelectItem value="suffering">Problem of Evil/Suffering</SelectItem>
                      <SelectItem value="reliability">Biblical Reliability</SelectItem>
                      <SelectItem value="resurrection">Resurrection of Jesus</SelectItem>
                      <SelectItem value="science">Science and Faith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="query">Objection or Question</Label>
                  <Textarea
                    id="query"
                    placeholder="Enter the objection or question you need to respond to..."
                    className="min-h-[100px]"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audience">Audience</Label>
                  <Select defaultValue="layperson">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select audience type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="layperson">General Audience (Layperson)</SelectItem>
                      <SelectItem value="academic">Academic/Scholarly</SelectItem>
                      <SelectItem value="skeptic">Skeptical/Atheist</SelectItem>
                      <SelectItem value="youth">Youth/Student</SelectItem>
                      <SelectItem value="religious">Other Religious Background</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Response...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Generate Response
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Dynamic API Response */}
          {apiResponse && (
            <Card>
              <CardHeader>
                <CardTitle>Response</CardTitle>
                <CardDescription>Here's how to respond to the objection</CardDescription>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <div className="whitespace-pre-line text-slate-600 dark:text-slate-300">
                  {apiResponse}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-slate-800 dark:text-white">Apologetics Resources</h3>
            <div className="w-full max-w-xs">
              <Input placeholder="Search resources..." />
            </div>
          </div>
          <div className="space-y-4">
            {resources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{resource.title}</CardTitle>
                      <CardDescription>
                        {resource.author} • {resource.category} • {resource.type}
                      </CardDescription>
                    </div>
                    <div className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300">
                      {resource.type}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {resource.summary}
                  </p>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">KEY POINTS:</h4>
                    <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      {resource.keyPoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Full Resource
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Topics Tab */}
        <TabsContent value="topics" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-slate-800 dark:text-white">Apologetics Topics</h3>
            <div className="w-full max-w-xs">
              <Input placeholder="Search topics..." />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <h4 className="font-medium text-slate-800 dark:text-white">{category.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{category.count} resources</p>
                  <Button variant="ghost" size="sm" className="absolute bottom-2 right-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Featured Topic */}
          <Card className="border-primary-100 dark:border-primary-800">
            <CardHeader>
              <CardTitle>Featured Topic: The Problem of Evil</CardTitle>
              <CardDescription>Understanding and responding to the most common objection to the Christian faith</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-300">
                  The problem of evil and suffering is perhaps the most emotionally and intellectually challenging objection to the Christian faith. It asks: If God is all-good (omnibenevolent), all-knowing (omniscient), and all-powerful (omnipotent), how can evil and suffering exist?
                </p>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <h4 className="font-medium text-slate-800 dark:text-white mb-2">Key Approaches:</h4>
                  <ul className="list-disc pl-5 text-slate-600 dark:text-slate-300 space-y-1">
                    <li><span className="font-medium">Free Will Defense</span>: God's desire for genuine love and relationship necessitates free beings who can choose evil</li>
                    <li><span className="font-medium">Soul-Making Theodicy</span>: Suffering creates the conditions for spiritual and moral growth</li>
                    <li><span className="font-medium">Greater Good Defense</span>: God permits some evils to accomplish greater goods we may not comprehend</li>
                    <li><span className="font-medium">The Cross</span>: Christianity uniquely offers a God who enters into and experiences suffering with us</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <h4 className="font-medium text-slate-800 dark:text-white mb-2">Key Scriptures:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">Romans 8:28</span>
                    <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">James 1:2-4</span>
                    <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">2 Corinthians 4:17</span>
                    <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">Romans 5:3-5</span>
                    <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">Job 38-42</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <h4 className="font-medium text-slate-800 dark:text-white mb-2">Key Resources:</h4>
                  <ul className="list-disc pl-5 text-slate-600 dark:text-slate-300 space-y-1">
                    <li>"The Problem of Pain" by C.S. Lewis</li>
                    <li>"Walking with God through Pain and Suffering" by Timothy Keller</li>
                    <li>"God, Freedom, and Evil" by Alvin Plantinga</li>
                    <li>"Where Was God on 9/11?" by John Blanchard</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Resources on this Topic</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Resource Dialog */}
      <Dialog open={showAddResourceDialog} onOpenChange={setShowAddResourceDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Apologetics Resource</DialogTitle>
            <DialogDescription>
              Enter the resource details to add to your apologetics library.
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
                  <SelectItem value="existence">Existence of God</SelectItem>
                  <SelectItem value="suffering">Problem of Evil/Suffering</SelectItem>
                  <SelectItem value="reliability">Biblical Reliability</SelectItem>
                  <SelectItem value="resurrection">Resurrection of Jesus</SelectItem>
                  <SelectItem value="science">Science and Faith</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" placeholder="Enter author name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Resource Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="book">Book</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="argument">Argument</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" placeholder="Enter resource summary" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="keypoints">Key Points (one per line)</Label>
              <Textarea id="keypoints" placeholder="Enter key points, one per line" />
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
