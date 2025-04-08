import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/lib/firebase"; // make sure both are exported from here
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import GlassCard from "@/components/ui-custom/GlassCard";
import { useToast } from "@/hooks/use-toast";

const CelebrityForm = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();


  const [fullName, setFullName] = useState("");
  const [stageName, setStageName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCelebrityData = async () => {
      if (!user) return;

      const docRef = doc(db, "celebrities", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFullName(data.name || "");
        setStageName(data.stageName || "");
        setCategory(data.category || "");
        setSubcategory(data.subcategory || "");
        setBio(data.bio || "");
        setLocation(data.location || "");
      }

      setLoading(false);
    };

    fetchCelebrityData();
  }, [user]);

  const handleSaveChanges = async () => {
    if (!user) return;

    const docRef = doc(db, "celebrities", user.uid);

    try {
      await updateDoc(docRef, {
        name: fullName,
        stageName,
        category,
        subcategory,
        bio,
        location,
      });

      toast({
        title: 'Profile Info Updated',
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="md:col-span-2 space-y-6">
      <GlassCard className="p-6">
        <h3 className="font-medium mb-4">Basic Information</h3>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="stage-name">Stage Name</Label>
              <Input id="stage-name" value={stageName} onChange={(e) => setStageName(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="category">Primary Category</Label>
              <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subcategory">Subcategory</Label>
              <Input id="subcategory" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <Button className="w-full sm:w-auto" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};

export default CelebrityForm;
