import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Skeleton } from "@/components/ui/skeleton";
import { generateSermonIdeas, generateSermonOutline, generateSermonContent } from "@/lib/openai";
import { Badge } from "@/components/ui/badge";
import { Sermon } from "@shared/schema";

export default function SermonAssistant() {
  const { toast } = useToast();
  const userId = 1; // In a real app, this would come from authentication
  
  // State
  const [activeTab, setActiveTab] = useState("ideas");
  const [topic, setTopic] = useState("");
  const [scripture, setScripture] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<{
    title: string;
    scripture: string;
    outline: string[];
  } | null>(null);
  const [sermonIdeas, setSermonIdeas] = useState<{
    title: string;
    scripture: string;
    outline: string[];
  }[]>([]);
  const [detailedOutline, setDetailedOutline] = useState<any>(null);
  const [sermonContent, setSermonContent] = useState("");
  const [sermonTitle, setSermonTitle] = useState("");
  const [sermonScripture, setSermonScripture] = useState("");
  
  // Fetch existing sermons
  const { data: sermons, isLoading: sermonsLoading } = useQuery({
    queryKey: ['/api/sermons', userId],
    queryFn: () => fetch(`/api/sermons?userId=${userId}`).then(res => res.json())
  });
  
  // Generate sermon ideas mutation
  const generateIdeasMutation = useMutation({
    mutationFn: async () => {
      setIsGenerating(true);
      try {
        const response = await generateSermonIdeas({ topic, scripture });
        return response.sermonIdeas;
      } catch (error) {
        throw error;
      } finally {
        setIsGenerating(false);
      }
    },
    onSuccess: (data) => {
      setSermonIdeas(data);
      toast({
        title: "Sermon ideas generated",
        description: "Select an idea to develop further",
      });
    },
    onError: (error) => {
      console.error("Error generating sermon ideas:", error);
      toast({
        title: "Error generating sermon ideas",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  });
  
  // Generate detailed outline mutation
  const generateOutlineMutation = useMutation({
    mutationFn: async () => {
      if (!selectedIdea) return null;
      
      setIsGenerating(true);
      try {
        const response = await generateSermonOutline({
          title: selectedIdea.title,
          scripture: selectedIdea.scripture
        });
        return response;
      } catch (error) {
        throw error;
      } finally {
        setIsGenerating(false);
      }
    },
    onSuccess: (data) => {
      if (data) {
        setDetailedOutline(data);
        setSermonTitle(selectedIdea?.title || "");
        setSermonScripture(selectedIdea?.scripture || "");
        setActiveTab("outline");
        toast({
          title: "Sermon outline generated",
          description: "Now you can edit or generate content",
        });
      }
    },
    onError: (error) => {
      console.error("Error generating sermon outline:", error);
      toast({
        title: "Error generating sermon outline",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  });
  
  // Generate sermon content mutation
  const generateContentMutation = useMutation({
    mutationFn: async (section: string) => {
      if (!detailedOutline) return null;
      
      setIsGenerating(true);
      try {
        const outlineText = JSON.stringify(detailedOutline);
        const response = await generateSermonContent({
          title: sermonTitle,
          scripture: sermonScripture,
          section,
          outline: outlineText
        });
        return response;
      } catch (error) {
        throw error;
      } finally {
        setIsGenerating(false);
      }
    },
    onSuccess: (data) => {
      if (data) {
        setSermonContent(prev => prev ? `${prev}\n\n${data}` : data);
        setActiveTab("content");
        toast({
          title: "Content generated",
          description: "You can now edit the content or generate more sections",
        });
      }
    },
    onError: (error) => {
      console.error("Error generating sermon content:", error);
      toast({
        title: "Error generating content",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  });
  
  // Save sermon mutation
  const saveSermonMutation = useMutation({
    mutationFn: async () => {
      const outlineData = detailedOutline || { 
        introduction: "",
        mainPoints: selectedIdea?.outline.map(point => ({ title: point })) || [],
        conclusion: ""
      };
      
      const sermonData = {
        title: sermonTitle,
        scripture: sermonScripture,
        content: sermonContent,
        outline: outlineData,
        date: new Date().toISOString(),
        userId
      };
      
      const response = await apiRequest("POST", "/api/sermons", sermonData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sermons'] });
      toast({
        title: "Sermon saved",
        description: "Your sermon has been saved successfully",
      });
    },
    onError: (error) => {
      console.error("Error saving sermon:", error);
      toast({
        title: "Error saving sermon",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  });
  
  const handleSelectIdea = (idea: any) => {
    setSelectedIdea(idea);
  };
  
  const handleGenerateIdeas = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic && !scripture) {
      toast({
        title: "Input required",
        description: "Please enter a topic or scripture reference",
        variant: "destructive",
      });
      return;
    }
    
    generateIdeasMutation.mutate();
  };
  
  const handleGenerateOutline = () => {
    if (!selectedIdea) {
      toast({
        title: "No idea selected",
        description: "Please select a sermon idea first",
        variant: "destructive",
      });
      return;
    }
    
    generateOutlineMutation.mutate();
  };
  
  const handleGenerateIntroduction = () => {
    generateContentMutation.mutate("introduction");
  };
  
  const handleGenerateMainPoint = (pointIndex: number) => {
    generateContentMutation.mutate(`main point ${pointIndex + 1}`);
  };
  
  const handleGenerateConclusion = () => {
    generateContentMutation.mutate("conclusion");
  };
  
  const handleSaveSermon = () => {
    if (!sermonTitle || !sermonScripture) {
      toast({
        title: "Missing information",
        description: "Please provide a title and scripture reference",
        variant: "destructive",
      });
      return;
    }
    
    saveSermonMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">Sermon Assistant</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">AI-powered tools to help you prepare and write sermons</p>
        </div>
        
        {/* Existing sermons dropdown - simplified for this implementation */}
        <div className="w-full md:w-72">
          <select 
            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-gray-800 text-slate-800 dark:text-white"
            disabled={sermonsLoading}
          >
            <option value="">Load existing sermon...</option>
            {!sermonsLoading && sermons && sermons.map((sermon: Sermon) => (
              <option key={sermon.id} value={sermon.id}>{sermon.title}</option>
            ))}
          </select>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="ideas">1. Ideas</TabsTrigger>
          <TabsTrigger value="outline" disabled={!selectedIdea}>2. Outline</TabsTrigger>
          <TabsTrigger value="content" disabled={!detailedOutline}>3. Content</TabsTrigger>
        </TabsList>
        
        {/* Ideas Tab */}
        <TabsContent value="ideas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Sermon Ideas</CardTitle>
              <CardDescription>
                Enter a topic or scripture reference to generate sermon ideas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerateIdeas} className="space-y-4">
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Topic (Optional)
                  </label>
                  <Input
                    id="topic"
                    placeholder="e.g. Faith, Hope, Love, Forgiveness"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="scripture" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Scripture Reference (Optional)
                  </label>
                  <Input
                    id="scripture"
                    placeholder="e.g. John 3:16, Romans 8:28"
                    value={scripture}
                    onChange={(e) => setScripture(e.target.value)}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={generateIdeasMutation.isPending || (!topic && !scripture)}
                >
                  {generateIdeasMutation.isPending ? "Generating..." : "Generate Sermon Ideas"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Generated Ideas */}
          {generateIdeasMutation.isPending ? (
            <Card>
              <CardHeader>
                <CardTitle>Generating Ideas...</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ) : sermonIdeas.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Sermon Ideas</CardTitle>
                <CardDescription>
                  Select an idea to develop further
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sermonIdeas.map((idea, index) => (
                  <div 
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      selectedIdea === idea 
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" 
                        : "border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700"
                    }`}
                    onClick={() => handleSelectIdea(idea)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-slate-900 dark:text-white">{idea.title}</h3>
                      <Badge variant="outline">{idea.scripture}</Badge>
                    </div>
                    <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      <p className="font-medium">Outline:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {idea.outline.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
                
                {selectedIdea && (
                  <Button 
                    className="w-full mt-4"
                    onClick={handleGenerateOutline}
                    disabled={generateOutlineMutation.isPending}
                  >
                    {generateOutlineMutation.isPending ? "Generating Outline..." : "Develop Selected Idea"}
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : null}
        </TabsContent>
        
        {/* Outline Tab */}
        <TabsContent value="outline" className="space-y-4">
          {generateOutlineMutation.isPending ? (
            <Card>
              <CardHeader>
                <CardTitle>Generating Detailed Outline...</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
              </CardContent>
            </Card>
          ) : detailedOutline ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{sermonTitle}</CardTitle>
                    <CardDescription>{sermonScripture}</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("content")} 
                    className="ml-2"
                  >
                    Next: Write Content
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">
                    Introduction
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">
                    {detailedOutline.introduction}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">
                    Main Points
                  </h3>
                  <div className="space-y-4">
                    {detailedOutline.mainPoints.map((point: any, index: number) => (
                      <div key={index} className="border-l-4 border-primary-500 dark:border-primary-400 pl-4 py-1">
                        <h4 className="font-medium text-slate-800 dark:text-white">
                          {index + 1}. {point.title}
                        </h4>
                        
                        {point.subPoints && point.subPoints.length > 0 && (
                          <ul className="list-disc list-inside mt-2 text-slate-600 dark:text-slate-300 space-y-1">
                            {point.subPoints.map((subPoint: string, i: number) => (
                              <li key={i}>{subPoint}</li>
                            ))}
                          </ul>
                        )}
                        
                        {point.illustration && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Illustration:</p>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{point.illustration}</p>
                          </div>
                        )}
                        
                        {point.application && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Application:</p>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{point.application}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">
                    Conclusion
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">
                    {detailedOutline.conclusion}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : selectedIdea ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedIdea.title}</CardTitle>
                <CardDescription>{selectedIdea.scripture}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-white mb-2">Basic Outline</h3>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                      {selectedIdea.outline.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    onClick={handleGenerateOutline}
                  >
                    Generate Detailed Outline
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </TabsContent>
        
        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <CardTitle>
                    <Input 
                      value={sermonTitle} 
                      onChange={(e) => setSermonTitle(e.target.value)} 
                      className="text-xl font-bold mt-1"
                      placeholder="Sermon Title"
                    />
                  </CardTitle>
                  <Input 
                    value={sermonScripture} 
                    onChange={(e) => setSermonScripture(e.target.value)} 
                    className="mt-2 text-slate-500 dark:text-slate-400"
                    placeholder="Scripture Reference"
                  />
                </div>
                <Button 
                  onClick={handleSaveSermon}
                  disabled={saveSermonMutation.isPending || !sermonTitle || !sermonScripture}
                >
                  {saveSermonMutation.isPending ? "Saving..." : "Save Sermon"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-slate-800 dark:text-white">
                    Write Your Sermon
                  </h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleGenerateIntroduction}
                      disabled={generateContentMutation.isPending}
                    >
                      Generate Intro
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleGenerateConclusion}
                      disabled={generateContentMutation.isPending}
                    >
                      Generate Conclusion
                    </Button>
                  </div>
                </div>
                <Textarea 
                  value={sermonContent}
                  onChange={(e) => setSermonContent(e.target.value)}
                  placeholder="Write or generate your sermon content here..."
                  className="min-h-[400px] font-serif"
                />
              </div>
              
              {detailedOutline && detailedOutline.mainPoints && (
                <div className="bg-slate-50 dark:bg-gray-800 rounded-lg p-4 border border-slate-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-slate-800 dark:text-white mb-2">
                    Generate Main Points
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {detailedOutline.mainPoints.map((point: any, index: number) => (
                      <Button 
                        key={index}
                        variant="outline" 
                        size="sm"
                        onClick={() => handleGenerateMainPoint(index)}
                        disabled={generateContentMutation.isPending}
                      >
                        Point {index + 1}: {point.title.substring(0, 20)}...
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {generateContentMutation.isPending && (
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg border border-primary-200 dark:border-primary-800">
                  <p className="text-primary-700 dark:text-primary-300 animate-pulse">
                    Generating content... This may take a moment.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
