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
                        <p className="text-4xl font-bold text-black dark:text-white">Our Terms of Service</p> <br />
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                            By using our platform, you agree to the following: <br />
                            1.	Eligibility: You must be 18 years or older to use this platform. <br />
                            2.	Bookings: All bookings are subject to talent availability and approval. We serve as a middleman and do not guarantee final outcomes. <br />
                            3.	Payments: Payments are processed securely. Bookings may require upfront payment or escrow. A small commission is taken by the platform. <br />
                            4.	Cancellations & Refunds: Refunds are subject to our policy usually only valid if cancellations are made 48 hours before the agreed time. <br />
                            5.	Conduct: Users may not engage in fraudulent, abusive, or illegal activity. Violations may result in account suspension. <br />
                            6.	Intellectual Property: Talent images, names, and content belong to their respective owners. We reserve the right to feature listed talents on the platform. <br />
                            7.	Disputes: We aim to resolve disputes fairly but are not responsible for individual behavior. <br />
                            8.	Updates: Terms may change. Continued use means you accept those changes. <br />
                            <br />
                            If you have any questions, contact us via <a href="mailto:support@joinyaza.com" className='text-blue-300'>support@joinyaza.com</a>
                        </p>
                    </TabsContent>
                    <TabsContent value="privacy" className="mt-6">
                        <p className="text-4xl font-bold text-black dark:text-white">Our Privacy Policy</p><br />
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                            Effective Date: April 8, 2025 <br />

                            At Yaza Technologies, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our platform. <br />
                            <br />
                            1. Information We Collect <br />
                            •	Personal Information: Name, email, phone number, social media links, payment details, etc. <br />
                            •	Usage Data: Pages visited, booking activity, device type, and other technical data. <br />
                            •	Talent Information: Profile details, media, and services offered (for talents/influencers). <br />
                            <br /><br />
                            2. How We Use Your Information <br />
                            •	To process bookings and payments. <br />
                            •	To communicate updates and respond to inquiries. <br />
                            •	To personalize user experience and improve our platform. <br />
                            •	For marketing, analytics, and service development. <br />
                            <br /><br />
                            3. Sharing Your Information <br />
                            We do not sell your personal data. We may share limited information with: <br />
                            •	Payment processors (to complete transactions). <br />
                            •	Verified partners working with Yaza Technologies. <br />
                            •	Legal authorities, if required by law. <br />
                            <br /><br />
                            4. Your Rights <br />
                            •	You can request to access, update, or delete your personal data. <br />
                            •	You may opt-out of marketing emails at any time. <br />
                            <br /><br />
                            5. Data Security <br />

                            We use encryption, firewalls, and other security measures to protect your data. However, no system is 100% secure, so we encourage users to stay vigilant. <br />
                            <br /><br />
                            6. Cookies <br />

                            We use cookies to enhance your experience. You can manage cookie preferences through your browser settings. <br />
                            <br /><br />
                            7. Changes to This Policy <br />

                            We may update this Privacy Policy. Continued use of the platform means you accept any changes. <br />
                            <br /><br />
                            8. Contact Us <br />

                            If you have questions or concerns, please reach out via <a href="mailto:support@joinyaza.com" className='text-blue-300'>support@joinyaza.com</a>
                        </p>
                    </TabsContent>
                    <TabsContent value="cookies" className="mt-6">
                        <p className="text-4xl font-bold text-black dark:text-white">Cookies Policy</p><br />
                        <p className="text-lg text-gray-700 dark:text-gray-300">We use cookies to enhance your experience. You can manage cookie preferences through your browser settings. <br /></p>
                    </TabsContent>
                </Tabs>
            </div>
        </PageTransition>
    );
};

export default TermsPrivacy;
