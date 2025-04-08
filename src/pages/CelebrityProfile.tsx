
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import GlassCard from '@/components/ui-custom/GlassCard';
import PageTransition from '@/components/ui-custom/PageTransition';
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
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "@/lib/firebase";
import { BookingStage } from '@/components/booking/BookingStage';

const CelebrityProfile: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const [celebrityInfo, setCelebrityInfo] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchCelebrityAndServices = async () => {
      try {
        // 1. Get celebrity document
        const docRef = doc(db, 'celebrities', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCelebrityInfo({ id: docSnap.id, ...docSnap.data() });

          // 2. Get services subcollection under this celeb
          const servicesRef = collection(db, 'celebrities', id, 'services');
          const servicesSnap = await getDocs(servicesRef);
          const servicesData = servicesSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setServices(servicesData);
        } else {
          console.log('Celebrity not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsRef = collection(db, 'reviews');
        const reviewsQuery = query(reviewsRef, where("celebrityId", "==", id));
        const reviewsSnap = await getDocs(reviewsQuery);

        const reviewsData = reviewsSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setReviews(reviewsData);

      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (id) {
      fetchCelebrityAndServices();
      fetchReviews();
    }
  }, [id]);


  useEffect(() => {
    if (reviews.length > 0) {
      const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
      const avg = total / reviews.length;
      setAverageRating(avg);
    }
  }, [reviews]);


  // This is mock data - in a real app this would come from an API
  const celebrity = {
    isVerified: true,
    isInstantBooking: false,
    isAvailableToday: false,
    followersCount: '450K',
    languages: ['English', 'Spanish'],
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
    socials: {
      instagram: '@Wizkid',
      twitter: '@Wizkidmusic',
      youtube: 'WizkidMusic',
      website: 'Wizkid.com'
    },
  };


  if (!celebrityInfo)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-lg font-semibold text-muted-foreground animate-pulse">
          Loading celebrity data...
        </p>
      </div>
    );


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
                  <AvatarImage src={celebrityInfo.image} alt={celebrityInfo.name} className="object-cover" />
                  <AvatarFallback>{celebrityInfo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 mb-4">
                  <div className="flex items-center">
                    <h1 className="text-3xl font-bold">{celebrityInfo.name}</h1>
                    {celebrity.isVerified && (
                      <CheckCircle className="h-5 w-5 text-accent ml-2" />
                    )}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <span>{celebrityInfo.category}</span>
                    {celebrityInfo.subcategory && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{celebrityInfo.subcategory}</span>
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
                  <span className="font-medium mr-1">{averageRating || "0.0"} /</span>
                  <span className="text-muted-foreground">{reviews.length || "0.0"} review(s)</span>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-accent mr-1" />
                  <span>{celebrityInfo.location}</span>
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
                    <h2 className="text-xl font-semibold mb-4">About {celebrityInfo.name}</h2>
                    <p className="text-muted-foreground mb-6">
                      {celebrityInfo.bio}
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
                            alt={`${celebrityInfo.name} ${index + 1}`}
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
                      {reviews.slice(0, 2).map((review) => (
                        <div key={review.id} className="pb-6 border-b border-border last:border-0 last:pb-0">
                          <div className="flex justify-between mb-3">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-3">
                                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{review.name}</div>
                                <div className="text-xs text-muted-foreground">{review.createdAt}</div>
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
                          <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
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
                            alt={`${celebrityInfo.name} ${index + 1}`}
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
                        <p className="text-muted-foreground">See what others are saying about working with {celebrityInfo.name}</p>
                      </div>
                      <div className="flex items-center bg-muted p-4 rounded-lg">
                        <div className="text-center">
                          <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>

                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.round(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {reviews.length || "0.0"} review(s)
                          </div>
                        </div>
                        {/* <div className="grid gap-2 flex-1">
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
                                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '75%' }}></div>
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
                                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '20%' }}></div>
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
                                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '5%' }}></div>
                              </div>
                            </div>
                            <span className="text-sm">5%</span>
                          </div>
                        </div> */}
                      </div>
                    </div>

                    <div className="space-y-8">
                      {reviews.map((review) => (
                        <div key={review.id} className="pb-6 border-b border-border last:border-0 last:pb-0">
                          <div className="flex justify-between mb-3">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-3">
                                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{review.name}</div>
                                <div className="text-xs text-muted-foreground">{review.createdAt}</div>
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
                          <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                          <Badge variant="outline" className="text-xs">
                            {review.event}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </TabsContent>

                <TabsContent value="details" className="space-y-8">
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
              {/* <GlassCard className="p-6">
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
                  <span className="font-medium mr-1">{celebrityInfo.rating || "0.0"}</span>
                  <span className="text-muted-foreground">({celebrityInfo.reviewCount || "0"} reviews)</span>
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
                </div>
              </GlassCard> */}

              <GlassCard className="mt-6 p-0 overflow-hidden">
                <BookingStage services={services} celebrityInfo={celebrityInfo} />

              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CelebrityProfile;
