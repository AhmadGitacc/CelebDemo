
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import AdminCelebrityUpload from './AdminCelebrityUpload';
import { Dialog, DialogTrigger, DialogContent } from '@radix-ui/react-dialog';
import { Edit } from 'lucide-react';

const data = [
  { name: 'Jan', bookings: 40, revenue: 2400 },
  { name: 'Feb', bookings: 30, revenue: 1398 },
  { name: 'Mar', bookings: 20, revenue: 9800 },
  { name: 'Apr', bookings: 27, revenue: 3908 },
  { name: 'May', bookings: 18, revenue: 4800 },
  { name: 'Jun', bookings: 23, revenue: 3800 },
];

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'client', date: '2023-04-15' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', status: 'active', role: 'celebrity', date: '2023-03-21' },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', status: 'inactive', role: 'client', date: '2023-05-02' },
  { id: 4, name: 'Emma Wilson', email: 'emma@example.com', status: 'active', role: 'celebrity', date: '2023-02-18' },
  { id: 5, name: 'James Taylor', email: 'james@example.com', status: 'pending', role: 'client', date: '2023-05-19' },
];

const bookings = [
  { id: 1, client: 'John Doe', celebrity: 'Davido', status: 'confirmed', date: '2023-06-15', amount: '$2,500' },
  { id: 2, client: 'Sarah Smith', celebrity: 'Burna Boy', status: 'pending', date: '2023-06-22', amount: '$3,000' },
  { id: 3, client: 'Michael Brown', celebrity: 'Tiwa Savage', status: 'completed', date: '2023-05-30', amount: '$1,800' },
  { id: 4, client: 'Emma Wilson', celebrity: 'Wizkid', status: 'cancelled', date: '2023-06-10', amount: '$4,200' },
  { id: 5, client: 'James Taylor', celebrity: 'Don Jazzy', status: 'confirmed', date: '2023-07-05', amount: '$2,100' },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="w-full mb-6 flex gap-2 overflow-x-auto sm:grid sm:grid-cols-5 sm:gap-0">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="add-celebrity">Add Celebrity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Celebrities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last year
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="hsl(var(--accent))" />
                    <Bar dataKey="bookings" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>
                  Recent platform activities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9 mr-3" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Davido approved a booking request
                      </p>
                      <p className="text-sm text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9 mr-3" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        New user registered
                      </p>
                      <p className="text-sm text-muted-foreground">
                        4 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9 mr-3" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        New booking completed
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Yesterday at 3:12 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9 mr-3" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Payout processed to Burna Boy
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Yesterday at 11:30 AM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Users Management</CardTitle>
              <CardDescription>
                Manage platform users, both clients and celebrities.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-secondary border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Registered</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4 capitalize">{user.role}</td>
                        <td className="py-3 px-4">
                          <Badge variant={
                            user.status === 'active' ? 'default' :
                              user.status === 'inactive' ? 'secondary' :
                                'outline'
                          }>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{user.date}</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card className='w-fit'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Wallet Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$11,307.97</div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Bookings Management</CardTitle>
              <CardDescription>
                View and manage celebrity bookings.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">

                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-secondary border-b">
                      <th className="text-left py-3 px-4">ID</th>
                      <th className="text-left py-3 px-4">Client</th>
                      <th className="text-left py-3 px-4">Celebrity</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">#{booking.id}</td>
                        <td className="py-3 px-4">{booking.client}</td>
                        <td className="py-3 px-4">{booking.celebrity}</td>
                        <td className="py-3 px-4">
                          <Badge variant={
                            booking.status === 'confirmed' ? 'default' :
                              booking.status === 'completed' ? 'secondary' :
                                booking.status === 'cancelled' ? 'destructive' :
                                  'outline'
                          }>
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{booking.date}</td>
                        <td className="py-3 px-4">{booking.amount}</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Celebrity Payouts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$33,923.92</div>
                <p className="text-xs text-muted-foreground">
                  75% of total revenue
                </p>
              </CardContent>
            </Card>

          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Transactions</CardTitle>
              <CardDescription>
                Recent payment transactions on the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Transaction ID</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Client</th>
                      <th className="text-left py-3 px-4">Celebrity</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">#TX12345</td>
                      <td className="py-3 px-4">2023-06-15</td>
                      <td className="py-3 px-4">John Doe</td>
                      <td className="py-3 px-4">Davido</td>
                      <td className="py-3 px-4">$2,500</td>
                      <td className="py-3 px-4">
                        <Badge>Completed</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">#TX12346</td>
                      <td className="py-3 px-4">2023-06-22</td>
                      <td className="py-3 px-4">Sarah Smith</td>
                      <td className="py-3 px-4">Burna Boy</td>
                      <td className="py-3 px-4">$3,000</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">Pending</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">#TX12347</td>
                      <td className="py-3 px-4">2023-05-30</td>
                      <td className="py-3 px-4">Michael Brown</td>
                      <td className="py-3 px-4">Tiwa Savage</td>
                      <td className="py-3 px-4">$1,800</td>
                      <td className="py-3 px-4">
                        <Badge>Completed</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">#TX12348</td>
                      <td className="py-3 px-4">2023-06-10</td>
                      <td className="py-3 px-4">Emma Wilson</td>
                      <td className="py-3 px-4">Wizkid</td>
                      <td className="py-3 px-4">$4,200</td>
                      <td className="py-3 px-4">
                        <Badge variant="destructive">Refunded</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-celebrity">
          <AdminCelebrityUpload />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
