import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GlassCard from "@/components/ui-custom/GlassCard";
import { useToast } from "@/hooks/use-toast";

const ClientProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bank, setBank] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || "");
        setPhoneNumber(data.phoneNumber || "");
        setAccountNumber(data.accountNumber || "");
        setAccountName(data.accountName || "");
        setBank(data.bank || "");
      }

      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  const handleSaveChanges = async () => {
    if (!user) return;

    if (!name || !phoneNumber || !accountName || !accountNumber || !bank) {
      toast({
        title: 'Please fill in all the fields.',
        variant: 'destructive',
      });
      return;
    }

    const docRef = doc(db, "users", user.uid);

    try {
      await updateDoc(docRef, {
        name: name,
        accountName: accountName,
        accountNumber: accountNumber,
        phoneNumber: phoneNumber,
        bank: bank,
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
        <h3 className="font-medium mb-4">User Information</h3>
        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <h3 className="font-medium mt-4">Account Information <span className="text-muted-foreground text-sm">(In the case of refunds)</span></h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Account Number</Label>
              <Input type="number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="name">Account Name</Label>
              <Input value={accountName} onChange={(e) => setAccountName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="name">Bank Name</Label>
              <Input value={bank} onChange={(e) => setBank(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="name">Phone Number</Label>
              <Input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
          </div>

          <Button className="w-full sm:w-auto" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};

export default ClientProfile;
