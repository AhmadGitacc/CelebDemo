
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui-custom/GlassCard';
import PageTransition from '@/components/ui-custom/PageTransition';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, Zap, Award } from 'lucide-react';

const Index: React.FC = () => {
  const { toast } = useToast();
  
  const handleNotifyMe = () => {
    toast({
      title: "Notification Set",
      description: "We'll notify you when new celebrities join our platform.",
    });
  };

  return (
    <PageTransition>
      {/* Hero Section with Davido and Burna Boy */}
      <div className="relative pb-10">
        <div className="absolute inset-0 bg-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-purple-100/50 backdrop-blur-sm"></div>
        </div>
        
        <div className="container relative mx-auto pt-36 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-purple-600 bg-clip-text text-transparent">
                Connect With Your Favorite Celebrities
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl lg:max-w-none">
                Book personalized experiences, video messages, and live events with top celebrities and influencers from around the world.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
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
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://th.bing.com/th/id/OIP.cdAXQ096v0wkMms9pud0lwHaFX?rs=1&pid=ImgDetMain" 
                    alt="Davido" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-bold text-lg">Davido</p>
                    <p className="text-white/90 text-sm">Music</p>
                  </div>
                </div>
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 mt-8">
                  <img 
                    src="https://th.bing.com/th/id/OIP.YL3BU2evlZnKqj_uuvqf8AHaHQ?rs=1&pid=ImgDetMain" 
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
      <div className="bg-gray-50 py-20" id='how-it-works'>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting personalized celebrity experiences has never been easier. Follow these simple steps to connect with your favorite stars.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-accent">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse & Choose</h3>
              <p className="text-gray-600">
                Browse through our extensive list of celebrities and choose your favorite star for your special occasion.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Book & Pay</h3>
              <p className="text-gray-600">
                Select your preferred date and time, provide details about your request, and complete the secure payment.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect & Enjoy</h3>
              <p className="text-gray-600">
                Receive confirmation and enjoy your personalized celebrity experience through our secure platform.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a safe, reliable, and premium platform for connecting fans with celebrities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 text-accent mb-4 flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Celebrities</h3>
              <p className="text-gray-600">
                All celebrities on our platform are verified to ensure authentic experiences for our users.
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 text-accent mb-4 flex items-center justify-center">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Responses</h3>
              <p className="text-gray-600">
                Get quick responses and confirmations for your bookings, with most celebrities responding within 24 hours.
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 text-accent mb-4 flex items-center justify-center">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Experience</h3>
              <p className="text-gray-600">
                Enjoy high-quality, personalized interactions with your favorite celebrities in a premium environment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Connect?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-300">
            Join thousands of fans who have already experienced memorable moments with their favorite celebrities.
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
