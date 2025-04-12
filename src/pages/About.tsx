import { Button } from "@/components/ui/button";
import PageTransition from "@/components/ui-custom/PageTransition";

export default function AboutPage() {
    return (
        <PageTransition>
            <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-purple-100/50 via-white to-purple-100/50  text-gray-900">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-600 to-gray-500 dark:text-white bg-clip-text text-transparent">
                    About Us
                </h1>
                <p className="lg:text-lg sm:text-md max-w-3xl">
                    At yaza, we connect you with A-list musicians, comedians, content creators, movie stars, and influencers. With years of industry expertise and a vast celebrity network, we make booking seamless for shows, endorsement deals, shoutouts, special appearances, and even surprising loved ones.
                    <br /><br />
                    We don’t just book talent, we create unforgettable moments. Let us bring the spotlight to you.
                </p>
            </section>

            <section className="w-full py-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-lg max-w-3xl">
                    Have questions or want to collaborate? Reach out to us today!
                </p>
                <Button
                    className="mt-6 bg-accent"
                    onClick={() => window.location.href = 'mailto:support@joinyaza.com?subject=Celebrity%20Joining%20Yaza%20Request&body=Hello,%0A%0AI%20am%20"Your%20name%20and%20stagename"%20and%20im%20intrested%20in%20joining%20Yaza%20......'}
                >
                    Contact Us
                </Button>
            </section>
        </PageTransition>
    );
}
