
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import AdminCelebrityUpload from './admin/AdminCelebrityUpload';
import { collection, onSnapshot, } from 'firebase/firestore';
import { db, auth, functions } from "@/lib/firebase";
import RefundDialog from './admin/RefundDialog ';
import PaymentDialog from './admin/PaymentDialog';
import { useToast } from '@/hooks/use-toast';
import { httpsCallable } from "firebase/functions";

// const data = [
//   { name: 'Jan', bookings: 40, revenue: 2400 },
//   { name: 'Feb', bookings: 30, revenue: 1398 },
//   { name: 'Mar', bookings: 20, revenue: 9800 },
//   { name: 'Apr', bookings: 27, revenue: 3908 },
//   { name: 'May', bookings: 18, revenue: 4800 },
//   { name: 'Jun', bookings: 23, revenue: 3800 },
// ];  

interface UserInfo {
  id: string;
  role: string;
  status: string;
  // add other fields as needed
}  
interface Booking {
  status: string;
  celebPaymentStatus: string;
  clientName: string;
  celebrityName: string;
  date: string;
  package: {
    price: number;
  };  
  [key: string]: any; // optional, to allow extra fields
}  


const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [clients, setCLients] = useState([]);
  const [celebrities, setCelebrities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [payouts, setPayouts] = useState(0);
  const [openRefundDialog, setOpenRefundDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [selectedBooking2, setSelectedBooking2] = useState<any | null>(null);

  useEffect(() => {
    const usersRef = collection(db, "users");

    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const allUsers: UserInfo[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<UserInfo, "id">),
      }));  

      const allActiveUsers = allUsers.filter(
        userInfo => userInfo.status !== 'deleted'
      );  
      const celebFiltered = allUsers.filter(
        userInfo => userInfo.role === 'celebrity' && userInfo.status !== 'deleted' 
      );  
      const clientFiltered = allUsers.filter(
        userInfo => userInfo.role === 'client'
      );  

      setUsers(allActiveUsers);
      setCelebrities(celebFiltered);
      setCLients(clientFiltered);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching users:", error);
      setLoading(false);
    });  

    return () => unsubscribe();
  }, []);  


  useEffect(() => {
    const bookingsRef = collection(db, "bookings");

    const unsubscribe = onSnapshot(
      bookingsRef,
      (snapshot) => {
        const allBookings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Booking),
        }));  

        const statusOrder = ['completed', 'declined', 'cancelled'];

        const sortedBookings = allBookings.sort((a, b) => {
          const aIndex = statusOrder.indexOf(a.status);
          const bIndex = statusOrder.indexOf(b.status);

          const normalizedA = aIndex === -1 ? Infinity : aIndex;
          const normalizedB = bIndex === -1 ? Infinity : bIndex;

          // First, sort by payment status (unpaid before paid)
          if (a.celebPaymentStatus !== 'paid' && b.celebPaymentStatus === 'paid') {
            return -1;
          }  
          if (a.celebPaymentStatus === 'paid' && b.celebPaymentStatus !== 'paid') {
            return 1;
          }  

          // Then sort by booking status
          return normalizedA - normalizedB;
        });  


        const completeFiltered = allBookings.filter(
          booking => booking.status === "completed" && booking.celebPaymentStatus === 'paid'
        );  

        const totalPaid = completeFiltered.reduce(
          (sum, booking) => sum + (booking.package?.price || 0),
          0
        );  

        setBookings(sortedBookings);
        setPayments(completeFiltered);
        setPayouts(totalPaid);
        setLoading(false);
      },  
      (error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }  
    );  

    return () => unsubscribe();
  }, []);  


  // const deleteUser = async (userId) => {
  //   // Ask for confirmation before proceeding  
  //   const confirmed = window.confirm("Are you sure you want to delete this user? This action cannot be undone.");

  //   if (!confirmed) {
  //     return; // If the user cancels, stop the deletion process  
  //   }

  //   try {
  //     // 1. Delete user data from Firestore 'users' collection  
  //     const userRef = doc(db, "users", userId);
  //     await updateDoc(userRef, { status: "deleted" });  // Update status to 'deleted'

  //     // 2. Check if the user is a celebrity 
  //     const userDoc = await getDoc(userRef);
  //     if (userDoc.exists && userDoc.data().role === 'celebrity') {
  //       // 3. Delete the celebrity data from the 'celebrities' collection  
  //       const celebrityRef = doc(db, "celebrities", userId);
  //       await deleteDoc(celebrityRef);
  //     }

  //     // 4. Delete all reviews where clientId matches userId
  //     const reviewsRef = collection(db, "reviews");
  //     const reviewQuery = query(reviewsRef, where("clientId", "==", userId));
  //     const querySnapshot = await getDocs(reviewQuery);
  //     querySnapshot.forEach(async (doc) => {
  //       await deleteDoc(doc.ref);  
  //     });

  //     toast({
  //       title: 'User account deleted',  
  //     });

  //     // // 5. Log out the user from Firebase Auth
  //     // await auth.currentUser.delete();  // This deletes the user from Firebase Auth

  //   } catch (error) {
  //     console.error("Error deleting user: ", error);  
  //   }
  // };

