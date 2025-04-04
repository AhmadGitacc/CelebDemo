
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import GlassCard from '@/components/ui-custom/GlassCard';
import PageTransition from '@/components/ui-custom/PageTransition';
import BookingCalendar from '@/components/booking/BookingCalendar';
import PaymentFlow from '@/components/booking/PaymentFlow';
import { Share, Zap } from '@/components/ui-custom/IconWrapper';
import {
  Star,
  Clock,
  Calendar,
  DollarSign,
  MapPin,
  Instagram,
  Twitter,
  Globe,
  Youtube,
  Music,
  CheckCircle,
  ChevronLeft,
  MessageSquare,
  FileText,
  ArrowRight,
  ChevronRight,
  Play,
  Mic,
  Image as ImageIcon,
  Video,
  Award,
  Briefcase,
  Heart
} from 'lucide-react';

const CelebrityProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeStage, setActiveStage] = useState<'info' | 'booking' | 'payment'>('info');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  // This is mock data - in a real app this would come from an API
  const celebrity = {
    id: id || '1',
    name: 'Wizkid',
    category: 'Musician',
    subcategory: 'Singer-Songwriter',
    image: '/assets/wizkid.jpg',
    rating: 4.8,
    reviewCount: 18,
    location: 'Lagos, NG',
    bio: "Wizkid is the global superstar who brought Afrobeats to the world stage! From his early days in Lagos to dominating charts worldwide, Wizkid’s journey has been nothing short of legendary. His 2011 hit “Holla at Your Boy” introduced us to his signature style, and collaborations with global artists like Drake on “One Dance” skyrocketed him to international fame. Known for his smooth fusion of Afrobeats, reggae, and R&B, Wizkid’s music is a celebration of African culture. His album Made in Lagos gave us timeless tracks, and he's still leading the wave",
    isVerified: true,
    isInstantBooking: false,
    isAvailableToday: false,
    followersCount: '450K',
    minimumPrice: 5000,
    languages: ['English', 'Spanish'],
    packages: [
      {
        id: '1',
        name: 'Standard Performance',
        description: '1-hour live performance with standard setup and sound equipment',
        price: 5000,
        duration: '1 hour',
        features: [
          'Live performance for up to 100 guests',
          'Basic sound equipment included',
          'Standard lighting setup',
          '1 rehearsal before the event'
        ]
      },
      {
        id: '2',
        name: 'Premium Experience',
        description: '2-hour performance with premium equipment and meet & greet session',
        price: 8000,
        duration: '2 hours',
        features: [
          'Live performance for up to 200 guests',
          'Premium sound equipment included',
          'Custom lighting setup',
          '2 rehearsals before the event',
          'Meet & greet with the audience',
          'Photo opportunities with the host'
        ],
        isPopular: true
      },
      {
        id: '3',
        name: 'VIP Package',
        description: 'Complete entertainment solution with personalized setlist and VIP experience',
        price: 12000,
        duration: '3 hours',
        features: [
          'Live performance for up to 300 guests',
          'Top-tier sound and lighting equipment',
          'Personalized setlist customization',
          'Unlimited rehearsals',
          'VIP meet & greet with champagne toast',
          'Professional recording of the performance',
          'Dedicated event coordinator'
        ]
      },
      {
        id: '4',
        name: 'Social Media Shoutout',
        description: 'A customized shoutout directed to you on the public social media platform of your choice',
        price: 5000,
        duration: '24 hours',
        features: [
          'Public shoutout',
          'Tagged in the post',
          'Visible to all followers'
        ]
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
    ],
    videos: [
      {
        id: '1',
        thumbnail: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        title: 'Live at Madison Square Garden',
        views: '1.2M'
      },
      {
        id: '2',
        thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        title: 'Acoustic Session - "Memories"',
        views: '870K'
      }
    ],
    reviews: [
      {
        id: '1',
        user: {
          name: 'Sarah Johnson',
          image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
        },
        rating: 5,
        date: 'June 10, 2023',
        text: 'Jason was incredible at our corporate event. His performance exceeded all expectations and was the highlight of the evening. Very professional and accommodating throughout the booking process.',
        event: 'Corporate Award Ceremony'
      },
      {
        id: '2',
        user: {
          name: 'Michael Rodriguez',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
        },
        rating: 4,
        date: 'May 20, 2023',
        text: 'We hired Jason for our wedding and he created the perfect atmosphere for our special day. His song selection was perfect and he even learned our favorite song for the first dance. Highly recommend!',
        event: 'Wedding Reception'
      },
      {
        id: '3',
        user: {
          name: 'Emily Parker',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80'
        },
        rating: 5,
        date: 'April 15, 2023',
        text: 'Jason is an amazing talent! His voice is absolutely stunning and he was so engaging with our guests. The booking process was smooth and he was very communicative leading up to the event.',
        event: 'Charity Gala'
      }
    ],
    socials: {
      instagram: '@Wizkid',
      twitter: '@Wizkidmusic',
      youtube: 'WizkidMusic',
      website: 'Wizkid.com'
    },
    achievements: [
      'Grammy Award Nominee 2021',
      'Billboard Top 100 Artist',
      'Performed at Coachella 2022',
      'Collaborated with top industry artists'
    ]
  };

  const handleSelectPackage = (pkg: any) => {
    setSelectedPackage(pkg);
    setActiveStage('booking');
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleProceedToPayment = () => {
    if (selectedDate && selectedTime && selectedPackage) {
      setActiveStage('payment');
    }
  };

  const handlePaymentComplete = () => {
    // In a real app, you'd redirect to a booking confirmation page or show a success message
    console.log('Payment completed!');
  };

  const renderBookingStage = () => {
    switch (activeStage) {
      case 'info':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Select a Package</h3>
            <div className="grid gap-4">
              {celebrity.packages.map((pkg) => (
                <GlassCard 
                  key={pkg.id} 
                  className={`p-6 transition-all duration-300 ${
                    pkg.isPopular ? 'border-accent/30 relative' : ''
                  } ${selectedPackage?.id === pkg.id ? 'ring-2 ring-accent' : ''}`}
                  interactive
                  onClick={() => handleSelectPackage(pkg)}
                >
                  {pkg.isPopular && (
                    <Badge className="absolute top-1 right-3 bg-accent">
                      Most Popular
                    </Badge>
                  )}
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg">{pkg.name}</h4>
                    <div className="text-xl font-bold">${pkg.price.toLocaleString()}</div>
                  </div>
                  <p className="text-muted-foreground mb-4">{pkg.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4 mr-2 text-accent" />
                    {pkg.duration} duration
                  </div>
                  <Separator className="my-4" />
                  <h5 className="font-medium mb-2">What's included:</h5>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6" 
                    onClick={() => handleSelectPackage(pkg)}
                  >
                    Select Package
                  </Button>
                </GlassCard>
              ))}
            </div>
          </div>
        );
      case 'booking':
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveStage('info')}
                className="mr-2"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h3 className="text-xl font-semibold">Select Date & Time</h3>
            </div>
            
            {selectedPackage && (
              <div className="mb-6">
                <GlassCard className="p-4 bg-accent/5 border-accent/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Selected Package:</h4>
                      <p className="font-semibold">{selectedPackage.name}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Price</div>
                      <div className="font-bold">${selectedPackage.price.toLocaleString()}</div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}
            
            <BookingCalendar 
              onSelectDate={handleDateSelect} 
              onSelectTime={handleTimeSelect} 
              onBook={handleProceedToPayment}
            />
          </div>
        );
      case 'payment':
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveStage('booking')}
                className="mr-2"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h3 className="text-xl font-semibold">Payment Details</h3>
            </div>
            
            {selectedPackage && selectedDate && selectedTime && (
              <div className="mb-6">
                <GlassCard className="p-4 mb-6">
                  <h4 className="font-medium mb-3">Booking Summary</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Celebrity:</div>
                    <div>{celebrity.name}</div>
                    <div className="text-muted-foreground">Package:</div>
                    <div>{selectedPackage.name}</div>
                    <div className="text-muted-foreground">Date:</div>
                    <div>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    <div className="text-muted-foreground">Time:</div>
                    <div>{selectedTime}</div>
                    <div className="text-muted-foreground">Duration:</div>
                    <div>{selectedPackage.duration}</div>
                  </div>
                </GlassCard>
                
                <PaymentFlow 
                  amount={selectedPackage.price} 
                  onComplete={handlePaymentComplete}
                />
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto pt-28 pb-16 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Profile Info */}
          <div className="lg:w-2/3 space-y-8">
            <Link to="/search" className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Search
            </Link>
            
            <div className="relative">
              <div className="w-full h-72 bg-gradient-to-r from-accent/20 to-primary/10 rounded-xl overflow-hidden">
                <img 
                  src={celebrity.gallery[0]} 
                  alt="Cover"
                  className="w-full h-full object-cover object-center mix-blend-overlay opacity-60"
                />
              </div>
              
              <div className="absolute -bottom-16 left-8 flex items-end">
                <Avatar className="h-32 w-32 border-4 border-background rounded-xl shadow-lg">
                  <AvatarImage src={celebrity.image} alt={celebrity.name} className="object-cover" />
                  <AvatarFallback>{celebrity.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 mb-4">
                  <div className="flex items-center">
                    <h1 className="text-3xl font-bold">{celebrity.name}</h1>
                    {celebrity.isVerified && (
                      <CheckCircle className="h-5 w-5 text-accent ml-2" />
                    )}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <span>{celebrity.category}</span>
                    {celebrity.subcategory && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{celebrity.subcategory}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-16">
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium mr-1">{celebrity.rating}</span>
                  <span className="text-muted-foreground">({celebrity.reviewCount} reviews)</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-accent mr-1" />
                  <span>{celebrity.location}</span>
                </div>
                
                <div className="flex items-center">
                  <Music className="h-5 w-5 text-accent mr-1" />
                  <span>{celebrity.followersCount} followers</span>
                </div>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="media">Photos & Videos</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-8">
                  <GlassCard className="p-6">
                    <h2 className="text-xl font-semibold mb-4">About {celebrity.name}</h2>
                    <p className="text-muted-foreground mb-6">
                      {celebrity.bio}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          {celebrity.languages.map((language) => (
                            <Badge key={language} variant="secondary">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Experience</h3>
                        <p>10+ years</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Response Rate</h3>
                        <p>95%</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Response Time</h3>
                        <p>Within 24 hours</p>
                      </div>
                    </div>
                  </GlassCard>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GlassCard className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Achievements</h2>
                      <ul className="space-y-3">
                        {celebrity.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start">
                            <Award className="h-5 w-5 text-accent mr-3 mt-0.5" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                    
                    <GlassCard className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Social Media & Contact</h2>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Instagram className="h-5 w-5 text-pink-500 mr-3" />
                          <span>{celebrity.socials.instagram}</span>
                        </div>
                        <div className="flex items-center">
                          <Twitter className="h-5 w-5 text-blue-400 mr-3" />
                          <span>{celebrity.socials.twitter}</span>
                        </div>
                        <div className="flex items-center">
                          <Youtube className="h-5 w-5 text-red-500 mr-3" />
                          <span>{celebrity.socials.youtube}</span>
                        </div>
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 text-accent mr-3" />
                          <span>{celebrity.socials.website}</span>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                  
                  <GlassCard className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Featured Photos</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {celebrity.gallery.slice(0, 4).map((image, index) => (
                        <div key={index} className="relative aspect-square group overflow-hidden rounded-lg">
                          <img 
                            src={image} 
                            alt={`${celebrity.name} ${index + 1}`} 
                            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-9 w-9 rounded-full bg-white text-primary"
                            >
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                  
                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Recent Reviews</h2>
                      <Button variant="link" onClick={() => setActiveTab('reviews')}>
                        View All
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <div className="space-y-6">
                      {celebrity.reviews.slice(0, 2).map((review) => (
                        <div key={review.id} className="pb-6 border-b border-border last:border-0 last:pb-0">
                          <div className="flex justify-between mb-3">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-3">
                                <AvatarImage src={review.user.image} />
                                <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{review.user.name}</div>
                                <div className="text-xs text-muted-foreground">{review.date}</div>
                              </div>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{review.text}</p>
                          <Badge variant="outline" className="text-xs">
                            {review.event}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </TabsContent>
                
                <TabsContent value="media" className="space-y-8">
                  <GlassCard className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Photo Gallery</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {celebrity.gallery.map((image, index) => (
                        <div key={index} className="relative aspect-square group overflow-hidden rounded-lg">
                          <img 
                            src={image} 
                            alt={`${celebrity.name} ${index + 1}`} 
                            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-9 w-9 rounded-full bg-white text-primary"
                            >
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                  
                  <GlassCard className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Videos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {celebrity.videos.map((video) => (
                        <div key={video.id} className="relative group">
                          <div className="relative rounded-lg overflow-hidden aspect-video">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title} 
                              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 hover:text-white"
                              >
                                <Play className="h-5 w-5 ml-0.5" />
                              </Button>
                            </div>
                          </div>
                          <h3 className="font-medium mt-3">{video.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Mic className="h-3.5 w-3.5 mr-1.5" />
                            <span>Jason Ludwig</span>
                            <span className="mx-2">•</span>
                            <span>{video.views} views</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </TabsContent>
                
                <TabsContent value="reviews" className="space-y-8">
                  <GlassCard className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                      <div>
                        <h2 className="text-xl font-semibold mb-1">Client Reviews</h2>
                        <p className="text-muted-foreground">See what others are saying about working with {celebrity.name}</p>
                      </div>
                      <div className="flex items-center bg-muted p-4 rounded-lg">
                        <div className="text-center mr-6">
                          <div className="text-3xl font-bold">{celebrity.rating}</div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < Math.floor(celebrity.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {celebrity.reviewCount} reviews
                          </div>
                        </div>
                        <div className="grid gap-2 flex-1">
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className="h-3 w-3 text-yellow-500 fill-yellow-500" 
                                />
                              ))}
                            </div>
                            <div className="w-full max-w-[180px]">
                              <div className="h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 rounded-full" style={{width: '75%'}}></div>
                              </div>
                            </div>
                            <span className="text-sm">75%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className="h-3 w-3 text-yellow-500 fill-yellow-500" 
                                />
                              ))}
                              <Star className="h-3 w-3 text-gray-300" />
                            </div>
                            <div className="w-full max-w-[180px]">
                              <div className="h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 rounded-full" style={{width: '20%'}}></div>
                              </div>
                            </div>
                            <span className="text-sm">20%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(3)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className="h-3 w-3 text-yellow-500 fill-yellow-500" 
                                />
                              ))}
                              {[...Array(2)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-gray-300" />
                              ))}
                            </div>
                            <div className="w-full max-w-[180px]">
                              <div className="h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 rounded-full" style={{width: '5%'}}></div>
                              </div>
                            </div>
                            <span className="text-sm">5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-8">
                      {celebrity.reviews.map((review) => (
                        <div key={review.id} className="pb-8 border-b border-border last:border-0 last:pb-0">
                          <div className="flex justify-between mb-3">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={review.user.image} />
                                <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{review.user.name}</div>
                                <div className="text-sm text-muted-foreground">{review.date}</div>
                              </div>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <Badge variant="outline" className="mb-3">
                            {review.event}
                          </Badge>
                          <p className="text-muted-foreground">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-8">
                  <GlassCard className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Professional Details</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Professional Experience</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <Briefcase className="h-5 w-5 text-accent mr-3 mt-0.5" />
                            <div>
                              <span className="font-medium">Sony Music Entertainment</span>
                              <p className="text-sm text-muted-foreground">Signed Artist (2015-Present)</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Briefcase className="h-5 w-5 text-accent mr-3 mt-0.5" />
                            <div>
                              <span className="font-medium">Live Nation</span>
                              <p className="text-sm text-muted-foreground">Touring Musician (2018-Present)</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Briefcase className="h-5 w-5 text-accent mr-3 mt-0.5" />
                            <div>
                              <span className="font-medium">Indie Records</span>
                              <p className="text-sm text-muted-foreground">Recording Artist (2012-2015)</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Education & Training</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <Award className="h-5 w-5 text-accent mr-3 mt-0.5" />
                            <div>
                              <span className="font-medium">Berklee College of Music</span>
                              <p className="text-sm text-muted-foreground">Bachelor of Music (2008-2012)</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Award className="h-5 w-5 text-accent mr-3 mt-0.5" />
                            <div>
                              <span className="font-medium">Juilliard School</span>
                              <p className="text-sm text-muted-foreground">Summer Program (2007)</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </GlassCard>
                  
                  <GlassCard className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Equipment & Requirements</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Equipment Provided</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">Professional microphone</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">Acoustic guitar</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">Basic sound equipment</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">Personal monitor</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Venue Requirements</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-accent mr-2" />
                            <span className="text-sm">Adequate stage space (min. 8x10ft)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-accent mr-2" />
                            <span className="text-sm">Power outlets within 15ft of performance area</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-accent mr-2" />
                            <span className="text-sm">Changing/preparation room</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-accent mr-2" />
                            <span className="text-sm">Parking for equipment loading</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </GlassCard>
                  
                  <GlassCard className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Booking Policies</h2>
                    <div className="space-y-5">
                      <div>
                        <h3 className="font-medium mb-2">Cancellation Policy</h3>
                        <p className="text-sm text-muted-foreground">
                          Full refund if cancelled more than 30 days before the event. 50% refund if cancelled 15-30 days before. No refund for cancellations within 14 days of the event.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Payment Terms</h3>
                        <p className="text-sm text-muted-foreground">
                          50% deposit required to confirm booking. Remaining balance due 7 days before the event date.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Travel & Accommodation</h3>
                        <p className="text-sm text-muted-foreground">
                          Travel expenses are included for events within 50 miles of Los Angeles. Additional travel fees apply for events beyond this radius. Accommodation required for multi-day events or events requiring overnight stay.
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Right Side - Booking Section */}
          <div className="lg:w-1/3 space-y-6">
            <div className="sticky top-28">
              <GlassCard className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Starting from</div>
                    <div className="text-3xl font-bold">${celebrity.minimumPrice.toLocaleString()}</div>
                  </div>
                  
                  <div className="flex">
                    <Button variant="outline" size="icon" className="mr-2">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center mb-6">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium mr-1">{celebrity.rating}</span>
                  <span className="text-muted-foreground">({celebrity.reviewCount} reviews)</span>
                </div>
                
                {celebrity.isInstantBooking && (
                  <Badge className="mb-6 bg-accent">
                    <Zap className="h-3.5 w-3.5 mr-1.5" />
                    Instant Booking Available
                  </Badge>
                )}
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-accent mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium">Flexible Schedule</h3>
                      <p className="text-sm text-muted-foreground">
                        Check availability for your preferred dates
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-accent mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium">Personalized Contract</h3>
                      <p className="text-sm text-muted-foreground">
                        All bookings include a detailed agreement
                      </p>
                    </div>
                  </div>
                  
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Book Now
                  </Button>
                  {/* <Button variant="outline" className="w-full" size="lg">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button> */}
                </div>
              </GlassCard>
              
              <GlassCard className="mt-6 p-0 overflow-hidden">
                {renderBookingStage()}
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CelebrityProfile;
