import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/ui-custom/PageTransition';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import CelebrityDashboard from '@/components/dashboard/CelebrityDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { User, Award, Shield, Wallet } from 'lucide-react';
import DigitalWallet from '@/components/payment/Wallet';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<'dashboard' | 'wallet'>('dashboard');
  const navigate = useNavigate();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'client':
        return <ClientDashboard />;
      case 'celebrity':
        return <CelebrityDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <ClientDashboard />;
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto pt-28 pb-16 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {activeView === 'dashboard' ? 'Dashboard' : 'My Wallet'}
            </h1>
            <p className="text-muted-foreground">
              {activeView === 'dashboard'
                ? 'Manage your bookings, profile, and account settings'
                : 'Track your transactions and withdrawals in one place'}
            </p>
          </div>

          <div className="flex gap-4">
            <Tabs
              value={activeView}
              onValueChange={(value) => setActiveView(value as 'dashboard' | 'wallet')}
              className="w-full"
            >
              <TabsList>
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </TabsTrigger>
                <TabsTrigger value="wallet" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  <span className="hidden sm:inline">My Wallet</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {user?.role !== 'admin' && user?.role !== 'celebrity' && (
              <Button
                variant="outline"
                onClick={() => navigate('/search')}
              >
                Browse Celebrities
              </Button>
            )}
          </div>
        </div>

        {activeView === 'dashboard' && (
          <>
            <div className="mb-8">
              <Tabs value={user?.role} className="mx-auto max-w-md">
                <TabsList className="grid w-full grid-cols-1">
                  {user?.role === 'client' && (
                    <TabsTrigger value="client" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Client</span>
                    </TabsTrigger>
                  )}
                  {user?.role === 'celebrity' && (
                    <TabsTrigger value="celebrity" className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      <span>Celebrity</span>
                    </TabsTrigger>
                  )}
                  {user?.role === 'admin' && (
                    <TabsTrigger value="admin" className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Admin</span>
                    </TabsTrigger>
                  )}
                </TabsList>
              </Tabs>
            </div>

            {renderDashboard()}
          </>
        )}

        {activeView === 'wallet' && (
          <div className="bg-white dark:bg-black rounded-lg shadow-sm border h-auto">
            <DigitalWallet />
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Dashboard;
