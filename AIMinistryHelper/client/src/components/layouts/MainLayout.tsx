import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile and close sidebar by default
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar 
        open={sidebarOpen} 
        setOpen={setSidebarOpen}
        isMobile={isMobile}
      />
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Top navigation bar */}
        <header className="glass-effect border-b border-white/20 dark:border-gray-700/50 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              {isMobile && (
                <button 
                  className="mr-4 p-2 rounded-xl hover:bg-white/10 dark:hover:bg-gray-700/50 text-slate-600 dark:text-slate-400 transition-colors"
                  onClick={() => setSidebarOpen(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
              <div>
                <h1 className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Ministry Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="py-2.5 pl-10 pr-4 rounded-xl border border-white/20 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 w-64 text-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm placeholder-slate-400 dark:placeholder-slate-500 transition-all" 
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3.5 top-3 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <button className="relative p-2.5 rounded-xl hover:bg-white/10 dark:hover:bg-gray-700/50 text-slate-600 dark:text-slate-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-red-500 to-rose-500 rounded-full border-2 border-white dark:border-gray-800"></span>
              </button>
              
              <button className="p-2.5 rounded-xl hover:bg-white/10 dark:hover:bg-gray-700/50 text-slate-600 dark:text-slate-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
