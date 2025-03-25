
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Search from "./pages/Search";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import CelebrityProfile from "./pages/CelebrityProfile";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Initialize the Lucide icons to ensure they're available globally
import './components/ui-custom/IconWrapper';
import ScrollToAnchor from "./components/scroll/ScrollToSection";
import TermsPrivacy from "./pages/Terms-Privacy-Cookies";
import ScrollToTop from "./components/scroll/ScrollToTop";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <BrowserRouter>
    <ScrollToAnchor />
    <ScrollToTop />
    <Navbar />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/sign-up" element={<Auth />} />
      <Route path="/terms-privacy" element={<TermsPrivacy />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/celebrities/:id" element={<CelebrityProfile />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
