import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function Insights() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("attendance");
  const [timeframe, setTimeframe] = useState("12months");
  
  // Mock data for attendance trends
  const attendanceData = [
    { month: "Jan", count: 256, children: 58, youth: 47, adults: 151 },
    { month: "Feb", count: 245, children: 54, youth: 45, adults: 146 },
    { month: "Mar", count: 267, children: 62, youth: 50, adults: 155 },
    { month: "Apr", count: 293, children: 65, youth: 53, adults: 175 },
    { month: "May", count: 301, children: 67, youth: 55, adults: 179 },
    { month: "Jun", count: 282, children: 64, youth: 52, adults: 166 },
    { month: "Jul", count: 270, children: 60, youth: 48, adults: 162 },
    { month: "Aug", count: 284, children: 63, youth: 51, adults: 170 },
    { month: "Sep", count: 308, children: 68, youth: 56, adults: 184 },
    { month: "Oct", count: 315, children: 70, youth: 58, adults: 187 },
    { month: "Nov", count: 325, children: 72, youth: 60, adults: 193 },
    { month: "Dec", count: 342, children: 76, youth: 63, adults: 203 },
  ];
  
  // Mock data for engagement metrics
  const engagementData = [
    { name: "Sunday Service", percent: 85 },
    { name: "Small Groups", percent: 45 },
    { name: "Bible Studies", percent: 38 },
    { name: "Youth Programs", percent: 60 },
    { name: "Community Service", percent: 32 },
    { name: "Prayer Meetings", percent: 25 },
  ];
  
  // Mock data for age demographics
  const demographicsData = [
    { name: "Children (0-12)", value: 25 },
    { name: "Youth (13-18)", value: 15 },
    { name: "Young Adults (19-35)", value: 30 },
    { name: "Adults (36-65)", value: 20 },
    { name: "Seniors (65+)", value: 10 },
  ];
  
  // Colors for charts
  const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];
  
  // Notification for exporting data
  const handleExportData = () => {
    toast({
      title: "Export initiated",
      description: "Your data export is being prepared and will download shortly.",
    });
  };
  
  // Notification for printing reports
  const handlePrintReport = () => {
    toast({
      title: "Print job sent",
      description: "The report has been sent to your default printer.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">Ministry Insights</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">Analytics and data to help you understand your ministry's impact</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div className="w-full md:w-64">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
              <SelectItem value="5years">Last 5 years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportData}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Data
          </Button>
          <Button variant="outline" onClick={handlePrintReport}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Report
          </Button>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Congregation</CardDescription>
            <CardTitle className="text-3xl">342</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+5.2% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>New Visitors</CardDescription>
            <CardTitle className="text-3xl">27</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+12.8% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Small Group Participation</CardDescription>
            <CardTitle className="text-3xl">45%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
              <span>-2.3% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Volunteer Engagement</CardDescription>
            <CardTitle className="text-3xl">68</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+3.7% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>
        
        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trends</CardTitle>
              <CardDescription>Monthly attendance over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={attendanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#3b82f6" name="Total" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="children" stroke="#f59e0b" name="Children" />
                    <Line type="monotone" dataKey="youth" stroke="#8b5cf6" name="Youth" />
                    <Line type="monotone" dataKey="adults" stroke="#10b981" name="Adults" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Peak Attendance</CardTitle>
                <CardDescription>Highest attendance days</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <span className="font-medium">Christmas Service</span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">415</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <span className="font-medium">Easter Sunday</span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">402</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <span className="font-medium">Thanksgiving Service</span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">375</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <span className="font-medium">Back to School Sunday</span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">358</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Attendance Growth</CardTitle>
                <CardDescription>Year-over-year comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[215px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { year: '2020', attendance: 248 },
                        { year: '2021', attendance: 276 },
                        { year: '2022', attendance: 305 },
                        { year: '2023', attendance: 342 }
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="attendance" fill="#3b82f6" name="Avg. Attendance" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ministry Engagement</CardTitle>
              <CardDescription>Participation in various ministry activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={engagementData}
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip formatter={(value) => [`${value}%`, 'Participation']} />
                    <Bar dataKey="percent" fill="#8b5cf6">
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Hours</CardTitle>
                <CardDescription>Total volunteer hours by ministry</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <span className="font-medium">Children's Ministry</span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">248 hours</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <span className="font-medium">Worship Team</span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">182 hours</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <span className="font-medium">Outreach</span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">156 hours</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <span className="font-medium">Technical Team</span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">124 hours</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Small Group Participation</CardTitle>
                <CardDescription>Active small groups and participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[215px]">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-8">
                      <div>
                        <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">12</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Active Groups</div>
                      </div>
                      <div>
                        <div className="text-4xl font-bold text-secondary-600 dark:text-secondary-400">154</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Participants</div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="bg-slate-100 dark:bg-slate-700 h-2 rounded-full w-full">
                        <div className="bg-primary-500 h-2 rounded-full w-[45%]"></div>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        45% of congregation in small groups
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Demographics Tab */}
        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Age Demographics</CardTitle>
              <CardDescription>Congregation breakdown by age group</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demographicsData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {demographicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Member Tenure</CardTitle>
                <CardDescription>Length of time in the congregation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <span className="font-medium">Less than 1 year</span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">68 members (20%)</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <span className="font-medium">1-5 years</span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">136 members (40%)</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <span className="font-medium">5-10 years</span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">82 members (24%)</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <span className="font-medium">10+ years</span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">56 members (16%)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Geographical Distribution</CardTitle>
                <CardDescription>Where congregants live</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[215px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { area: 'Within 5 miles', count: 205 },
                        { area: '5-10 miles', count: 85 },
                        { area: '10-20 miles', count: 35 },
                        { area: '20+ miles', count: 17 }
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="area" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#10b981" name="Members" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Recommendations Card */}
      <Card className="bg-primary-50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800">
        <CardHeader>
          <CardTitle>Ministry Recommendations</CardTitle>
          <CardDescription>AI-powered insights to help grow your ministry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 dark:text-white">Youth Engagement Opportunity</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                  Your youth attendance has room for growth. Consider implementing more youth-focused events and modern worship elements to increase engagement.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 dark:text-white">Small Group Growth</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                  Only 45% of your congregation participates in small groups. Set a goal to reach 60% participation by introducing new group types and leadership development.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 dark:text-white">New Member Integration</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                  20% of your congregation joined in the last year. Develop a structured onboarding process to help integrate new members and improve retention.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
