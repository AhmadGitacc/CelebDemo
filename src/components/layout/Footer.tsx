
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary dark:bg-black dark:text-white text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="inline-block mb-4">
              <div className="w-36 h-28 overflow-hidden">
                <img
                  src="/assets/WhiteLogo.svg"
                  alt="Burna Boy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </Link>
            <p className="text-primary-foreground/70 dark:text-white mb-6">
              Connecting you with world-class celebrities and influencers for your events and campaigns.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/60 hover:text-accent dark:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent dark:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent dark:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent dark:text-white transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/search" className="text-primary-foreground/70 dark:text-white hover:text-accent transition-colors">
                  Browse Celebrities
                </Link>
              </li>
              {/* <li>
                <Link to="/categories" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Categories
                </Link>
              </li> */}
              <li>
                <Link to="/#how-it-works"
                  className="text-primary-foreground/70 dark:text-white hover:text-accent transition-colors">
                  How It Works
                </Link>
              </li>
              {/* <li>
                <Link to="/pricing" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Pricing
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-accent dark:text-white transition-colors">
                  About Us
                </Link>
              </li>
              {/*
              <li>
                <Link to="/press" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Press
                </Link>
              </li>
              */}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-accent" />
                <span className="text-primary-foreground/70 dark:text-white">
                  support@joinyaza.com
                </span>
              </li>
              {/* <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-accent" />
                <span className="text-primary-foreground/70  dark:text-white">
                  +1 (555) 123-4567
                </span>
              </li> */}
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-accent" />
                <span className="text-primary-foreground/70 dark:text-white">
                  Ikota Shopping Complex<br />
                  Lekki, Lagos
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/10" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-foreground/50 dark:text-white mb-4 md:mb-0">
            © {new Date().getFullYear()} yaza. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms-privacy" className="text-sm text-primary-foreground/50 dark:text-white hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/terms-privacy" className="text-sm text-primary-foreground/50 dark:text-white hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-privacy" className="text-sm text-primary-foreground/50 dark:text-white hover:text-primary-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
