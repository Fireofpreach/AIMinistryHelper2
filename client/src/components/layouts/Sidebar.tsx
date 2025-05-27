import { Link, useLocation } from "wouter";
import React from "react";
import { useTheme } from "@/components/ui/theme-provider";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
}

export default function Sidebar({ open, setOpen, isMobile }: SidebarProps) {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <aside 
      className={`${
        isMobile ? 'fixed z-50' : 'relative'
      } transition-all duration-300 ease-in-out w-64 lg:w-72 flex-shrink-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col shadow-xl ${
        isMobile && !open ? '-translate-x-full' : 'translate-x-0'
      }`}
    >
      <div className="p-6 border-b border-sidebar-border/50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
              Shepherd AI
            </h1>
            <p className="text-xs text-sidebar-foreground/70">Ministry Assistant</p>
          </div>
        </div>
        {isMobile && (
          <button 
            className="p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {/* User profile */}
      <div className="p-6 border-b border-sidebar-border/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src="/src/assets/dr_blankenship.jpg" 
              alt="Dr. Perry Blankenship profile" 
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-primary/20 shadow-md" 
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-sidebar-foreground truncate">Dr. Perry Blankenship</h2>
            <p className="text-xs text-sidebar-foreground/70 truncate">Gordon Road Church of God</p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu items */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar py-6">
        <div className="space-y-2 px-4">
          <Link 
            href="/" 
            className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location === "/" 
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="font-medium">Dashboard</span>
          </Link>
          
          <div className="pt-6 pb-2">
            <p className="text-xs font-bold text-sidebar-foreground/50 uppercase tracking-wider px-4">Ministry Tools</p>
          </div>
          
          <Link 
            href="/sermon-assistant" 
            className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location === "/sermon-assistant" 
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="font-medium">Sermon Assistant</span>
          </Link>
          
          <Link 
            href="/theological-comparison" 
            className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location === "/theological-comparison" 
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
            <span className="font-medium">Theological Comparison</span>
          </Link>
          
          <Link 
            href="/apologetics" 
            className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location === "/apologetics" 
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
            </svg>
            <span className="font-medium">Apologetics</span>
          </Link>
          
          <Link 
            href="/biblical-counseling" 
            className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location === "/biblical-counseling" 
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium">Biblical Counseling</span>
          </Link>
          
          <Link 
            href="/calendar" 
            className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location === "/calendar" 
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">Calendar</span>
          </Link>
          
          <Link 
            href="/community" 
            className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location === "/community" 
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="font-medium">Community</span>
          </Link>
          
          <Link 
            href="/resources" 
            className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location === "/resources" 
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span className="font-medium">Resources</span>
          </Link>
          
          <div className="pt-6 pb-2">
            <p className="text-xs font-bold text-sidebar-foreground/50 uppercase tracking-wider px-4">Prayer & Support</p>
          </div>
          
          <Link 
            href="/prayer-requests" 
            className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location === "/prayer-requests" 
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-medium">Prayer Requests</span>
          </Link>
          
          <Link 
            href="/ministry-team" 
            className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location === "/ministry-team" 
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-medium">Ministry Team</span>
          </Link>
          
          <div className="pt-6 pb-2">
            <p className="text-xs font-bold text-sidebar-foreground/50 uppercase tracking-wider px-4">Analytics</p>
          </div>
          
          <Link 
            href="/insights" 
            className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location === "/insights" 
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <span className="font-medium">Ministry Insights</span>
          </Link>
          
          <Link 
            href="/reports" 
            className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location === "/reports" 
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="font-medium">Reports</span>
          </Link>
          
          <div className="pt-6 pb-2">
            <p className="text-xs font-bold text-sidebar-foreground/50 uppercase tracking-wider px-4">Administration</p>
          </div>
          
          <Link 
            href="/user-management" 
            className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location === "/user-management" 
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="font-medium">User Management</span>
          </Link>

          <button 
            onClick={toggleTheme}
            className="group flex items-center space-x-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full mt-8 transition-all duration-200"
          >
            {theme === 'dark' ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </nav>
      
      {/* Sidebar footer */}
      <div className="p-6 border-t border-sidebar-border/50">
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/20 dark:border-amber-800/20">
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600 dark:text-amber-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider">Daily Scripture</p>
          </div>
          <p className="text-sm text-amber-800 dark:text-amber-200 italic scripture leading-relaxed">"For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."</p>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">Jeremiah 29:11</p>
        </div>
      </div>
    </aside>
  );
}