const deleteUser = async (userId: string) => {
  const confirmed = window.confirm("Are you sure? This action is permanent.");
  if (!confirmed) return;

  try {
    const deleteUserFn = httpsCallable(functions, "deleteUser");
    const result = await deleteUserFn({ userId });
    console.log(result.data);
    toast({ title: "User deleted successfully." });
  } catch (error) {
    console.error("Error:", error);
    toast({ title: "Failed to delete user", variant: "destructive" });
  }
};



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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦{0}</div>
              </CardContent>
            </Card> */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{bookings.length}</div>
                <p className="text-xs text-muted-foreground">
                  Total amount of bookings
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
                <div className="text-2xl font-bold">+{clients.length}</div>
                <p className="text-xs text-muted-foreground">
                  Total number of registered clients
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
                <div className="text-2xl font-bold">+{celebrities.length}</div>
                <p className="text-xs text-muted-foreground">
                  Available Celebrities
                </p>
              </CardContent>
            </Card>
          </div>
          {/* 
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
               */}
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
                          {user.createdAt ? new Date(user.createdAt).toDateString() : 'N/A'}
                        </td>
                        <td className="py-3 px-4">
                          {user.role !== 'admin' && (
                            <Button onClick={() => deleteUser(user.id)} variant="destructive" size="sm">
                              Delete User
                            </Button>
                          )}
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
          {/* <Card className='w-fit'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Wallet Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦</div>
            </CardContent>
          </Card> */}
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
                      <th className="text-left py-3 px-4">Booking id</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, i) => (
                      <tr key={booking.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">#{i + 1}</td>
                        <td className="py-3 px-4">{booking.clientName}</td>
                        <td className="py-3 px-4">{booking.celebrityName}</td>
                        <td className="py-3 px-4">
                          <Badge variant={
                            booking.status === 'confirmed' ? 'default' :
                              booking.status === 'completed' ? 'secondary' :
                                booking.status === 'declined' ? 'destructive' :
                                  booking.status === 'refunded' ? 'secondary' :
                                    booking.status === 'cancelled' ? 'destructive' :
                                      'outline'
                          }>
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{new Date(booking.date).toDateString()}</td>
                        <td className="py-3 px-4">₦{booking.package.price}</td>
                        <td className="py-3 px-4">{booking.bookingId}</td>
                        <td className="py-3 px-4">
                          {booking.status === 'cancelled' || booking.status === 'declined' ? (
                            <Button className='bg-orange-400' onClick={() => {
                              setSelectedBooking(booking);
                              setOpenRefundDialog(true);
                            }} size="sm">Process Refund</Button>
                          ) : booking.status === 'completed' && booking.celebPaymentStatus !== 'paid' ? (
                            <Button className='bg-blue-500' size="sm" onClick={() => {
                              setSelectedBooking2(booking);
                              setOpenPaymentDialog(true);
                            }}>Process Payment</Button>
                          ) : null}


                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {selectedBooking && (
          <RefundDialog
            clientId={selectedBooking.clientId}
            bookingId={selectedBooking.id}
            refundAmount={selectedBooking.package.price}
            isOpen={openRefundDialog}
            onOpenChange={(open) => {
              setOpenRefundDialog(open);
              if (!open) setSelectedBooking(null);
            }}
          />
        )}
        {selectedBooking2 && (
          <PaymentDialog
            celebId={selectedBooking2.celebrityId}
            bookingId={selectedBooking2.id}
            paymentAmount={selectedBooking2.package.price}
            isOpen={openPaymentDialog}
            onOpenChange={(open) => {
              setOpenPaymentDialog(open);
              if (!open) setSelectedBooking2(null);
            }}
          />
        )}

        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦{0}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card> */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Celebrity Payouts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦{payouts}</div>
                <p className="text-xs text-muted-foreground">
                  total amout paid out
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
                    {payments.map((payment) => (
                      <tr className="border-b">
                        <td className="py-3 px-4">{payment.bookingId}</td>
                        <td className="py-3 px-4"><td className="px-6 py-4">
                          {new Date(payment.date).toLocaleDateString('en-US', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric',
                          })}
                        </td>
                        </td>
                        <td className="py-3 px-4">{payment.clientName}</td>
                        <td className="py-3 px-4">{payment.celebrityName}</td>
                        <td className="py-3 px-4">{payment.package?.price}</td>
                        <td className="py-3 px-4">
                          <Badge variant="default">{payment.celebPaymentStatus}</Badge>
                        </td>
                      </tr>
                    ))}
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
