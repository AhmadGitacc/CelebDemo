
import React, { useState } from 'react';
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
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle,
  X,
  Star,
  FileText,
  ChevronRight,
  Search,
  DollarSign,
  Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

const ClientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  // Mock data
  const upcomingBookings = [
    {
      id: '1',
      celebrity: {
        name: 'John Legend',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
      },
      event: 'Private Concert',
      date: 'July 15, 2023',
      time: '7:00 PM',
      location: 'Miami, FL',
      status: 'confirmed',
      price: 15000
    },
    {
      id: '2',
      celebrity: {
        name: 'Emma Watson',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
      },
      event: 'Brand Photoshoot',
      date: 'August 3, 2023',
      time: '10:00 AM',
      location: 'New York, NY',
      status: 'pending',
      price: 8500
    }
  ];

  const pastBookings = [
    {
      id: '3',
      celebrity: {
        name: 'Kevin Hart',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
      },
      event: 'Corporate Event',
      date: 'June 10, 2023',
      time: '8:00 PM',
      location: 'Los Angeles, CA',
      status: 'completed',
      price: 25000,
      reviewed: true,
      rating: 5
    }
  ];

  const messages = [
    {
      id: '1',
      sender: {
        name: 'John Legend',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
      },
      content: 'Looking forward to the event next week!',
      time: '2 hours ago',
      unread: true
    },
    {
      id: '2',
      sender: {
        name: 'Emma Watson',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
      },
      content: 'Thanks for your booking! I had a question about the photoshoot location.',
      time: '1 day ago',
      unread: false
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmed
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
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Client Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your celebrity bookings and communications
          </p>
        </div>
        <Button>
          <Search className="h-4 w-4 mr-2" />
          Find New Celebrities
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard className="p-6">
          <div className="flex flex-col items-center text-center">
            <h3 className="font-medium mb-1">Total Spent</h3>
            <div className="text-3xl font-bold mb-1">$48,500</div>
            <p className="text-sm text-muted-foreground">
              Across 3 bookings
            </p>
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="flex flex-col items-center text-center">
            <h3 className="font-medium mb-1">Active Bookings</h3>
            <div className="text-3xl font-bold mb-1">2</div>
            <p className="text-sm text-muted-foreground">
              Next event in 12 days
            </p>
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="flex flex-col items-center text-center">
            <h3 className="font-medium mb-1">Favorite Category</h3>
            <div className="text-3xl font-bold mb-1">Musicians</div>
            <p className="text-sm text-muted-foreground">
              Based on your bookings
            </p>
          </div>
        </GlassCard>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          {/* <TabsTrigger value="messages">Messages</TabsTrigger> */}
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
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
                          src={booking.celebrity.image}
                          alt={booking.celebrity.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="p-6 md:w-3/4 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{booking.celebrity.name}</h3>
                          {getStatusBadge(booking.status)}
                        </div>

                        <p className="text-muted-foreground mb-4">
                          {booking.event}
                        </p>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-accent mr-2" />
                            <span className="text-sm">{booking.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-accent mr-2" />
                            <span className="text-sm">{booking.time}</span>
                          </div>
                          <div className="flex items-center col-span-2">
                            <DollarSign className="h-4 w-4 text-accent mr-2" />
                            <span className="text-sm">${booking.price.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="mt-auto flex justify-end space-x-3">
                          {/* <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button> */}
                          <Button size="sm">
                            View Details
                          </Button>
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
                  <Link to='/'>
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
                          src={booking.celebrity.image}
                          alt={booking.celebrity.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="p-6 md:w-3/4 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{booking.celebrity.name}</h3>
                          {getStatusBadge(booking.status)}
                        </div>

                        <p className="text-muted-foreground mb-4">
                          {booking.event}
                        </p>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-accent mr-2" />
                            <span className="text-sm">{booking.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-accent mr-2" />
                            <span className="text-sm">{booking.time}</span>
                          </div>
                        </div>

                        {booking.reviewed ? (
                          <div className="flex items-center mt-2 mb-4">
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
                        ) : (
                          <Button variant="outline" size="sm" className="self-start mb-4">
                            <Star className="h-4 w-4 mr-2" />
                            Leave a Review
                          </Button>
                        )}

                        <div className="mt-auto flex justify-end">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
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
{/* 
        <TabsContent value="messages" className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Your Messages</h2>
          {messages.length > 0 ? (
            <div className="space-y-3">
              {messages.map((message) => (
                <GlassCard
                  key={message.id}
                  className={`p-4 ${message.unread ? 'border-accent/30 bg-accent/5' : ''}`}
                  interactive
                >
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={message.sender.image} alt={message.sender.name} />
                      <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium text-sm flex items-center">
                          {message.sender.name}
                          {message.unread && (
                            <Badge className="ml-2 h-1.5 w-1.5 rounded-full p-0 bg-accent" />
                          )}
                        </h4>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{message.content}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p>You have no messages yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent> */}

        <TabsContent value="contracts" className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Your Contracts</h2>
          <div className="space-y-4">
            <GlassCard className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Performance Agreement - John Legend</h3>
                    <p className="text-sm text-muted-foreground mt-1">Private Concert on July 15, 2023</p>
                    <div className="flex space-x-3 mt-2">
                      <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">
                        Signed
                      </Badge>
                      <span className="text-xs text-muted-foreground">Last updated: June 28, 2023</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Appearance Contract - Emma Watson</h3>
                    <p className="text-sm text-muted-foreground mt-1">Brand Photoshoot on August 3, 2023</p>
                    <div className="flex space-x-3 mt-2">
                      <Badge variant="outline" className="text-yellow-600 border-yellow-300 bg-yellow-50">
                        Awaiting Signature
                      </Badge>
                      <span className="text-xs text-muted-foreground">Expires in 3 days</span>
                    </div>
                  </div>
                </div>
                <Button size="sm">Sign Now</Button>
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Saved Celebrities</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <GlassCard className="p-0 overflow-hidden">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1492681290082-e932832941e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80"
                  alt="Beyoncé"
                  className="w-full h-48 object-cover object-center"
                />
                <Badge
                  className="absolute top-3 right-3 bg-accent text-white font-medium"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Instant Booking
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Beyoncé</h3>
                <p className="text-sm text-muted-foreground mb-3">Singer • Performer</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm font-medium">4.9</span>
                    <span className="text-xs text-muted-foreground ml-1">(120)</span>
                  </div>
                  <span className="text-sm font-medium">From $50,000</span>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" size="sm">View Profile</Button>
                  <Button size="sm">Book Now</Button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-0 overflow-hidden">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                  alt="Chris Hemsworth"
                  className="w-full h-48 object-cover object-center"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Chris Hemsworth</h3>
                <p className="text-sm text-muted-foreground mb-3">Actor • Brand Ambassador</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm font-medium">4.8</span>
                    <span className="text-xs text-muted-foreground ml-1">(85)</span>
                  </div>
                  <span className="text-sm font-medium">From $75,000</span>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" size="sm">View Profile</Button>
                  <Button size="sm">Book Now</Button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-0 overflow-hidden">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                  alt="Trevor Noah"
                  className="w-full h-48 object-cover object-center"
                />
                <Badge
                  className="absolute top-3 right-3 bg-accent text-white font-medium"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Instant Booking
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Trevor Noah</h3>
                <p className="text-sm text-muted-foreground mb-3">Comedian • Host</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm font-medium">4.7</span>
                    <span className="text-xs text-muted-foreground ml-1">(92)</span>
                  </div>
                  <span className="text-sm font-medium">From $35,000</span>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" size="sm">View Profile</Button>
                  <Button size="sm">Book Now</Button>
                </div>
              </div>
            </GlassCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;
