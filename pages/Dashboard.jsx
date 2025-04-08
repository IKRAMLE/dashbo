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
import { ArrowUpRight, Users, Package, DollarSign, ArrowDownRight, BarChart as BarChartIcon, PieChart as PieChartIcon, Activity, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/layouts/AdminLayout";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEquipment: 0,
    revenue: 0,
    activeRentals: 0
  });

  const [equipmentStatus, setEquipmentStatus] = useState([]);
  const [monthlyRentals, setMonthlyRentals] = useState([]);
  const [equipmentCategories, setEquipmentCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/dashboard/stats', {
          headers: {
            'x-auth-token': token
          }
        });

        if (response.data.success) {
          const { stats, equipmentStatus, monthlyRentals, equipmentCategories } = response.data.data;
          setStats(stats);
          setEquipmentStatus(equipmentStatus);
          setMonthlyRentals(monthlyRentals);
          setEquipmentCategories(equipmentCategories);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
        <div className="flex items-center justify-center h-screen">
          <div className="text-lg text-red-500">{error}</div>
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
          <div className="mt-4 md:mt-0">
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
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;