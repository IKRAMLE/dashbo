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
  Cell
} from "recharts";
import { ArrowUpRight, Users, Package, DollarSign, ArrowDownRight, BarChart as BarChartIcon, PieChart as PieChartIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/layouts/AdminLayout";

// Sample data for charts
const equipmentStatusData = [
  { name: "Available", value: 45, color: "#4ade80" },
  { name: "In Use", value: 32, color: "#60a5fa" },
  { name: "Under Maintenance", value: 13, color: "#f97316" },
  { name: "Out of Service", value: 10, color: "#f43f5e" },
];

const monthlyRentalsData = [
  { name: "Jan", rentals: 65 },
  { name: "Feb", rentals: 59 },
  { name: "Mar", rentals: 80 },
  { name: "Apr", rentals: 81 },
  { name: "May", rentals: 56 },
  { name: "Jun", rentals: 55 },
  { name: "Jul", rentals: 40 },
];

const equipmentCategoriesData = [
  { name: "Imaging", count: 28, color: "#8b5cf6" },
  { name: "Surgical", count: 22, color: "#ec4899" },
  { name: "Monitoring", count: 17, color: "#14b8a6" },
  { name: "Diagnostic", count: 15, color: "#eab308" },
  { name: "Therapy", count: 18, color: "#f97316" },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 245,
    totalEquipment: 120,
    revenue: 52750,
    activeRentals: 48
  });

  const [trendsData, setTrendsData] = useState({
    users: { value: 12.5, positive: true },
    equipment: { value: 8.3, positive: true },
    revenue: { value: 15.2, positive: true },
    rentals: { value: -3.8, positive: false }
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#084b88]">Dashboard</h1>
          <p className="text-gray-600">Overview of platform metrics and performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <div className="flex items-center pt-1 text-xs">
                <span className={`flex items-center ${trendsData.users.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {trendsData.users.positive ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                  {trendsData.users.value}%
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Equipment</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEquipment}</div>
              <div className="flex items-center pt-1 text-xs">
                <span className={`flex items-center ${trendsData.equipment.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {trendsData.equipment.positive ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                  {trendsData.equipment.value}%
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.revenue}</div>
              <div className="flex items-center pt-1 text-xs">
                <span className={`flex items-center ${trendsData.revenue.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {trendsData.revenue.positive ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                  {trendsData.revenue.value}%
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
              <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeRentals}</div>
              <div className="flex items-center pt-1 text-xs">
                <span className={`flex items-center ${trendsData.rentals.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {trendsData.rentals.positive ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                  {trendsData.rentals.value}%
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Rentals</CardTitle>
              <CardDescription>Number of equipment rentals per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRentalsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rentals" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equipment Status</CardTitle>
              <CardDescription>Current status of all equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={equipmentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {equipmentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Equipment Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Equipment Categories</CardTitle>
            <CardDescription>Equipment distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {equipmentCategoriesData.map((category) => (
                <div key={category.name} className="flex items-center">
                  <div className="w-1/4 font-medium">{category.name}</div>
                  <div className="w-3/4">
                    <div className="flex items-center">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${(category.count / equipmentCategoriesData.reduce((acc, curr) => acc + curr.count, 0)) * 100}%`,
                          backgroundColor: category.color 
                        }}
                      />
                      <span className="ml-2 text-sm text-muted-foreground">{category.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="rounded-full w-9 h-9 bg-primary/10 flex items-center justify-center mr-3">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-muted-foreground">Dr. Sarah Johnson joined the platform</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">2 hours ago</div>
              </div>
              
              <div className="flex items-center">
                <div className="rounded-full w-9 h-9 bg-primary/10 flex items-center justify-center mr-3">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Equipment rented</p>
                  <p className="text-xs text-muted-foreground">MRI Scanner #3 rented by Memorial Hospital</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">5 hours ago</div>
              </div>
              
              <div className="flex items-center">
                <div className="rounded-full w-9 h-9 bg-primary/10 flex items-center justify-center mr-3">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">New equipment added</p>
                  <p className="text-xs text-muted-foreground">Portable Ultrasound Device added to inventory</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">Yesterday</div>
              </div>

              <div className="flex items-center">
                <div className="rounded-full w-9 h-9 bg-primary/10 flex items-center justify-center mr-3">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">User profile updated</p>
                  <p className="text-xs text-muted-foreground">Dr. Michael Reynolds updated payment method</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">Yesterday</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <button className="text-sm text-primary hover:underline">View all activity</button>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;