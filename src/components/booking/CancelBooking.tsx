
import { db } from "@/lib/firebase";
import { doc, updateDoc } from 'firebase/firestore';
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

// Define props interface for the component
interface CancelBookingButtonProps {
  bookingId: string;
  text: string;
  alert: string;
  statusbadge: string;
}

const CancelBookingButton: React.FC<CancelBookingButtonProps> = ({ bookingId, text, alert, statusbadge }) => {
  const { toast } = useToast();
  // Function to handle cancel booking action
  const handleCancelBooking = async () => {
    // Show confirmation before cancel
    const confirmed = window.confirm("You are about to cancel this booking, click 'OK' to continue");

    if (confirmed) {
      try {
        // Reference to the booking document
        const bookingRef = doc(db, "bookings", bookingId);

        await updateDoc(bookingRef, {
          status: statusbadge,
        });
        toast({
          title: 'Booking Cancelled',
          description: (
            <span>
              {alert}
            </span>
          ),
          className: "border border-green-400 text-red-800",
        });
      } catch (error) {
        toast({
          title: 'Error cancelling booking',
        });
      }
    }
  };

  return (
    <Button variant="outline"
      className="text-destructive hover:text-destructive" onClick={handleCancelBooking}>
        <X className="h-4 w-4 mr-2" />
      {text}
    </Button>
  );
};

export default CancelBookingButton;
