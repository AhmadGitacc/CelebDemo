
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Search,
  User,
  Menu,
  X,
  Calendar,
  Star,
  MessageSquare,
  LogIn,
  LogOut,
  Settings,
  UserPlus,
  Wallet
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'glass-effect py-3 shadow-sm'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-display tracking-tight font-semibold text-primary">
            <span className="text-accent">Celeb</span>Connect
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              isActive('/') ? "text-accent" : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <Link 
            to="/search"
            className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              isActive('/search') ? "text-accent" : "text-muted-foreground"
            )}
          >
            Browse Celebrities
          </Link>
          <Link 
            to="/dashboard"
            className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              isActive('/dashboard') ? "text-accent" : "text-muted-foreground"
            )}
          >
            Dashboard
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm" className="rounded-full" onClick={() => navigate('/search')}>
            <Search className="h-4 w-4 mr-2" />
            Find Celebrity
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      {user?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Bookings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <Wallet className="h-4 w-4 mr-2" />
                  Wallet
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" className="rounded-full" onClick={() => navigate('/login')}>
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden p-2 text-muted-foreground"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-[56px] bg-background/95 backdrop-blur-sm z-40 transition-all duration-300 transform",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col h-full">
          <nav className="flex flex-col space-y-6 pt-6">
            <Link 
              to="/"
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary"
            >
              <Star className="h-5 w-5 text-accent" />
              <span className="font-medium">Home</span>
            </Link>
            <Link 
              to="/search"
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary"
            >
              <Search className="h-5 w-5 text-accent" />
              <span className="font-medium">Browse Celebrities</span>
            </Link>
            <Link 
              to="/dashboard"
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary"
            >
              <Calendar className="h-5 w-5 text-accent" />
              <span className="font-medium">Bookings</span>
            </Link>
            <Link 
              to="/dashboard"
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary"
            >
              <User className="h-5 w-5 text-accent" />
              <span className="font-medium">Profile</span>
            </Link>
            <Link 
              to="/dashboard"
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary"
            >
              <Wallet className="h-5 w-5 text-accent" />
              <span className="font-medium">Wallet</span>
            </Link>
          </nav>

          <div className="mt-auto pb-10 pt-6 border-t border-border">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 mb-4 p-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-xs text-muted-foreground">{user?.email}</div>
                  </div>
                </div>
                <Button className="w-full mb-4" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button className="w-full mb-4" onClick={() => navigate('/login')}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/sign-up')}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Account
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
