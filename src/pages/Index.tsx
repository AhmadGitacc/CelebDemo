
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui-custom/GlassCard';
import PageTransition from '@/components/ui-custom/PageTransition';
import { useToast } from '@/components/ui/use-toast';
import { gsap } from "gsap";
import * as lucideReact from 'lucide-react';

const Index: React.FC = () => {
  const { toast } = useToast();

  const handleNotifyMe = () => {
    toast({
      title: "Notification Set",
      description: "We'll notify you when new celebrities join our platform.",
    });
  };

  useEffect(() => {
    gsap.to(".floating-image", {
      y: "-30px",
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "power1.inOut",
    });

    gsap.to(".floating-image2", {
      delay: 0.4,
      y: "-30px",
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "power1.inOut",
    });

    gsap.from(".slide-down", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2,
    });
    
  }, []);


  return (
    <PageTransition>
      {/* Hero Section with Davido and Burna Boy */}
      <div className="relative pb-10 pt-0">
        <div className="container relative mx-auto pt-5 md:pt-36 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
              <h1 className="slide-down text-4xl md:text-5xl lg:text-6xl  font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-600 to-gray-500 dark:text-white bg-clip-text text-transparent">
                Connect With Your Favorite Celebrities
              </h1>
              <p className="slide-down text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl lg:max-w-none">
                Book personalized experiences, video messages, and live events with top celebrities and influencers from around the world.
              </p>
              <div className="slide-down flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/search">Browse Celebrities</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full">
                  <Link to="/login">Login as Celebrity</Link>
                </Button>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative">
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="floating-image relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="/assets/davido.jpg"
                    alt="Davido"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-bold text-lg">Davido</p>
                    <p className="text-white/90 text-sm">Music</p>
                  </div>
                </div>
                <div
                  className="floating-image2 relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 mt-8">
                  <img
                    src="/assets/burnaboy.jpg"
                    alt="Burna Boy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-bold text-lg">Burna Boy</p>
                    <p className="text-white/90 text-sm">Music</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 dark:bg-gradient-to-r from-gray-900 to-gray-800 py-20" id='how-it-works'>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Getting personalized celebrity experiences has never been easier. Follow these simple steps to connect with your favorite stars.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-accent">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse & Select</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore our exclusive roster of A-list musicians, comedians, influencers, and movie stars. Find the perfect celebrity for your event, endorsement, shoutout, or special appearance.
              </p>
            </GlassCard>

            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Submit Your Request</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Share the details of your booking, whether it’s a personalized video, live performance, or surprise experience. Our team will handle the logistics with precision and professionalism.
              </p>
            </GlassCard>

            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Confirm & Enjoy</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Once everything is set, sit back and let the magic unfold. From unforgettable shoutouts to high-profile events, we ensure a seamless and spectacular experience.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At [Company Name], we go beyond just booking talent—we create unforgettable experiences. Here’s why we stand out:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 text-accent mb-4 flex items-center justify-center">
                <lucideReact.CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Celebrities</h3>
              <p className="text-gray-600">
                Every celebrity on our platform is verified, ensuring authenticity and credibility.
              </p>
            </div>

            <div className="p-6">
              <div className="w-12 h-12 text-accent mb-4 flex items-center justify-center">
                <lucideReact.Award className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Exclusive Access</h3>
              <p className="text-gray-600">
                Connect with A-list musicians, comedians, influencers, and movie stars effortlessly.
              </p>
            </div>

            <div className="p-6">
              <div className="w-12 h-12 text-accent mb-4 flex items-center justify-center">
                <lucideReact.BookKeyIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Booking</h3>
              <p className="text-gray-600">
                From endorsement deals and shoutouts to special appearances and shows, we handle everything with professionalism.
              </p>
            </div>

            <div className="p-6">
              <div className="w-12 h-12 text-accent mb-4 flex items-center justify-center">
                <lucideReact.Zap className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quick Customer Response</h3>
              <p className="text-gray-600">
                Our dedicated team is always ready to assist, ensuring fast and efficient communication.
              </p>
            </div>

            <div className="p-6">
              <div className="w-12 h-12 text-accent mb-4 flex items-center justify-center">
                <lucideReact.Download className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Booking Confirmations</h3>
              <p className="text-gray-600">
                Secure your bookings with ease and get instant confirmations.
              </p>
            </div>

            <div className="p-6">
              <div className="w-12 h-12 text-accent mb-4 flex items-center justify-center">
                <lucideReact.PersonStanding className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Service</h3>
              <p className="text-gray-600">
                Whether it’s a private event, brand deal, or a surprise for a loved one, we tailor every booking to your needs.
              </p>
            </div>

            <div className="p-6">
              <div className="w-12 h-12 text-accent mb-4 flex items-center justify-center">
                <lucideReact.Handshake className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted by Clients</h3>
              <p className="text-gray-600">
                Our industry expertise and strong celebrity network ensure a smooth and reliable process.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Make Your Celebrity Moment Happen!</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-300">
            Join thousands who have booked unforgettable experiences with their favorite stars. Whether it’s a shoutout, a surprise, or a live event—your connection is just a click away.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-black rounded-full">
              <Link to="/search">Browse Celebrities</Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-black text-white border-white hover:bg-white/10 rounded-full" onClick={handleNotifyMe}>
              Get Notified
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
