
import React, { useState } from 'react';
import GlassCard from '@/components/ui-custom/GlassCard';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Calendar,
  Check,
  Clock,
  CheckCircle,
  X,
  Star,
  DollarSign,
  Users,
  TrendingUp,
  FileText,
  ChevronRight,
  MessageSquare,
  Edit,
  Bell,
  Upload,
  Image,
  PlusCircle,
  Trash2,
  Settings,
  CheckSquare,
  Square,
  Delete,
  Trash
} from 'lucide-react';
import BookingCalendar from '@/components/booking/BookingCalendar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

const CelebrityDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const pendingRequests = [
    {
      id: '1',
      client: {
        name: 'Sarah Johnson',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
      },
      event: 'Corporate Motivational Speech',
      date: 'August 18, 2023',
      time: '2:00 PM',
      location: 'Chicago, IL',
      offerAmount: 12000,
      message: 'We would love to have you speak at our annual corporate event. Our team is a big fan of your work and we believe you would be the perfect fit for our innovation theme.'
    },
    {
      id: '2',
      client: {
        name: 'Michael Rodriguez',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
      },
      event: 'Wedding Performance',
      date: 'September 5, 2023',
      time: '7:30 PM',
      location: 'Miami, FL',
      offerAmount: 8500,
      message: 'My fiancée and I are huge fans! It would mean the world to us if you could perform at our wedding. We especially love your song "Forever" and would love that as our first dance.'
    }
  ];

  const upcomingBookings = [
    {
      id: '1',
      client: {
        name: 'Corporate Solutions Inc.',
        image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80'
      },
      event: 'Product Launch',
      date: 'July 25, 2023',
      time: '6:00 PM',
      location: 'San Francisco, CA',
      status: 'confirmed',
      amount: 20000,
      paymentStatus: 'deposit paid'
    }
  ];

  const paymentHistory = [
    {
      id: '1',
      client: 'Luxury Events Co.',
      event: 'Gala Dinner Performance',
      date: 'June 15, 2023',
      amount: 15000,
      status: 'paid'
    },
    {
      id: '2',
      client: 'Corporate Solutions Inc.',
      event: 'Product Launch',
      date: 'July 25, 2023',
      amount: 10000,
      status: 'deposit'
    }
  ];

  const messages = [
    {
      id: '1',
      sender: {
        name: 'Sarah Johnson',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
      },
      content: 'Looking forward to having you at our event! Let me know if you need any specific equipment setup.',
      time: '1 hour ago',
      unread: true
    },
    {
      id: '2',
      sender: {
        name: 'Michael Rodriguez',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
      },
      content: 'Just wanted to check if our booking request came through. We\'re really hoping you can make it!',
      time: '2 days ago',
      unread: false
    }
  ];

  const packages = [
    {
      id: '1',
      name: 'Standard Performance',
      description: '1-hour performance with standard setup',
      price: 10000,
      isActive: true
    },
    {
      id: '2',
      name: 'Premium Experience',
      description: '2-hour performance with meet & greet',
      price: 18000,
      isActive: true
    },
    {
      id: '3',
      name: 'Virtual Appearance',
      description: '30-minute virtual appearance for online events',
      price: 5000,
      isActive: false
    }
  ];

  const gallery = [
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  ];

  const reviews = [
    {
      id: '1',
      client: {
        name: 'Luxury Events Co.',
        image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80'
      },
      rating: 5,
      text: 'Absolutely incredible performance! Our guests were blown away, and you were so professional to work with. Would book again in a heartbeat.',
      date: 'June 16, 2023'
    },
    {
      id: '2',
      client: {
        name: 'Emily & Jacob\'s Wedding',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
      },
      rating: 4,
      text: 'You made our special day even more magical! Everyone is still talking about your performance. Thank you so much!',
      date: 'May 28, 2023'
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

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-green-500">
            <Check className="h-3 w-3 mr-1" />
            Paid in Full
          </Badge>
        );
      case 'deposit':
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">
            <DollarSign className="h-3 w-3 mr-1" />
            Deposit Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-300 bg-yellow-50">
            <Clock className="h-3 w-3 mr-1" />
            Payment Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Celebrity Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your bookings, profile, and earnings
          </p>
        </div>
        {/* <div className="flex gap-3">
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div> */}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard className="p-6">
          <div className="flex flex-col items-center text-center">
            <h3 className="font-medium mb-1">Total Earnings</h3>
            <div className="text-3xl font-bold mb-1">$25,000</div>
            <p className="text-sm text-muted-foreground">
              Year to date
            </p>
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="flex flex-col items-center text-center">
            <h3 className="font-medium mb-1">Pending Bookings</h3>
            <div className="text-3xl font-bold mb-1">2</div>
            <p className="text-sm text-muted-foreground">
              Worth $20,500
            </p>
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="flex flex-col items-center text-center">
            <h3 className="font-medium mb-1">Overall Rating</h3>
            <div className="text-3xl font-bold mb-1 flex items-center justify-center">
              4.8
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 ml-1" />
            </div>
            <p className="text-sm text-muted-foreground">
              From 18 reviews
            </p>
          </div>
        </GlassCard>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-6 flex gap-2 overflow-x-auto sm:grid sm:grid-cols-5 sm:gap-0">
          <TabsTrigger value="overview" className="flex-shrink-0">Overview</TabsTrigger>
          <TabsTrigger value="requests" className="flex-shrink-0">Booking Requests</TabsTrigger>
          <TabsTrigger value="calendar" className="flex-shrink-0">Calendar</TabsTrigger>
          <TabsTrigger value="earnings" className="flex-shrink-0">Earnings</TabsTrigger>
          <TabsTrigger value="profile" className="flex-shrink-0">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Pending Requests</h2>
              {pendingRequests.length > 0 ? (
                <div className="space-y-4">
                  {pendingRequests.slice(0, 1).map((request) => (
                    <GlassCard key={request.id} className="p-5">
                      <div className="flex items-start space-x-4 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={request.client.image} alt={request.client.name} />
                          <AvatarFallback>{request.client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{request.client.name}</h3>
                          <p className="text-sm text-muted-foreground">{request.event}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-accent mr-2" />
                          <span className="text-sm">{request.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-accent mr-2" />
                          <span className="text-sm">{request.time}</span>
                        </div>
                        <div className="flex items-center col-span-2">
                          <DollarSign className="h-4 w-4 text-accent mr-2" />
                          <span className="text-sm">${request.offerAmount.toLocaleString()} offered</span>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3 mt-4">
                        {/* <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button> */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                        <Button size="sm">
                          <Check className="h-4 w-4 mr-2" />
                          Accept
                        </Button>
                      </div>
                    </GlassCard>
                  ))}

                  <Button variant="outline" className="w-full">
                    View All Requests ({pendingRequests.length})
                  </Button>
                </div>
              ) : (
                <GlassCard className="p-6 text-center">
                  <p className="text-muted-foreground">No pending requests</p>
                </GlassCard>
              )}

              <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <GlassCard key={booking.id} className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={booking.client.image} alt={booking.client.name} />
                            <AvatarFallback>{booking.client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{booking.client.name}</h3>
                            <p className="text-sm text-muted-foreground">{booking.event}</p>
                          </div>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-accent mr-2" />
                          <span className="text-sm">{booking.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-accent mr-2" />
                          <span className="text-sm">{booking.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-accent mr-2" />
                          <span className="text-sm font-medium">${booking.amount.toLocaleString()}</span>
                          <span className="text-xs ml-2 text-muted-foreground">
                            ({booking.paymentStatus})
                          </span>
                        </div>
                        <Button size="sm">
                          View Details
                        </Button>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              ) : (
                <GlassCard className="p-6 text-center">
                  <p className="text-muted-foreground">No upcoming bookings</p>
                </GlassCard>
              )}
            </div>

            <div className="space-y-6">
              {/* <h2 className="text-xl font-semibold">Recent Messages</h2>
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
                  <Button variant="outline" className="w-full">
                    View All Messages
                  </Button>
                </div>
              ) : (
                <GlassCard className="p-6 text-center">
                  <p className="text-muted-foreground">No messages</p>
                </GlassCard>
              )} */}

              <h2 className="text-xl font-semibold">Recent Reviews</h2>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <GlassCard key={review.id} className="p-5">
                      <div className="flex items-center space-x-4 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.client.image} alt={review.client.name} />
                          <AvatarFallback>{review.client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{review.client.name}</h3>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>

                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < (review.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>

                      <p className="text-sm text-muted-foreground">
                        "{review.text}"
                      </p>
                    </GlassCard>
                  ))}
                </div>
              ) : (
                <GlassCard className="p-6 text-center">
                  <p className="text-muted-foreground">No reviews yet</p>
                </GlassCard>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Booking Requests</h2>
          {pendingRequests.length > 0 ? (
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
              {pendingRequests.map((request) => (
                <GlassCard key={request.id} className="p-6 md:w-2/ sm:w-full">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                      <div className="flex items-start space-x-4 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={request.client.image} alt={request.client.name} />
                          <AvatarFallback>{request.client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-lg">{request.client.name}</h3>
                          <Badge variant="outline" className="mt-1">New Client</Badge>
                        </div>
                      </div>

                      <h4 className="font-semibold text-lg mb-2">{request.event}</h4>

                      <div className="grid grid-cols-2 gap-x-12 gap-y-3 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-accent mr-2" />
                          <span className="text-sm">{request.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-accent mr-2" />
                          <span className="text-sm">{request.time}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-accent mr-2" />
                          <span className="text-sm font-medium">${request.offerAmount.toLocaleString()} offered</span>
                        </div>
                      </div>

                      {/* <div className="bg-secondary p-4 rounded-lg mb-6">
                        <h5 className="font-medium mb-2">Client Message:</h5>
                        <p className="text-sm text-muted-foreground">
                          "{request.message}"
                        </p>
                      </div>
                       */}
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="outline"
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                        {/* <Button 
                          variant="outline"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Counter Offer
                        </Button> */}
                        <Button>
                          <Check className="h-4 w-4 mr-2" />
                          Accept
                        </Button>
                      </div>
                    </div>

                    {/* <div className="md:w-1/3 md:border-l md:pl-6 md:border-border">
                      <h4 className="font-medium mb-3">Quick Response</h4>
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start h-auto py-3 text-left normal-case text-xs"
                        >
                          Thank you for your interest! I'd love to discuss this further.
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start h-auto py-3 text-left normal-case text-xs"
                        >
                          I'm available on the requested date. Let's confirm the details.
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start h-auto py-3 text-left normal-case text-xs"
                        >
                          My standard rate for this is higher. Can we discuss?
                        </Button>
                        <Textarea 
                          placeholder="Type a custom message..." 
                          className="mt-2"
                        />
                        <Button className="w-full">
                          Send Message
                        </Button>
                      </div>
                    </div> */}
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : (
            <GlassCard className="p-8 text-center">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-medium mb-2">No Pending Requests</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any booking requests pending at the moment. When clients send you booking requests, they'll appear here.
                </p>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  View Availability Settings
                </Button>
              </div>
            </GlassCard>
          )}
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h2 className="text-xl font-semibold mb-6">Your Availability</h2>
              <GlassCard className="p-6">
                <BookingCalendar />
              </GlassCard>
            </div>

            <div className="md:w-1/2 space-y-6">
              {/* <h2 className="text-xl font-semibold">Booking Settings</h2>
              <GlassCard className="p-6">
                <h3 className="font-medium mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Instant Booking</Label>
                      <p className="text-sm text-muted-foreground">
                        Let clients book without approval
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Minimum Notice Period</Label>
                      <p className="text-sm text-muted-foreground">
                        Minimum days before an event
                      </p>
                    </div>
                    <div className="w-20">
                      <Input type="number" min="0" defaultValue="7" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maximum Booking Window</Label>
                      <p className="text-sm text-muted-foreground">
                        How far in advance clients can book
                      </p>
                    </div>
                    <div className="w-20">
                      <Input type="number" min="1" defaultValue="180" />
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Block Weekends</Label>
                      <p className="text-sm text-muted-foreground">
                        Reserve weekends for premium bookings
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Multiple Bookings per Day</Label>
                      <p className="text-sm text-muted-foreground">
                        Book more than one event on the same day
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="mt-6">
                  <Button>Save Settings</Button>
                </div>
              </GlassCard> */}

              <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
              <GlassCard className="p-5">
                <div className="space-y-4">
                  {upcomingBookings.length > 0 ? (
                    upcomingBookings.map((booking) => (
                      <div key={booking.id}>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-medium">{booking.event}</h3>
                            <p className="text-sm text-muted-foreground">
                              {booking.client.name}
                            </p>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-3">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-accent mr-2" />
                            <span className="text-sm">{booking.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-accent mr-2" />
                            <span className="text-sm">{booking.time}</span>
                          </div>
                        </div>

                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      No upcoming bookings
                    </p>
                  )}
                </div>
              </GlassCard>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-6">
          <h2 className="text-xl font-semibold mb-6">Your Earnings</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <GlassCard className="p-6">
              <div className="flex flex-col items-center text-center">
                <h3 className="font-medium mb-1">Available for Withdrawal</h3>
                <div className="text-3xl font-bold mb-1">$15,000</div>
                <Button className="mt-4">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Withdraw Funds
                </Button>
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="flex flex-col items-center text-center">
                <h3 className="font-medium mb-1">Pending Payments</h3>
                <div className="text-3xl font-bold mb-1">$10,000</div>
                <p className="text-sm text-muted-foreground">
                  From 1 booking
                </p>
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="flex flex-col items-center text-center">
                <h3 className="font-medium mb-1">YTD Earnings</h3>
                <div className="text-3xl font-bold mb-1">$25,000</div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +15% from last year
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Payment History</h2>
            <GlassCard className="p-0 overflow-hidden">
              <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Recent Transactions</h3>
                  <Button variant="outline" size="sm">
                    Download Statement
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-6 py-3 text-left font-medium text-muted-foreground">Client</th>
                      <th className="px-6 py-3 text-left font-medium text-muted-foreground">Event</th>
                      <th className="px-6 py-3 text-left font-medium text-muted-foreground">Date</th>
                      <th className="px-6 py-3 text-left font-medium text-muted-foreground">Amount</th>
                      <th className="px-6 py-3 text-left font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id} className="border-b last:border-b-0 hover:bg-muted/50">
                        <td className="px-6 py-4">{payment.client}</td>
                        <td className="px-6 py-4">{payment.event}</td>
                        <td className="px-6 py-4">{payment.date}</td>
                        <td className="px-6 py-4">${payment.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          {getPaymentStatusBadge(payment.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>

            {/* <h2 className="text-xl font-semibold">Your Packages</h2>
            <div className="space-y-4">
              {packages.map((pkg) => (
                <GlassCard
                  key={pkg.id}
                  className={`p-6 ${!pkg.isActive ? 'opacity-70' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold text-lg mr-2">{pkg.name}</h3>
                        {!pkg.isActive && (
                          <Badge variant="outline" className="text-muted-foreground">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground my-2">
                        {pkg.description}
                      </p>
                      <p className="font-medium">
                        ${pkg.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-muted-foreground"
                      >
                        {pkg.isActive ?
                          <><X className="h-4 w-4 mr-2" />Deactivate</> :
                          <><Check className="h-4 w-4 mr-2" />Activate</>
                        }
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              ))}

              <GlassCard className="p-6 border-dashed">
                <div className="flex flex-col items-center text-center py-4">
                  <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium mb-1">Create New Package</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add a new booking package or service offering
                  </p>
                  <Button>
                    Create Package
                  </Button>
                </div>
              </GlassCard>
            </div> */}
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1 space-y-6">
              <GlassCard className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" />
                      <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>

                  <h2 className="text-xl font-bold">Jason Ludwig</h2>
                  <p className="text-muted-foreground mb-4">Musician • Singer-Songwriter</p>

                  <div className="flex items-center justify-center mb-4">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-medium">4.8</span>
                    <span className="text-muted-foreground ml-1">(18 reviews)</span>
                  </div>

                  <Badge variant="outline" className="mb-4">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified Celebrity
                  </Badge>

                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-medium mb-4">Verification Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Identity Verified</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">
                      Complete
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Professional Status</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">
                      Complete
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Background Check</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">
                      Complete
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-sm">Tax Information</span>
                    </div>
                    <Badge variant="outline" className="text-yellow-600 border-yellow-300 bg-yellow-50">
                      Pending
                    </Badge>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="md:col-span-2 space-y-6">
              <GlassCard className="p-6">
                <h3 className="font-medium mb-4">Basic Information</h3>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="Jason Ludwig" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="stage-name">Stage Name</Label>
                      <Input id="stage-name" defaultValue="J.Ludwig" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="category">Primary Category</Label>
                      <Input id="category" defaultValue="Musician" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subcategory">Subcategory</Label>
                      <Input id="subcategory" defaultValue="Singer-Songwriter" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      defaultValue="Award-winning musician with over 10 years of experience performing at high-profile events, weddings, and corporate functions. Known for engaging performances and ability to adapt to different audience preferences."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="Los Angeles, CA" />
                  </div>

                  <Button className="w-full sm:w-auto">
                    Save Changes
                  </Button>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Gallery</h3>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photos
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {gallery.map((image, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-white text-primary"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="relative aspect-square border-2 border-dashed border-muted-foreground/30 rounded-md flex flex-col items-center justify-center p-4 text-center">
                    <Image className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Add New Photo
                    </span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-medium mb-4">Services & Packages</h3>
                <div className="space-y-4">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="flex items-center justify-between p-3 rounded-md bg-background">
                      <div className="flex items-center space-x-3">
                        {pkg.isActive ? (
                          <CheckSquare className="h-5 w-5 text-accent" />
                        ) : (
                          <Square className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div>
                          <h4 className="font-medium">{pkg.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            ${pkg.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <h3 className="text-lg font-semibold mb-4">Edit Service/Package</h3>
                            <form action="">
                              <input
                                type="text"
                                placeholder="Package Eg. Standard Performance"
                                className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                              <input
                                type="number"
                                placeholder="Price of Package"
                                className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                              <input
                                type="text"
                                placeholder="Package Description"
                                className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                              <Button className="w-full bg-primary text-white hover:bg-accent">Update Service</Button>
                            </form>
                          </DialogContent>
                        </Dialog>

                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4 text-red-700" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Service
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <h3 className="text-lg font-semibold mb-4">Add Service/Package</h3>
                      <form action="">
                        <input
                          type="text"
                          placeholder="Package Eg. Standard Performance"
                          className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                          type="number"
                          placeholder="Price of Package"
                          className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                          type="text"
                          placeholder="Package Description"
                          className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button className="w-full bg-primary text-white hover:bg-accent">Add Service</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </GlassCard>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CelebrityDashboard;
