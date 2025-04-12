import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Star, CheckCircle } from "lucide-react";

interface CelebrityData {
    name: string;
    category: string;
    subcategory: string;
    avatar?: string;
    profileImage: string;
    rating?: number;
    reviews?: number;
}

const CelebrityProfileCard = ({ celebId }: { celebId: string }) => {
    const [celebData, setCelebData] = useState<CelebrityData | null>(null);

    useEffect(() => {
        if (!celebId) return;

        const docRef = doc(db, "celebrities", celebId);

        // Listen for real-time updates
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setCelebData(docSnap.data() as CelebrityData);
            } else {
                setCelebData(null); 
            }
        });

        return () => unsubscribe(); // Clean up listener on unmount
    }, [celebId]);


    if (!celebData) return <p>Loading Profile...</p>;

    return (
        <div className="flex flex-col items-center text-center">
            <div className="relative inline-block mb-4">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={celebData.profileImage || "fallback_url"} />
                    <AvatarFallback>{celebData.name?.[0]}</AvatarFallback>
                </Avatar>
                {/* <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background"
                >
                    <Edit className="h-4 w-4" />
                </Button> */}
            </div>

            <h2 className="text-xl font-bold">{celebData.name}</h2>
            <p className="text-muted-foreground mb-4">{celebData.category} | {celebData.subcategory}</p>

            <Badge variant="outline" className="mb-4">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified Celebrity
            </Badge>
        </div>
    );
};

export default CelebrityProfileCard;
