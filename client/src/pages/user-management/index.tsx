import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { User } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function UserManagement() {
  const { toast } = useToast();
  const userId = 1; // In a real app, this would come from authentication
  
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [showInviteUserDialog, setShowInviteUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    password: "",
    church: "",
    isAdmin: false,
    isActive: true,
    invitedBy: userId
  });
  
  // Fetch users
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['/api/users'],
    queryFn: () => fetch('/api/users').then(res => res.json())
  });
  
  // Invite user mutation
  const inviteUserMutation = useMutation({
    mutationFn: async (user: any) => {
      const response = await apiRequest("POST", "/api/users/invite", user);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
      setShowInviteUserDialog(false);
      resetNewUser();
      toast({
        title: "User invited",
        description: "The user has been invited successfully",
      });
    },
    onError: (error) => {
      console.error("Error inviting user:", error);
      toast({
        title: "Error inviting user",
        description: "There was an error inviting the user",
        variant: "destructive",
      });
    }
  });
  
  // Toggle user status mutation
  const toggleUserStatusMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number, isActive: boolean }) => {
      const response = await apiRequest("PATCH", `/api/users/${id}/status`, { isActive });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
      toast({
        title: "User status updated",
        description: "The user's status has been updated successfully",
      });
    },
    onError: (error) => {
      console.error("Error updating user status:", error);
      toast({
        title: "Error updating user status",
        description: "There was an error updating the user's status",
        variant: "destructive",
      });
    }
  });
  
  // Toggle admin status mutation
  const toggleAdminStatusMutation = useMutation({
    mutationFn: async ({ id, isAdmin }: { id: number, isAdmin: boolean }) => {
      const response = await apiRequest("PATCH", `/api/users/${id}/admin`, { isAdmin });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
      toast({
        title: "Admin status updated",
        description: "The user's admin status has been updated successfully",
      });
    },
    onError: (error) => {
      console.error("Error updating admin status:", error);
      toast({
        title: "Error updating admin status",
        description: "There was an error updating the admin status",
        variant: "destructive",
      });
    }
  });
  
  // Reset new user form
  const resetNewUser = () => {
    setNewUser({
      name: "",
      username: "",
      password: "",
      church: "",
      isAdmin: false,
      isActive: true,
      invitedBy: userId
    });
  };
  
  // Filter users based on search term
  const filteredUsers = React.useMemo(() => {
    if (!users) return [];
    
    return users.filter((user: User) => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.church && user.church.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [users, searchTerm]);
  
  // Handle inviting new user
  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUser.name || !newUser.username || !newUser.password) {
      toast({
        title: "Missing information",
        description: "Please provide a name, username, and password",
        variant: "destructive",
      });
      return;
    }
    
    inviteUserMutation.mutate(newUser);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">User Management</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">Manage user access to your ministry tool</p>
      </div>
      
      <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full text-blue-700 dark:text-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-blue-800 dark:text-blue-300">Secure Access Control</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">You have full control over who can access your ministry tool. Only you can grant or revoke access.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div className="relative w-full md:w-72">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <Button onClick={() => setShowInviteUserDialog(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Invite User
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>User Access</CardTitle>
          <CardDescription>Manage who can access your ministry tool</CardDescription>
        </CardHeader>
        <CardContent>
          {usersLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Church</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user: any) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.church || "—"}</TableCell>
                        <TableCell>
                          {user.isAdmin ? (
                            <Badge className="bg-purple-500 hover:bg-purple-600">Administrator</Badge>
                          ) : (
                            <Badge variant="outline">User</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {user.isActive ? (
                            <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                          ) : (
                            <Badge variant="outline" className="text-slate-500">Inactive</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center space-x-2">
                            {/* Don't allow modifying your own account */}
                            {user.id !== userId && (
                              <>
                                <div className="flex items-center space-x-2">
                                  <Switch 
                                    id={`user-active-${user.id}`}
                                    checked={user.isActive}
                                    onCheckedChange={(checked) => 
                                      toggleUserStatusMutation.mutate({ id: user.id, isActive: checked })
                                    }
                                  />
                                  <Label htmlFor={`user-active-${user.id}`}>Active</Label>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <Switch 
                                    id={`user-admin-${user.id}`}
                                    checked={user.isAdmin}
                                    onCheckedChange={(checked) => 
                                      toggleAdminStatusMutation.mutate({ id: user.id, isAdmin: checked })
                                    }
                                  />
                                  <Label htmlFor={`user-admin-${user.id}`}>Admin</Label>
                                </div>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Invite User Dialog */}
      <Dialog open={showInviteUserDialog} onOpenChange={setShowInviteUserDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Invite New User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleInviteUser}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Temporary Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="mt-1"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">The user will be asked to change this on first login</p>
              </div>
              
              <div>
                <Label htmlFor="church">Church (Optional)</Label>
                <Input
                  id="church"
                  value={newUser.church || ""}
                  onChange={(e) => setNewUser({ ...newUser, church: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="is-admin"
                  checked={newUser.isAdmin}
                  onCheckedChange={(checked) => setNewUser({ ...newUser, isAdmin: checked })}
                />
                <Label htmlFor="is-admin">Make this user an administrator</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setShowInviteUserDialog(false);
                resetNewUser();
              }}>
                Cancel
              </Button>
              <Button type="submit" disabled={inviteUserMutation.isPending}>
                {inviteUserMutation.isPending ? "Inviting..." : "Invite User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}