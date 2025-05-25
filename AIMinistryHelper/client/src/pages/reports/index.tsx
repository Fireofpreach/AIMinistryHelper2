import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function Reports() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("ministry");
  const [showGenerateReportDialog, setShowGenerateReportDialog] = useState(false);
  const [reportSettings, setReportSettings] = useState({
    type: "ministry",
    period: "lastMonth",
    format: "pdf",
    includeCharts: true,
    includeMetrics: true,
    includeComments: false
  });
  
  // Sample reports data
  const ministryReports = [
    { id: 1, title: "Monthly Ministry Overview", date: "2023-05-15", type: "Monthly", author: "Pastor", pages: 12 },
    { id: 5, title: "Annual Ministry Review", date: "2023-01-05", type: "Annual", author: "Pastor", pages: 42 },
  ];
  
  const financialReports = [
    { id: 1, title: "Monthly Financial Statement", date: "2023-05-10", type: "Monthly", author: "Pastor Perry", pages: 10 },
    { id: 2, title: "Quarterly Budget Analysis", date: "2023-04-05", type: "Quarterly", author: "Pastor Perry", pages: 18 },
    { id: 3, title: "Building Fund Update", date: "2023-03-15", type: "Special", author: "Pastor Perry", pages: 6 },
    { id: 4, title: "Annual Financial Report", date: "2023-01-10", type: "Annual", author: "Pastor Perry", pages: 36 },
  ];
  
  const attendanceReports = [
    { id: 1, title: "Weekly Attendance Summary", date: "2023-05-14", type: "Weekly", author: "Pastor", pages: 4 },
    { id: 2, title: "Monthly Attendance Trends", date: "2023-05-03", type: "Monthly", author: "Pastor", pages: 8 },
    { id: 3, title: "Youth Group Attendance", date: "2023-04-20", type: "Special", author: "Pastor", pages: 6 },
    { id: 4, title: "Quarterly Attendance Analysis", date: "2023-04-02", type: "Quarterly", author: "Pastor", pages: 14 },
    { id: 5, title: "Special Events Attendance", date: "2023-03-25", type: "Special", author: "Pastor", pages: 7 },
  ];
  
  // Function to handle downloading a report
  const handleDownloadReport = (report: any) => {
    toast({
      title: "Report downloaded",
      description: `${report.title} has been downloaded.`,
    });
  };
  
  // Function to handle sharing a report
  const handleShareReport = (report: any) => {
    toast({
      title: "Report shared",
      description: `${report.title} has been shared.`,
    });
  };
  
  // Function to handle printing a report
  const handlePrintReport = (report: any) => {
    toast({
      title: "Report sent to printer",
      description: `${report.title} is being printed.`,
    });
  };
  
  // Function to handle generating a new report
  const handleGenerateReport = () => {
    toast({
      title: "Report generation started",
      description: "Your report is being generated and will be ready shortly.",
    });
    
    setShowGenerateReportDialog(false);
  };
  
  // Helper function to render reports
  const renderReports = (reports: any[]) => {
    return (
      <div className="space-y-4">
        {reports.map(report => (
          <Card key={report.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{report.title}</CardTitle>
                  <CardDescription>
                    {format(new Date(report.date), "MMMM d, yyyy")} • {report.type} Report • {report.pages} pages
                  </CardDescription>
                </div>
                <div className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300">
                  {report.type}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Created by {report.author}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2 w-full">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleDownloadReport(report)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleShareReport(report)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handlePrintReport(report)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">Reports</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">Access and generate reports about your ministry</p>
      </div>
      
      {/* Quick actions */}
      <Card className="bg-slate-50 dark:bg-gray-800/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Generate Reports</h2>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Create custom reports for ministry insights and planning
              </p>
            </div>
            <Button onClick={() => setShowGenerateReportDialog(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generate New Report
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Reports tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="ministry">Ministry</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ministry" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-slate-800 dark:text-white">Ministry Reports</h3>
            <div className="flex items-center space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="special">Special</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {renderReports(ministryReports)}
        </TabsContent>
        
        <TabsContent value="financial" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-slate-800 dark:text-white">Financial Reports</h3>
            <div className="flex items-center space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="special">Special</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {renderReports(financialReports)}
        </TabsContent>
        
        <TabsContent value="attendance" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-slate-800 dark:text-white">Attendance Reports</h3>
            <div className="flex items-center space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="special">Special</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {renderReports(attendanceReports)}
        </TabsContent>
      </Tabs>
      
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions on reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium text-slate-800 dark:text-white">Pastor John downloaded Monthly Ministry Overview</h4>
                  <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">2 hours ago</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Downloaded the report in PDF format
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium text-slate-800 dark:text-white">Sarah Miller generated a new Special Report</h4>
                  <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">Yesterday</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Created "Worship Team Performance Analysis" report
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium text-slate-800 dark:text-white">David Wilson shared Financial Report</h4>
                  <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">2 days ago</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Shared with finance committee members via email
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium text-slate-800 dark:text-white">Jennifer Clark printed Attendance Report</h4>
                  <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">3 days ago</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Printed 5 copies for ministry team meeting
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Generate Report Dialog */}
      <Dialog open={showGenerateReportDialog} onOpenChange={setShowGenerateReportDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generate New Report</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleGenerateReport(); }}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="reportType">Report Type</Label>
                <Select
                  value={reportSettings.type}
                  onValueChange={(value) => setReportSettings({ ...reportSettings, type: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ministry">Ministry Overview</SelectItem>
                    <SelectItem value="financial">Financial Report</SelectItem>
                    <SelectItem value="attendance">Attendance Report</SelectItem>
                    <SelectItem value="custom">Custom Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="period">Time Period</Label>
                <Select
                  value={reportSettings.period}
                  onValueChange={(value) => setReportSettings({ ...reportSettings, period: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lastWeek">Last Week</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                    <SelectItem value="lastYear">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="format">Output Format</Label>
                <Select
                  value={reportSettings.format}
                  onValueChange={(value) => setReportSettings({ ...reportSettings, format: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="word">Word Document</SelectItem>
                    <SelectItem value="web">Web Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Report Options</Label>
                <div className="flex flex-col space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeCharts" 
                      checked={reportSettings.includeCharts}
                      onCheckedChange={(checked) => 
                        setReportSettings({ 
                          ...reportSettings, 
                          includeCharts: checked as boolean 
                        })
                      }
                    />
                    <Label htmlFor="includeCharts" className="text-sm font-normal cursor-pointer">Include charts and visualizations</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeMetrics" 
                      checked={reportSettings.includeMetrics}
                      onCheckedChange={(checked) => 
                        setReportSettings({ 
                          ...reportSettings, 
                          includeMetrics: checked as boolean 
                        })
                      }
                    />
                    <Label htmlFor="includeMetrics" className="text-sm font-normal cursor-pointer">Include key metrics and KPIs</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeComments" 
                      checked={reportSettings.includeComments}
                      onCheckedChange={(checked) => 
                        setReportSettings({ 
                          ...reportSettings, 
                          includeComments: checked as boolean 
                        })
                      }
                    />
                    <Label htmlFor="includeComments" className="text-sm font-normal cursor-pointer">Include AI-generated analysis and comments</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowGenerateReportDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Generate Report
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
