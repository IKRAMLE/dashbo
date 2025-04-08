import { useState, useEffect } from 'react';
import { 
  Users as UsersIcon, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import AdminLayout from '@/layouts/AdminLayout';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortField === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortField === 'role') {
      return sortDirection === 'asc'
        ? a.role.localeCompare(b.role)
        : b.role.localeCompare(a.role);
    } else if (sortField === 'status') {
      return sortDirection === 'asc'
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    } else if (sortField === 'createdAt') {
      return sortDirection === 'asc'
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getRoleBadge = (role) => {
    const variants = {
      admin: 'bg-purple-100 text-purple-800 border border-purple-200',
      owner: 'bg-blue-100 text-blue-800 border border-blue-200',
      user: 'bg-green-100 text-green-800 border border-green-200'
    };
    return variants[role] || 'bg-gray-100 text-gray-800 border border-gray-200';
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: 'bg-green-100 text-green-800 border border-green-200',
      inactive: 'bg-red-100 text-red-800 border border-red-200',
      pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    };
    return variants[status] || 'bg-gray-100 text-gray-800 border border-gray-200';
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const UserStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-600 font-medium">Total Users</p>
            <h3 className="text-2xl font-bold text-blue-900">{users.length}</h3>
            <p className="text-xs text-blue-600 mt-1">+{Math.floor(users.length * 0.15)} this month</p>
          </div>
          <div className="p-3 bg-blue-200 rounded-full shadow-inner">
            <UsersIcon className="w-6 h-6 text-blue-700" />
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-purple-600 font-medium">Admins</p>
            <h3 className="text-2xl font-bold text-purple-900">
              {users.filter(u => u.role === 'admin').length}
            </h3>
            <p className="text-xs text-purple-600 mt-1">{Math.floor((users.filter(u => u.role === 'admin').length / users.length) * 100)}% of total</p>
          </div>
          <div className="p-3 bg-purple-200 rounded-full shadow-inner">
            <Shield className="w-6 h-6 text-purple-700" />
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-600 font-medium">Active Users</p>
            <h3 className="text-2xl font-bold text-green-900">
              {users.filter(u => u.status === 'active').length}
            </h3>
            <p className="text-xs text-green-600 mt-1">{Math.floor((users.filter(u => u.status === 'active').length / users.length) * 100)}% of total</p>
          </div>
          <div className="p-3 bg-green-200 rounded-full shadow-inner">
            <UserCheck className="w-6 h-6 text-green-700" />
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-amber-600 font-medium">New This Month</p>
            <h3 className="text-2xl font-bold text-amber-900">
              {users.filter(u => {
                const date = new Date(u.createdAt);
                const now = new Date();
                return date.getMonth() === now.getMonth() && 
                       date.getFullYear() === now.getFullYear();
              }).length}
            </h3>
            <p className="text-xs text-amber-600 mt-1">+{Math.floor(users.filter(u => {
              const date = new Date(u.createdAt);
              const now = new Date();
              return date.getMonth() === now.getMonth() && 
                     date.getFullYear() === now.getFullYear();
            }).length * 0.2)} from last month</p>
          </div>
          <div className="p-3 bg-amber-200 rounded-full shadow-inner">
            <UserPlus className="w-6 h-6 text-amber-700" />
          </div>
        </div>
      </Card>
    </div>
  );

  const UserFilters = () => (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
            <option value="user">User</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
        <Button 
          variant="outline" 
          className="border-gray-200 hover:bg-gray-50"
          onClick={fetchUsers}
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Button 
          variant="outline" 
          className="border-gray-200 hover:bg-gray-50"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new user account.
              </DialogDescription>
            </DialogHeader>
            {/* Add user form will go here */}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );

  const UserTable = () => (
    <Card className="shadow-sm">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">User List</h2>
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{sortedUsers.length}</span> of <span className="font-medium">{users.length}</span> users
        </div>
      </div>
      <ScrollArea className="h-[600px]">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  User
                  {sortField === 'name' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('role')}
              >
                <div className="flex items-center">
                  Role
                  {sortField === 'role' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status
                  {sortField === 'status' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('createdAt')}
              >
                <div className="flex items-center">
                  Joined
                  {sortField === 'createdAt' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(5).fill(0).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-3 w-[100px]" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-[100px]" /></TableCell>
                </TableRow>
              ))
            ) : sortedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <UsersIcon className="w-12 h-12 text-gray-300 mb-2" />
                    <p className="text-lg font-medium">No users found</p>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              sortedUsers.map((user) => (
                <TableRow key={user._id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="border border-gray-200">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gray-100 text-gray-600">{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleBadge(user.role)}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(user.status)}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => handleViewUser(user)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );

  const UserViewDialog = () => (
    <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            View and manage user information
          </DialogDescription>
        </DialogHeader>
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-gray-200">
                <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                <AvatarFallback className="text-2xl bg-gray-100 text-gray-600">{selectedUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                <p className="text-gray-500">{selectedUser.email}</p>
                <div className="flex gap-2 mt-2">
                  <Badge className={getRoleBadge(selectedUser.role)}>
                    {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                  </Badge>
                  <Badge className={getStatusBadge(selectedUser.status)}>
                    {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{selectedUser.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{selectedUser.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedUser.address || 'Not provided'}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Last login: {new Date(selectedUser.lastLogin || selectedUser.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>Recent Activity</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Orders</span>
                </TabsTrigger>
                <TabsTrigger value="equipment" className="flex items-center gap-2">
                  <PieChart className="w-4 h-4" />
                  <span>Equipment</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="activity" className="mt-4">
                <div className="space-y-4">
                  {/* Activity content will go here */}
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <Activity className="w-12 h-12 text-gray-300 mb-2" />
                    <p className="text-lg font-medium">No recent activity</p>
                    <p className="text-sm">This user hasn't performed any actions recently</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="orders" className="mt-4">
                <div className="space-y-4">
                  {/* Orders content will go here */}
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <BarChart3 className="w-12 h-12 text-gray-300 mb-2" />
                    <p className="text-lg font-medium">No orders found</p>
                    <p className="text-sm">This user hasn't placed any orders yet</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="equipment" className="mt-4">
                <div className="space-y-4">
                  {/* Equipment content will go here */}
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <PieChart className="w-12 h-12 text-gray-300 mb-2" />
                    <p className="text-lg font-medium">No equipment found</p>
                    <p className="text-sm">This user hasn't rented any equipment yet</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-500">Manage your user accounts</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="border-gray-200 hover:bg-gray-50"
              onClick={fetchUsers}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-200 hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <UserStats />
        <UserFilters />
        <UserTable />
        <UserViewDialog />
      </div>
    </AdminLayout>
  );
};

export default Users;