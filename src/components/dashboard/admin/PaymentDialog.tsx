import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface PaymentDialogProps {
    celebId: string;
    bookingId: string;
    paymentAmount: number;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

interface CelebData {
    name: string;
    [key: string]: any;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ celebId, bookingId, paymentAmount, isOpen, onOpenChange }) => {
    const [celebData, setCelebData] = useState<CelebData | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();


    useEffect(() => {
        if (!celebId || !isOpen) return;

        const fetchClient = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "celebrities", celebId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCelebData(docSnap.data() as CelebData);
                } else {
                    setCelebData(null);
                }
            } catch (error) {
                console.error("Error fetching celebrity data:", error);
                setCelebData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [celebId, isOpen]);

    const handleSaveChanges = async () => {
        const docRef = doc(db, "bookings", bookingId);

        try {
            await updateDoc(docRef, {
                celebPaymentStatus: "paid",
            });

            toast({
                title: 'Payment Successful',
                className: "bg-green-100 border border-green-400 text-green-800",
            });
        } catch (err) {
            console.error("Error saving changes:", err);

            toast({
                title: 'Error saving changes',
                variant: 'destructive'
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Account Information</DialogTitle>
                    <DialogDescription>Celebrity payment details.</DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-6 w-1/3" />
                    </div>
                ) : celebData ? (
                    <div className="rounded-lg border bg-white shadow-sm p-6 space-y-4 text-sm text-gray-700">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-semibold">Name:</span>
                                <span className="text-gray-600">{celebData.accountName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Bank Name:</span>
                                <span className="text-gray-600">{celebData.bank}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Account Number:</span>
                                <span className="text-gray-600">{celebData.accountNumber}</span>
                            </div>                           
                            <div className="flex justify-between">
                                <span className="font-semibold">Payment Amount:</span>
                                <span className="text-gray-600">₦{paymentAmount}</span>
                            </div>
                        </div>

                        <div className="pt-4 text-right">
                            <Button onClick={handleSaveChanges} size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                Click to confirm Payment
                            </Button>
                        </div>
                    </div>

                ) : (
                    <p className="text-sm text-muted-foreground">Client data not found.</p>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default PaymentDialog;
