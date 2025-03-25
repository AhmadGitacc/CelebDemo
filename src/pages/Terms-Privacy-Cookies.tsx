import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PageTransition from '@/components/ui-custom/PageTransition';

const TermsPrivacy = () => {
    const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'cookies'>('terms');

    return (
        <PageTransition>
            <div className="container mx-auto pt-28 pb-16 px-4">
                <h1 className="text-3xl font-bold tracking-tight text-center mb-6">Legal Information</h1>

                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'terms' | 'privacy' | 'cookies')} className="w-full max-w-2xl mx-auto">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="terms">Terms of Service</TabsTrigger>
                        <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
                        <TabsTrigger value="cookies">Cookies Policy</TabsTrigger>
                    </TabsList>

                    <TabsContent value="terms" className="mt-6">
                        <p className="text-lg text-gray-700 dark:text-gray-300">Here are our terms of service...</p>
                    </TabsContent>
                    <TabsContent value="privacy" className="mt-6">
                        <p className="text-lg text-gray-700 dark:text-gray-300">Here is our privacy policy...</p>
                    </TabsContent>
                    <TabsContent value="cookies" className="mt-6">
                        <p className="text-lg text-gray-700 dark:text-gray-300">Here is our cookies policy...</p>
                    </TabsContent>
                </Tabs>
            </div>
        </PageTransition>
    );
};

export default TermsPrivacy;
