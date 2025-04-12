import { Separator } from "@radix-ui/react-select";
import { Badge, Clock, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import GlassCard from "../ui-custom/GlassCard";
import BookingCalendar from "./BookingCalendar";
import PaymentFlow from "./PaymentFlow";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";


type BookingStageProps = {
    services: any[];
    celebrityInfo: {
        userId: string;
        name: string
        profileImage: string
    };
};

export const BookingStage: React.FC<BookingStageProps> = ({ services, celebrityInfo }) => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [activeStage, setActiveStage] = useState<'info' | 'booking' | 'details' | 'payment'>('info');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [selectedPackage, setSelectedPackage] = useState<any>(null);
    const [eventDescription, setEventDescription] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);


    const handleSelectPackage = (pkg: any) => {
        setSelectedPackage(pkg);
        setActiveStage('booking');
    };

    const handleDateSelect = (date: Date | undefined) => setSelectedDate(date);
    const handleTimeSelect = (time: string) => setSelectedTime(time);

    const handleProceedToDetails = () => {
        if (selectedDate && selectedTime && selectedPackage) {
            setActiveStage('details');
        }
    };
    const handleProceedToPayment = () => {
        if (selectedDate && selectedTime && selectedPackage && eventDescription && eventLocation) {
            setActiveStage('payment');
        }
    };

    const handlePaymentComplete = async () => {
        if (isProcessing) return;
        setIsProcessing(false);
        
        try {
            if (!user) throw new Error("No authenticated user found");

            // Generate a unique booking ID
            const generateBookingId = () => {
                const userPrefix = user.id.slice(0, 6); // Take the first 6 characters of the user's ID
                const timestamp = Date.now(); // Use timestamp for uniqueness
                return `${userPrefix}-${timestamp}`;
            };

            const bookingId = generateBookingId();

            await addDoc(collection(db, "bookings"), {
                clientId: user.id,
                clientName: user.name,
                celebrityName: celebrityInfo.name,
                celebrityImg: celebrityInfo.profileImage,
                celebrityId: celebrityInfo.userId,
                bookingId: bookingId, // Use the generated booking ID
                package: selectedPackage,
                date: selectedDate?.toISOString(),
                time: selectedTime,
                eventDesc: eventDescription,
                location: eventLocation,
                status: "pending",
                celebPaymentStatus: "pending",
                createdAt: new Date().toISOString(),
            });

            toast({
                title: 'Booking Request Sent',
                description: "Wait for booking confirmation",
                className: "border border-green-400 text-green-800",
            });
        } catch (error) {
            toast({
                title: 'Error Saving Booking',
                variant: "destructive"
            });
            console.error("Error saving booking:", error);
        } finally {
            setIsProcessing(false);
        }
    };


    switch (activeStage) {
        case 'info':
            return (
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Select a Package</h3>
                    <div className="grid gap-4 p-3">
                        {services.map((pkg) => (
                            <GlassCard
                                key={pkg.id}
                                className={`p-6 transition-all duration-300 ₦{pkg.isPopular ? 'border-accent/30 relative' : ''
                                    } ₦{selectedPackage?.id === pkg.id ? 'ring-2 ring-accent' : ''}`}
                                interactive
                                onClick={() => handleSelectPackage(pkg)}
                            >

                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-lg">{pkg.title}</h4>
                                    <div className="text-xl font-bold">₦{pkg.price.toLocaleString()}</div>
                                </div>
                                <p className="text-muted-foreground mb-4">{pkg.description}</p>
                                <div className="flex items-center text-sm text-muted-foreground mb-4">
                                    <Clock className="h-4 w-4 mr-2 text-accent" />
                                    {pkg.duration} duration
                                </div>
                                <Separator className="my-4" />
                                <h5 className="font-medium mb-2">What's included:</h5>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                        <span className="text-sm">{pkg.features}</span>
                                    </li>
                                </ul>
                                {user?.role == 'client' && (
                                    <Button
                                        className="w-full mt-6"
                                        onClick={() => handleSelectPackage(pkg)}
                                    >
                                        Select Package
                                    </Button>
                                )}
                            </GlassCard>
                        ))}
                    </div>
                </div>
            );

        case 'booking':
            return (
                <div className="space-y-6">
                    <div className="flex items-center mb-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveStage('info')}
                            className="mr-2"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Back
                        </Button>
                        <h3 className="text-xl font-semibold">Select Date & Time</h3>
                    </div>

                    {selectedPackage && (
                        <div className="mb-6 p-3">
                            <GlassCard className="p-4 bg-accent/5 border-accent/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Selected Package:</h4>
                                        <p className="font-semibold">{selectedPackage.title}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-muted-foreground">Price</div>
                                        <div className="font-bold">₦{selectedPackage.price.toLocaleString()}</div>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    )}

                    <BookingCalendar
                        onSelectDate={handleDateSelect}
                        onSelectTime={handleTimeSelect}
                        onBook={handleProceedToDetails}
                    />
                </div>
            );

        case 'details':
            return (
                <div className="space-y-6">
                    <div className="flex items-center mb-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveStage('booking')}
                            className="mr-2"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Back
                        </Button>
                        <h3 className="text-xl font-semibold">Event Details</h3>
                    </div>
                    {selectedPackage && (
                        <div className="mb-6 p-3">
                            <GlassCard className="p-4 bg-accent/5 border-accent/20">
                                <div className="flex items-center justify-between">
                                    <div className="text-left">
                                        <div className="text-sm text-muted-foreground">Date</div>
                                        <div className="font-bold">{selectedDate.toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric', month: 'long',
                                            day: 'numeric',
                                        })}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-muted-foreground">Time</div>
                                        <div className="font-bold">{selectedTime}</div>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    )}
                    {/* Event Details Form */}
                    <form className="p-3 space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <Label htmlFor="description">
                                Event Description
                            </Label>
                            <Textarea
                                id="description"
                                rows={4}
                                value={eventDescription}
                                onChange={(e) => setEventDescription(e.target.value)}
                                placeholder="Describe the event..."
                            />
                        </div>

                        <div>
                            <Label htmlFor="location">
                                Event Location
                            </Label>
                            <Input
                                id="location"
                                type="text"
                                value={eventLocation}
                                onChange={(e) => setEventLocation(e.target.value)}
                                placeholder="Enter the event location"
                            />
                        </div>
                    </form>
                    <Button
                        size="sm"
                        onClick={handleProceedToPayment}
                        className=" w-full"
                    >
                        Next
                        <ChevronRight className="h-4 w-4 mr-1" />
                    </Button>
                </div>
            );

        case 'payment':
            return (
                <div className="space-y-6">
                    <div className="flex items-center mb-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveStage('details')}
                            className="mr-2"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Back
                        </Button>
                        <h3 className="text-xl font-semibold">Payment Details</h3>
                    </div>

                    {selectedPackage && selectedDate && selectedTime && (
                        <div className="mb-6 p-3">
                            <GlassCard className="p-4 mb-6">
                                <h4 className="font-medium mb-3">Booking Summary</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="text-muted-foreground">Celebrity:</div>
                                    <div>{celebrityInfo.name}</div>
                                    <div className="text-muted-foreground">Package:</div>
                                    <div>{selectedPackage.title}</div>
                                    <div className="text-muted-foreground">Date:</div>
                                    <div>{selectedDate.toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</div>
                                    <div className="text-muted-foreground">Time:</div>
                                    <div>{selectedTime}</div>
                                    <div className="text-muted-foreground">Duration:</div>
                                    <div>{selectedPackage.duration}</div>
                                </div>
                            </GlassCard>

                            <PaymentFlow
                                amount={selectedPackage.price}
                                onComplete={handlePaymentComplete}
                            />
                        </div>
                    )}
                </div>
            );

        default:
            return null;
    }
};