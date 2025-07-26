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
import { Instagram, Twitter, Youtube } from "lucide-react";

const CelebrityForm = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [stageName, setStageName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [bio, setBio] = useState("");
  const [venue, setVenue] = useState("");
  const [equipment, setEquipment] = useState("");
  const [location, setLocation] = useState("");
  const [languages, setLanguages] = useState("");
  const [insta, setInsta] = useState("");
  const [youtube, setYoutube] = useState("");
  const [x, setX] = useState("");
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
        setVenue(data.venue || "");
        setEquipment(data.equipment || "");
        setLocation(data.location || "");
        setLanguages(data.languages || "");
        setInsta(data.insta || "");
        setX(data.x || "");
        setYoutube(data.youtube || "");
        setAccountName(data.accountName || "");
        setAccountNumber(data.accountNumber || "");
        setBank(data.bank || "");
        setBankCode(data.bankCode || "");
      }

      setLoading(false);
    };

    fetchCelebrityData();
  }, [user]);

  const handleSaveChanges = async () => {
    if (!user) return;

    // Validate that all required fields are filled
    if (!fullName || !stageName || !category || !subcategory || !bio || !venue || !equipment || !location || !languages || !insta || !x || !youtube || !accountName || !accountNumber || !bank) {
      toast({
        title: 'Please fill in all the fields.',
        variant: 'destructive',
      });
      return;
    }

    const docRef = doc(db, "celebrities", user.uid);

    try {
      await updateDoc(docRef, {
        name: fullName,
        stageName,
        category,
        subcategory,
        bio,
        venue,
        equipment,
        location,
        languages,
        x,
        insta,
        youtube,
        accountName,
        accountNumber,
        bank,
        bankCode
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
              <Input required id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="stage-name">Stage Name</Label>
              <Input required id="stage-name" value={stageName} onChange={(e) => setStageName(e.target.value)} />
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
              required
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="category">Spoken Languages</Label>
              <Input required placeholder="e.g English, Yoruba ..." id="category" value={languages} onChange={(e) => setLanguages(e.target.value)} />
            </div>
          </div>

          <div className="">
            <Label>Socials</Label>
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center">
                <Instagram className="h-5 w-5 text-pink-500 mr-3" />
                <Input required placeholder="Instagram" value={insta} onChange={(e) => setInsta(e.target.value)} />
              </div>
              <div className="flex items-center">
                <Twitter className="h-5 w-5 text-blue-500 mr-3" />
                <Input required placeholder="X" value={x} onChange={(e) => setX(e.target.value)} />
              </div>
              <div className="flex items-center">
                <Youtube className="h-5 w-5 text-red-500 mr-3" />
                <Input required placeholder="Youtube" value={youtube} onChange={(e) => setYoutube(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="location">Location</Label>
            <Input required id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>


          <div className="space-y-1.5">
            <Label htmlFor="bio">Equipment Requirements</Label>
            <Textarea
              placeholder="List out all the required equipments that should be made available by the client"
              id="bio"
              rows={4}
              required
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bio">Venue Requirements</Label>
            <Textarea
              placeholder="Mention your expectations of the venue to be made available by the client"
              id="bio"
              rows={4}
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>

          <h3 className="font-medium mt-4">Account Information <span className="text-muted-foreground text-sm">(For payments)</span></h3>
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
