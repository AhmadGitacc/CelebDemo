import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/lib/firebase";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";

interface ReviewButtonProps {
  bookingId: string;
}

const ReviewButton: React.FC<ReviewButtonProps> = ({ bookingId }) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      toast({
        title: "Incomplete Review",
        description: "Please provide a rating and comment.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      // Get the full booking to pull extra info like userId and celebrityId
      const bookingRef = doc(db, "bookings", bookingId);
      const bookingSnap = await getDoc(bookingRef);

      if (!bookingSnap.exists()) throw new Error("Booking not found.");

      const booking = bookingSnap.data();

      const reviewData = {
        bookingId,
        celebrityId: booking.celebrityId,
        celebrityName: booking.celebrityName,
        clientId: booking.clientId,
        name: booking.clientName,
        event: booking.eventDesc,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      };

      // Save review to "reviews" collection
      await setDoc(doc(db, "reviews", bookingId), reviewData);

      // Update booking document to reflect that it has been reviewed
      await updateDoc(bookingRef, {
        reviewed: true,
        rating,
        comment,
      });

      toast({
        title: "Review Submitted",
        description: "Thanks for your feedback!",
      });

      setOpen(false);
    } catch (error) {
      console.error("Review submission failed:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="self-start mb-4">
          <Star className="h-4 w-4 mr-2" />
          Leave a Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate Your Experience</DialogTitle>
        </DialogHeader>

        <div className="flex space-x-1 my-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`h-6 w-6 cursor-pointer transition-colors ${
                (hoverRating || rating) >= i
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(i)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(i)}
            />
          ))}
        </div>

        <Textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <DialogFooter className="mt-4">
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewButton;
