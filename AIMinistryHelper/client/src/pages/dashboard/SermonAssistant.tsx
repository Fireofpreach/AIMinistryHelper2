import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Sermon } from "@shared/schema";

interface SermonAssistantProps {
  sermon: Sermon | null;
  isLoading: boolean;
}

export default function SermonAssistant({ sermon, isLoading }: SermonAssistantProps) {
  const [searchTopic, setSearchTopic] = useState("");
  
  const popularTopics = [
    "John 3:16",
    "Spiritual Growth",
    "Prayer",
    "Community",
    "Faith & Doubt"
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-medium text-slate-800 dark:text-white">AI Sermon Assistant</h3>
        <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>
      
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        ) : sermon ? (
          <div className="bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-100 dark:border-secondary-800 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-800 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-700 dark:text-secondary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-1">Continue Your Sunday Sermon</h4>
                <p className="text-sm text-secondary-700 dark:text-secondary-300 mb-3">Topic: "{sermon.title}" - {sermon.scripture}</p>
                <div className="flex space-x-2">
                  <Button className="bg-secondary-600 hover:bg-secondary-700 text-white">
                    <Link href="/sermon-assistant">Continue Writing</Link>
                  </Button>
                  <Button variant="outline" className="bg-white dark:bg-gray-800 border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300">
                    See Outline
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Start a new sermon with AI assistance:</h4>
        
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Enter sermon topic or scripture reference..."
            value={searchTopic}
            onChange={(e) => setSearchTopic(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {popularTopics.map((topic, index) => (
            <button
              key={index}
              className="bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-full text-sm"
              onClick={() => setSearchTopic(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
        
        <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium">
          <Link href="/sermon-assistant">Generate Sermon Ideas</Link>
        </Button>
      </div>
    </div>
  );
}
