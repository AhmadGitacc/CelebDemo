
import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/ui-custom/GlassCard';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  CheckCircle,
  X,
  Star,
  FileText,
  DollarSign,
  Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import ReviewButton from './celebrity/Review';
import CancelBookingButton from '../booking/CancelBooking';
import ClientProfile from './client/ClientProfile';
import { useToast } from '@/hooks/use-toast';


interface Booking {
  id: string;
  clientId: string;
  celebrityId: string;
  celebrityName: string;
  celebrityImg: string;
  eventDesc: string;
  location: string;
  date: string;
  time: string;
  package: {
    price: number,
  };
  status: string;
}
interface Celebrity {
  id: string;
  name: string;
  category: string;
  subcategory: string;
}


const ClientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [nextEvent, setNextEvent] = useState<string>('');
  const [favorites, setFavorites] = useState<any[]>([]);
  const [completed, setCompleted] = useState<any[]>([]);
  const [pastBookings, setPastBookings] = useState<any[]>([]);
  const [amountSpent, setAmountSpent] = useState<any>(0);
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const docRef = doc(db, "users", user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
      }

      setLoading(false);

      toast({
        title: 'Note:',
        description: ' Ensure your profile Info is always Up to date',
        className: "border border-green-400 text-green-800",
      });
    }

    fetchUserData();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "bookings"),
      async (snapshot) => {
        try {
          const now = new Date();
          now.setHours(0, 0, 0, 0);

          const allBookings: Booking[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<Booking, "id">),
          }));

          const updatePromises = allBookings.map(async (booking) => {
            const bookingDate = new Date(booking.date);
            bookingDate.setHours(0, 0, 0, 0);

            const bookingRef = doc(db, "bookings", booking.id);

            if (bookingDate < now && booking.status === "pending") {
              await updateDoc(bookingRef, { status: "cancelled" });
              toast({
                title: "Booking Cancelled",
                description: `Your booking with ${booking.celebrityName} was automatically cancelled because the date passed.`,
                duration: 5000,
              });
            } else if (bookingDate < now && booking.status === "confirmed") {
              await updateDoc(bookingRef, { status: "completed" });
              toast({
                title: "Booking Completed",
                description: `Your booking with ${booking.celebrityName} has been marked as completed.`,
                duration: 5000,
              });
            }

          });

          await Promise.all(updatePromises);

          const filtered = allBookings.filter(
            booking => booking.clientId === user?.id &&
              booking.status !== "completed" &&
              booking.status !== "cancelled" &&
              booking.status !== "refunded" &&
              booking.status !== "declined"
          );

          const pastFiltered = allBookings.filter(
            booking => booking.clientId === user?.id && booking.status !== "pending"
          );

          const completeFiltered = allBookings.filter(
            booking => booking.clientId === user?.id && booking.status === "completed"
          );

          const userBookings = allBookings.filter(
            booking => booking.clientId === user?.id
          );

          const uniqueCelebrityIds = [
            ...new Set(userBookings.map(booking => booking.celebrityId))
          ];

          if (uniqueCelebrityIds.length === 0) {
            setFavorites([]);
          } else {
            const celebRefs = uniqueCelebrityIds.map(id => doc(db, "celebrities", id));
            const celebSnapshots = await Promise.all(celebRefs.map(ref => getDoc(ref)));

            const matchedCelebs: Celebrity[] = celebSnapshots
              .filter(snapshot => snapshot.exists())
              .map(snapshot => ({
                id: snapshot.id,
                ...(snapshot.data() as Omit<Celebrity, "id">),
              }));

            setFavorites(matchedCelebs);
          }

          const totalSpent = completeFiltered.reduce(
            (sum, booking) => sum + (booking.package?.price || 0),
            0
          );    

          setAmountSpent(totalSpent);
          setCompleted(completeFiltered);
          setUpcomingBookings(filtered);
          setPastBookings(pastFiltered);
        } catch (error) {
          console.error("Error processing bookings:", error);
        }
      },
      (error) => {
        console.error("Error in real-time listener:", error);
      }
    );

    return () => unsubscribe();
  }, [user?.id]);

  useEffect(() => {
    if (upcomingBookings.length > 0) {
      const sortedBookings = upcomingBookings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      const closestBooking = sortedBookings[0];
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',  // e.g., Monday
        year: 'numeric',  // e.g., 2025
        month: 'long',    // e.g., April
        day: 'numeric',   // e.g., 7
      }).format(new Date(closestBooking.date));

      setNextEvent(formattedDate + " - " + sortedBookings[0].time);
    }
  }, [upcomingBookings]);


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmed
          </Badge>
        );
      case 'refunded':
        return (
          <Badge variant='secondary'>
            <CheckCircle className="h-3 w-3 mr-1" />
            Refunded
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-300 bg-yellow-50">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="secondary">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="destructive">
            <X className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      case 'declined':
        return (
          <Badge variant="destructive">
            <X className="h-3 w-3 mr-1" />
            declined
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {name}</h1>
          <p className="text-muted-foreground mt-1">
            Manage your celebrity bookings and profile
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate('/search')}
        >
          Browse Celebrities
        </Button>

      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard className="p-6">
          <div className="flex flex-col items-center text-center">
            <h3 className="font-medium mb-1">Total Spent</h3>
            <div className="text-3xl font-bold mb-1">₦{amountSpent}</div>
            <p className="text-sm text-muted-foreground">
              Across {completed.length || 0} bookings
            </p>
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="flex flex-col items-center text-center">
            <h3 className="font-medium mb-1">Active Bookings</h3>
            <div className="text-3xl font-bold mb-1">{upcomingBookings.length}</div>
            <p className="text-sm text-muted-foreground">
              Next event : {nextEvent || 'no upcoming event'}
            </p>
          </div>
        </GlassCard>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Upcoming Bookings</h2>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <GlassCard key={booking.id} className="p-0 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 bg-muted">
                        <img
                          src={booking.celebrityImg || '/assets/wizkid.jpg'}
                          alt={booking.celebrityName}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="p-6 md:w-3/4 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{booking.celebrityName}</h3>
                          {getStatusBadge(booking.status)}
                        </div>

                        <p className="text-muted-foreground mb-4">
                          {booking.eventDesc} @ {booking.location}
                        </p>

                        <p className="text-muted-foreground text-sm mb-4">
                          <span className="font-semibold">Booking ID</span>: {booking.bookingId}
                        </p>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-accent mr-2" />
                            <span className="text-sm">{new Date(booking.date).toDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-accent mr-2" />
                            <span className="text-sm">{booking.time}</span>
                          </div>
                          <div className="flex items-center col-span-2">
                            ₦
                            <span className="text-sm ml-1">{booking.package.price.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="mt-auto flex justify-end space-x-3">
                          <CancelBookingButton text='Cancel Booking' bookingId={booking.id} statusbadge='cancelled'
                            alert='The admin has been notified to process your refund' />
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p>You have no upcoming bookings.</p>
                  <Link to='/search'>
                    <Button className="mt-4">Find Celebrities</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Past Bookings</h2>
            {pastBookings.length > 0 ? (
              <div className="space-y-4">
                {pastBookings.map((booking) => (
                  <GlassCard key={booking.id} className="p-0 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 bg-muted">
                        <img
                          src={booking.celebrityImg || '/assets/wizkid.jpg'}
                          alt={booking.celebrityName}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      <div className="p-6 md:w-3/4 flex flex-col">
                        <p className="text-muted-foreground mb-4">
                          <span className="font-semibold text-sm">Booking ID</span>: {booking.bookingId}
                        </p>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{booking.celebrityName}</h3>
                          {getStatusBadge(booking.status)}
                        </div>

                        <p className="text-muted-foreground mb-4">
                          {booking.eventDesc} @ {booking.location}
                        </p>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-accent mr-2" />
                            <span className="text-sm">{new Date(booking.date).toDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-accent mr-2" />
                            <span className="text-sm">{booking.time}</span>
                          </div>
                          <div className="flex items-center col-span-2">
                            ₦
                            <span className="text-sm ml-1">{booking.package.price.toLocaleString()}</span>
                          </div>
                        </div>
                        {booking.status === 'completed' && (
                          booking.reviewed ? (
                            <div className="flex flex-col">
                              <div className="flex flex-row items-center mt-2 mb-4">
                                <span className="text-sm font-medium mr-2">Your Rating:</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < (booking.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm font-medium mr-2">Your Review: {booking.comment}</span>
                            </div>
                          ) : (
                            <ReviewButton bookingId={booking.id} />
                          )
                        )}
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p>You have no past bookings.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>


        <TabsContent value="favorites" className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Saved Celebrities</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.length > 0 ? (
              favorites.map((celebrity) => (
                <GlassCard key={celebrity.id} className="p-0 overflow-hidden">
                  <div className="relative">
                    <img
                      src={celebrity.profileImage || '/assets/wizkid.jpg'}
                      alt={celebrity.name}
                      className="w-full h-48 object-cover object-center"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{celebrity.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {celebrity.category} - {celebrity.subcategory}
                    </p>
                    
                    <Link className="flex justify-between mt-4" to={`/celebrities/${celebrity.id}`}>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button size="sm">Book Now</Button>
                    </Link>
                  </div>
                </GlassCard>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p>You have no favorite celebrities yet.</p>
                </CardContent>
              </Card>
            )}

          </div>
        </TabsContent>
        <TabsContent value="profile" className="space-y-6">
          <ClientProfile />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;
