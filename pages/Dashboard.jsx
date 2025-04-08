import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { 
  ArrowUpRight, 
  Users, 
  Package, 
  DollarSign, 
  ArrowDownRight, 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon, 
  Activity, 
  TrendingUp,
  Plus,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RefreshCw
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/layouts/AdminLayout";
import axios from "axios";

// Mock data for when backend is unavailable
const mockData = {
  stats: {
    totalUsers: 1250,
    totalEquipment: 450,
    revenue: 45600,
    activeRentals: 78
  },
  equipmentStatus: [
    { name: 'Available', value: 320, color: '#10b981' },
    { name: 'In Use', value: 78, color: '#3b82f6' },
    { name: 'Maintenance', value: 42, color: '#D97706' },
    { name: 'Out of Service', value: 10, color: '#ef4444' }
  ],
  monthlyRentals: [
    { name: 'Jan', rentals: 65 },
    { name: 'Feb', rentals: 59 },
    { name: 'Mar', rentals: 80 },
    { name: 'Apr', rentals: 81 },
    { name: 'May', rentals: 56 },
    { name: 'Jun', rentals: 55 },
    { name: 'Jul', rentals: 40 },
    { name: 'Aug', rentals: 65 },
    { name: 'Sep', rentals: 59 },
    { name: 'Oct', rentals: 80 },
    { name: 'Nov', rentals: 81 },
    { name: 'Dec', rentals: 56 }
  ],
  equipmentCategories: [
    { name: 'Medical Devices', count: 180, color: '#3b82f6' },
    { name: 'Surgical Tools', count: 120, color: '#10b981' },
    { name: 'Diagnostic Equipment', count: 85, color: '#8b5cf6' },
    { name: 'Rehabilitation', count: 65, color: '#f59e0b' }
  ],
  recentActivity: [
    { id: 1, action: 'New user registered', status: 'success', type: 'user', user: 'John Doe', time: new Date(Date.now() - 1000 * 60 * 30) },
    { id: 2, action: 'Equipment ordered', status: 'success', type: 'equipment', user: 'Jane Smith', equipment: 'MRI Scanner', time: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    { id: 3, action: 'Maintenance required', status: 'warning', type: 'maintenance', equipment: 'X-Ray Machine', time: new Date(Date.now() - 1000 * 60 * 60 * 5) },
    { id: 4, action: 'Payment received', status: 'success', type: 'payment', user: 'Robert Johnson', amount: '$1,200', time: new Date(Date.now() - 1000 * 60 * 60 * 8) },
    { id: 5, action: 'Equipment alert', status: 'error', type: 'alert', equipment: 'Ultrasound Device', time: new Date(Date.now() - 1000 * 60 * 60 * 12) }
  ],
  quickActions: [
    { name: 'Add Equipment', icon: 'Plus', count: 0, color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'Schedule Maintenance', icon: 'Package', count: 3, color: 'bg-amber-600 hover:bg-amber-700' },
    { name: 'View Reports', icon: 'BarChart', count: 0, color: 'bg-purple-600 hover:bg-purple-700' },
    { name: 'Check Activity', icon: 'Activity', count: 5, color: 'bg-green-600 hover:bg-green-700' }
  ]
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(mockData.stats);
  const [equipmentStatus, setEquipmentStatus] = useState(mockData.equipmentStatus);
  const [monthlyRentals, setMonthlyRentals] = useState(mockData.monthlyRentals);
  const [equipmentCategories, setEquipmentCategories] = useState(mockData.equipmentCategories);
  const [recentActivity, setRecentActivity] = useState(mockData.recentActivity);
  const [quickActions, setQuickActions] = useState(mockData.quickActions);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOffline, setIsOffline] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Function to fetch dashboard data from the backend
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      const headers = {
        'x-auth-token': token
      };

      // Try to fetch data from the backend
      try {
        // Fetch all dashboard data in parallel
        const [
          statsResponse,
          activityResponse,
          actionsResponse
        ] = await Promise.all([
          axios.get('http://localhost:5000/api/dashboard/stats', { headers })
            .catch(err => {
              console.error('Error fetching stats:', err);
              return { data: { success: false, error: 'Failed to fetch dashboard stats' } };
            }),
          axios.get('http://localhost:5000/api/dashboard/recent-activity', { headers })
            .catch(err => {
              console.error('Error fetching activity:', err);
              return { data: { success: false, error: 'Failed to fetch recent activity' } };
            }),
          axios.get('http://localhost:5000/api/dashboard/quick-actions', { headers })
            .catch(err => {
              console.error('Error fetching quick actions:', err);
              return { data: { success: false, error: 'Failed to fetch quick actions' } };
            })
        ]);

        // Check if backend is available
        if (!statsResponse.data.success && !activityResponse.data.success && !actionsResponse.data.success) {
          throw new Error('Backend server is not available');
        }

        if (statsResponse.data.success) {
          const { stats, equipmentStatus, monthlyRentals, equipmentCategories } = statsResponse.data.data;
          setStats(stats);
          setEquipmentStatus(equipmentStatus);
          setMonthlyRentals(monthlyRentals);
          setEquipmentCategories(equipmentCategories);
        }

        if (activityResponse.data.success) {
          setRecentActivity(activityResponse.data.data);
        }

        if (actionsResponse.data.success) {
          setQuickActions(actionsResponse.data.data);
        }
        
        setIsOffline(false);
      } catch (err) {
        // If backend is not available, use mock data
        console.warn('Using mock data because backend is unavailable:', err.message);
        setIsOffline(true);
        setStats(mockData.stats);
        setEquipmentStatus(mockData.equipmentStatus);
        setMonthlyRentals(mockData.monthlyRentals);
        setEquipmentCategories(mockData.equipmentCategories);
        setRecentActivity(mockData.recentActivity);
        setQuickActions(mockData.quickActions);
      }
    } catch (err) {
      console.error('Error in dashboard data handling:', err);
      setError('Failed to load dashboard data. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and when refresh key changes
  useEffect(() => {
    fetchDashboardData();
  }, [refreshKey]);

  // Function to handle refresh button click
  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  // Function to format time ago
  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  // Function to get icon component based on name
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Plus':
        return <Plus className="h-4 w-4" />;
      case 'Package':
        return <Package className="h-4 w-4" />;
      case 'BarChart':
        return <BarChartIcon className="h-4 w-4" />;
      case 'Activity':
        return <Activity className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Function to get status icon based on activity type
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-lg">Loading dashboard data...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
          <div className="text-lg text-red-500">{error}</div>
          <div className="text-sm text-gray-500">
            If the problem persists, please check:
            <ul className="list-disc list-inside mt-2">
              <li>The backend server is running on port 5000</li>
              <li>You have a valid authentication token</li>
              <li>Your network connection is stable</li>
            </ul>
          </div>
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#084b88] to-[#0ea5e9] bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-gray-600 mt-1">Overview of platform metrics and performance</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            {isOffline && (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>Using demo data</span>
              </div>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
            <Tabs defaultValue="today" className="w-[200px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Total Users</CardTitle>
              <div className="p-2 rounded-full bg-blue-100">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  +20.1%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-purple-50 border-purple-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Total Equipment</CardTitle>
              <div className="p-2 rounded-full bg-purple-100">
                <Package className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{stats.totalEquipment}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  +12.5%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-green-50 border-green-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Revenue</CardTitle>
              <div className="p-2 rounded-full bg-green-100">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">${stats.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  +15.3%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-800">Active Rentals</CardTitle>
              <div className="p-2 rounded-full bg-amber-100">
                <Activity className="h-4 w-4 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-900">{stats.activeRentals}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-red-500 flex items-center">
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                  -2.1%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="border-b pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Monthly Rentals</CardTitle>
                  <CardDescription className="text-xs">Number of equipment rentals per month</CardDescription>
                </div>
                <div className="p-2 rounded-full bg-blue-100">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyRentals}>
                  <defs>
                    <linearGradient id="colorRentals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#084b88" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#084b88" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="rentals" 
                    stroke="#084b88" 
                    fillOpacity={1} 
                    fill="url(#colorRentals)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="border-b pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Equipment Status</CardTitle>
                  <CardDescription className="text-xs">Distribution of equipment by status</CardDescription>
                </div>
                <div className="p-2 rounded-full bg-purple-100">
                  <PieChartIcon className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={equipmentStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {equipmentStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Equipment Categories */}
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="border-b pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Equipment Categories</CardTitle>
                <CardDescription className="text-xs">Equipment distribution by category</CardDescription>
              </div>
              <div className="p-2 rounded-full bg-green-100">
                <BarChartIcon className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {equipmentCategories.map((category) => (
                <div key={category.name} className="flex items-center">
                  <div className="w-1/4 font-medium text-gray-700">{category.name}</div>
                  <div className="w-3/4">
                    <div className="flex items-center">
                      <div 
                        className="h-3 rounded-full shadow-sm" 
                        style={{ 
                          width: `${(category.count / equipmentCategories.reduce((acc, curr) => acc + curr.count, 0)) * 100}%`,
                          backgroundColor: category.color 
                        }}
                      />
                      <span className="ml-3 text-sm font-medium text-gray-600">{category.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity and Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Recent Activity */}
          <Card className="shadow-md hover:shadow-lg transition-shadow md:col-span-2">
            <CardHeader className="border-b pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                  <CardDescription className="text-xs">Latest updates from your platform</CardDescription>
                </div>
                <div className="p-2 rounded-full bg-indigo-100">
                  <Clock className="h-4 w-4 text-indigo-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className="mt-1">
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <Badge variant="outline" className="text-xs">
                          {formatTimeAgo(activity.time)}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        {activity.type === 'user' && `User: ${activity.user}`}
                        {activity.type === 'equipment' && `User: ${activity.user} | Equipment: ${activity.equipment}`}
                        {activity.type === 'alert' && `Equipment: ${activity.equipment}`}
                        {activity.type === 'maintenance' && `Equipment: ${activity.equipment}`}
                        {activity.type === 'payment' && `User: ${activity.user} | Amount: ${activity.amount}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full">View All Activity</Button>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="border-b pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                  <CardDescription className="text-xs">Common tasks and shortcuts</CardDescription>
                </div>
                <div className="p-2 rounded-full bg-teal-100">
                  <Plus className="h-4 w-4 text-teal-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-3">
                {quickActions.map((action, index) => (
                  <Button 
                    key={index} 
                    className={`${
                      action.name.toLowerCase().includes('maintenance') 
                        ? 'bg-amber-600 hover:bg-amber-700' 
                        : action.color
                    } text-white w-full justify-start`}
                  >
                    {getIconComponent(action.icon)}
                    <span className="ml-2">{action.name}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {action.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full">More Actions</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;