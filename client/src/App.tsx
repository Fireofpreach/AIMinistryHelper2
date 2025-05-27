import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import MainLayout from "@/components/layouts/MainLayout";
import Dashboard from "@/pages/dashboard";
import SermonAssistant from "@/pages/sermon-assistant";
import Calendar from "@/pages/calendar";
import Community from "@/pages/community";
import Resources from "@/pages/resources";
import PrayerRequests from "@/pages/prayer-requests";
import MinistryTeam from "@/pages/ministry-team";
import Insights from "@/pages/insights";
import Reports from "@/pages/reports";
import BiblicalCounseling from "@/pages/biblical-counseling";
import TheologicalComparison from "@/pages/theological-comparison";
import Apologetics from "@/pages/apologetics";
import UserManagement from "@/pages/user-management";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/sermon-assistant" component={SermonAssistant} />
      <Route path="/theological-comparison" component={TheologicalComparison} />
      <Route path="/apologetics" component={Apologetics} />
      <Route path="/biblical-counseling" component={BiblicalCounseling} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/community" component={Community} />
      <Route path="/resources" component={Resources} />
      <Route path="/prayer-requests" component={PrayerRequests} />
      <Route path="/ministry-team" component={MinistryTeam} />
      <Route path="/insights" component={Insights} />
      <Route path="/reports" component={Reports} />
      <Route path="/user-management" component={UserManagement} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <MainLayout>
          <Router />
        </MainLayout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
