
import { db } from "@/lib/firebase";
import { doc, updateDoc } from 'firebase/firestore';
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

// Define props interface for the component
interface AcceptBookingButtonProps {
    bookingId: string;
    alert: string;
}

const AcceptBookingButton: React.FC<AcceptBookingButtonProps> = ({ bookingId, alert, }) => {
    const { toast } = useToast();
    
    const handleAcceptBooking = async () => {
        
        const confirmed = window.confirm("Click 'OK' to accept this booking request");

        if (confirmed) {
            try {
                // Reference to the booking document
                const bookingRef = doc(db, "bookings", bookingId);

                await updateDoc(bookingRef, {
                    status: 'confirmed',
                });
                toast({
                    title: 'Booking request accepted',
                    description: (
                        <span>
                            {alert}
                        </span>
                    ),
                    className: "border border-green-400 text-green-800",
                });
            } catch (error) {
                toast({
                    title: 'Error Accepting booking',
                });
            }
        }
    };

    return (
        <Button onClick={handleAcceptBooking}>
            <Check className="h-4 w-4 mr-2"/>
            Accept Booking
        </Button>
    );
};

export default AcceptBookingButton;
