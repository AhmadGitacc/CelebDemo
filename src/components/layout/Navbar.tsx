import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Search,
  User,
  Menu,
  X,
  Calendar,
  Star,
  LogIn,
  LogOut,
  Wallet,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-effect py-3 shadow-sm" : "bg-transparent py-5"
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
              isActive("/") && "text-accent"
            )}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/search"
            className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              isActive("/search") && "text-accent"
            )}
            onClick={closeMobileMenu}
          >
            Browse Celebrities
          </Link>
          <Link
            to="/dashboard"
            className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              isActive("/dashboard") && "text-accent"
            )}
            onClick={closeMobileMenu}
          >
            Dashboard
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => {
              navigate("/search");
              closeMobileMenu();
            }}
          >
            <Search className="h-4 w-4 mr-2" /> Find Celebrity
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
              <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg rounded-md border border-gray-200">
                <DropdownMenuLabel className="text-sm font-semibold px-4 py-2">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="border-gray-200" />

                <DropdownMenuItem onClick={() => navigate('/dashboard')} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition rounded-md">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate('/dashboard')} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition rounded-md">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  Bookings
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate('/dashboard')} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition rounded-md">
                  <Wallet className="h-4 w-4 mr-2 text-gray-500" />
                  Wallet
                </DropdownMenuItem>

                <DropdownMenuSeparator className="border-gray-200" />

                <DropdownMenuItem onClick={handleLogout} className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-100 transition rounded-md">
                  <LogOut className="h-4 w-4 mr-2 text-red-500" />
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

        {/* Mobile Menu Trigger */}
        <Dialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <DialogTrigger asChild>
            <button
              className="md:hidden p-2 text-muted-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </DialogTrigger>
          <DialogOverlay className="fixed inset-0 bg-black/50 dark:bg-black/70" />
          <DialogContent className="fixed left-1/2 -translate-x-1/2 p-6 bg-white dark:bg-gray-900 rounded-lg w-80 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <ThemeToggle />
              {/* <button onClick={closeMobileMenu} className="p-2">
                <X className="h-6 w-6 text-foreground" />
              </button> */}
            </div>
            <nav className="flex flex-col space-y-6">
              <Link
                to="/"
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={closeMobileMenu}
              >
                <Star className="h-5 w-5 text-accent" />
                <span className="font-medium">Home</span>
              </Link>
              <Link
                to="/search"
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={closeMobileMenu}
              >
                <Search className="h-5 w-5 text-accent" />
                <span className="font-medium">Browse Celebrities</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={closeMobileMenu}
              >
                <Calendar className="h-5 w-5 text-accent" />
                <span className="font-medium">Bookings</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={closeMobileMenu}
              >
                <User className="h-5 w-5 text-accent" />
                <span className="font-medium">Profile</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={closeMobileMenu}
              >
                <Wallet className="h-5 w-5 text-accent" />
                <span className="font-medium">Wallet</span>
              </Link>
            </nav>
            <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
              {isAuthenticated ? (
                <Button className="w-full" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => {
                    navigate("/login");
                    closeMobileMenu();
                  }}
                >
                  <LogIn className="h-4 w-4 mr-2" /> Sign In
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Navbar;
