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
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase"; // make sure functions is exported from your firebase config

interface RefundDialogProps {
    clientId: string;
    bookingId: string;
    refundAmount: number;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

interface ClientData {
    accountName: string;
    bank: string;
    accountNumber: string;
    email: string;
    phoneNumber: string;
    [key: string]: any;
}

const RefundDialog: React.FC<RefundDialogProps> = ({ clientId, bookingId, refundAmount, isOpen, onOpenChange }) => {
    const [clientData, setClientData] = useState<ClientData | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();


    useEffect(() => {
        if (!clientId || !isOpen) return;

        const fetchClient = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "users", clientId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setClientData(docSnap.data() as ClientData);
                } else {
                    setClientData(null);
                }
            } catch (error) {
                console.error("Error fetching client data:", error);
                setClientData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [clientId, isOpen]);

    const handleSaveChanges = async () => {
        if (!clientId || !refundAmount) return;

        const processRefund = httpsCallable(functions, "processRefund");

        try {
            // Call the cloud function
            const result = await processRefund({
                clientId,
                amount: refundAmount,
            });

            console.log("Refund result:", result);

            await updateDoc(doc(db, "bookings", bookingId), {
                status: "refunded",
            });

            toast({
                title: 'Refund Successful',
                className: "bg-green-100 border border-green-400 text-green-800",
            });

            onOpenChange(false); // close the dialog
        } catch (err: any) {
            console.error("Refund error:", err.message || err);
            toast({
                title: 'Refund Failed',
                description: err.message || "Could not process refund",
                variant: 'destructive'
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Client Account Information</DialogTitle>
                    <DialogDescription>Details about the client for refund reference.</DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-6 w-1/3" />
                    </div>
                ) : clientData ? (
                    <div className="rounded-lg border bg-white shadow-sm p-6 space-y-4 text-sm text-gray-700">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-semibold">Name:</span>
                                <span className="text-gray-600">{clientData.accountName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Bank Name:</span>
                                <span className="text-gray-600">{clientData.bank}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Account Number:</span>
                                <span className="text-gray-600">{clientData.accountNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Phone:</span>
                                <span className="text-gray-600">{clientData.phoneNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Email:</span>
                                <span className="text-gray-600">{clientData.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Refund Amount:</span>
                                <span className="text-gray-600">₦{refundAmount}</span>
                            </div>
                        </div>

                        <div className="pt-4 text-right">
                            <Button onClick={handleSaveChanges} size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                Click to confirm Refund
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

export default RefundDialog;
