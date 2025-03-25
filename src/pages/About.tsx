import { CheckCircle, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui-custom/GlassCard";
import PageTransition from "@/components/ui-custom/PageTransition";

export default function AboutPage() {
    return (
        <PageTransition>
            <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-purple-100/50 via-white to-purple-100/50  text-gray-900">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-purple-600 bg-clip-text text-transparent">
                    About Us
                </h1>
                <p className="text-lg max-w-3xl">
                    Connecting you with world-class celebrities and influencers for your events and campaigns. We specialize in bridging the gap between brands and high-profile personalities, ensuring impactful collaborations that drive engagement and success.
                </p>
            </section>
            {/* 
            <section className="w-full py-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg max-w-3xl">
                    Our mission is to simplify complex problems through cutting-edge technology and intuitive design. We strive to create impactful digital experiences that make a difference.
                </p>
            </section> */}

            <section className="w-full py-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-lg max-w-3xl">
                    Have questions or want to collaborate? Reach out to us today!
                </p>
                <Button className="mt-6 bg-accent">Contact Us</Button>
            </section>
        </PageTransition>
    );
}
