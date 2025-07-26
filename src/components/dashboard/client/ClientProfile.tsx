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
  const [bankCode, setBankCode] = useState(''); // Store the selected bank's bank code
  
  // Bank options with their codes
  const bankOptions = [
    { name: 'Access Bank', code: '058' },
    { name: 'Citibank Nigeria', code: '023' },
    { name: 'Diamond Bank', code: '063' },
    { name: 'Zenith Bank', code: '057' },
    { name: 'EcoBank', code: '050' },
    { name: 'Fidelity Bank', code: '070' },
    { name: 'United Bank for Africa', code: '033' },
    { name: 'Wema Bank', code: '035' },
    { name: 'First Bank', code: '011' },
    { name: 'Guaranty Trust Bank', code: '058' },
    { name: 'Heritage Bank', code: '030' },
    { name: 'Jaiz Bank', code: '301' },
    { name: 'Keystone Bank', code: '082' },
    { name: 'Lapo Microfinance Bank', code: '700' },
    { name: 'Lockton Insurance Nigeria', code: '999' },
    { name: 'Mainstreet Bank', code: '064' },
    { name: 'Mobil Oil Nigeria', code: '088' },
    { name: 'Polaris Bank', code: '076' },
    { name: 'Standard Chartered Bank', code: '068' },
    { name: 'Sterling Bank', code: '232' },
    { name: 'Union Bank', code: '032' },
  ];

  // Handle bank selection change
  const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBank = e.target.value;
    setBank(selectedBank);
    // Set the bank code based on the selected bank
    const selectedBankOption = bankOptions.find(option => option.name === selectedBank);
    setBankCode(selectedBankOption ? selectedBankOption.code : '');
  };

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
        setBankCode(data.bankCode || "");
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
        bankCode: bankCode, 
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
              <Label htmlFor="bank">Bank Name</Label>
              <select
                value={bank}
                onChange={handleBankChange}
                className="w-full p-2 border rounded"
              >
                <option value="">{bank || 'Select Bank'}</option>
                {bankOptions.map((option) => (
                  <option key={option.code} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>

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
