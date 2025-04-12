import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, ImageIcon } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import ImageUpload from './ImgUpload';
import ImgUpload from './ImgUpload';

const AdminCelebrityUpload: React.FC = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: '',
    category: 'music',
    bio: '',
    profileImage: '',
    coverImage: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setProfileData((prev) => ({ ...prev, category: value }));
  };

  const handleImageChange = (type: 'profileImage' | 'coverImage', value: string) => {
    setProfileData((prev) => ({ ...prev, [type]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Validation
    if (!profileData.name || !profileData.email || !profileData.password || !profileData.bio) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      setSubmitting(false);
      return;
    }

    try {
      // 1. Create user in Firebase Authentication (using email and password)
      const userCredential = await createUserWithEmailAndPassword(auth, profileData.email, profileData.password);

      // 2. Set the profile information (name, etc.)
      await updateProfile(userCredential.user, {
        displayName: profileData.name,
      });

      // Step 1: Create the user document in the 'users' collection with minimal data
      const userDocRef = await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: profileData.name,
        email: profileData.email, 
        role: 'celebrity', 
        avatar: profileData.profileImage, 
        createdAt: new Date().toISOString() 
      });

      // 3. Create a Firestore document for the celebrity profile
      const newCelebrity = {
        name: profileData.name,
        category: profileData.category,
        bio: profileData.bio,
        profileImage: profileData.profileImage, // You can add default until image upload is available
        coverImage: profileData.coverImage, // You can add default until image upload is available
        userId: userCredential.user.uid, 
      };

      await setDoc(doc(db, 'celebrities', userCredential.user.uid), newCelebrity);  // Add the document to Firestore

      setSubmitting(false);
      setSuccess(true);
      toast({
        title: 'Celebrity Profile Created',
        description: `Successfully created profile for ${profileData.name}.`,
      });

      // Reset form after success
      setTimeout(() => {
        setSuccess(false);
        setProfileData({
          name: '',
          category: 'music',
          email: '',
          password: '',
          bio: '',
          profileImage: '',
          coverImage: '',
        });
      }, 2000);
    } catch (error) {
      console.error('Error creating celebrity account:', error);
      setSubmitting(false);
      toast({
        title: 'Error',
        description: 'There was an error creating the celebrity account. Please try again.',
        variant: 'destructive',
      });
    }
  };


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New Celebrity</CardTitle>
        <CardDescription>
          Create a new celebrity profile for clients to book.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Profile Created!</h3>
            <p className="text-muted-foreground">
              The celebrity profile has been successfully created and is now available for booking.
            </p>
          </div>
        ) : (
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Celebrity Name*</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Celebrity Email*</Label>
                  <Input
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Celebrity Password*</Label>
                  <Input
                    id="password"
                    name="password"
                    value={profileData.password}
                    onChange={handleChange}
                    placeholder="******** (8 characters min)"
                    required
                    type="password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category*</Label>
                  <Select
                    value={profileData.category}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="acting">Acting</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="comedy">Comedy</SelectItem>
                      <SelectItem value="influencer">Influencer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biography*</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  rows={5}
                  value={profileData.bio}
                  onChange={handleChange}
                  placeholder="Write a detailed bio..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Profile Image*</Label>
                <ImgUpload
                  value={profileData.profileImage}
                  onChange={(url) => handleImageChange('profileImage', url)}
                />
              </div>

              <div className="space-y-2">
                <Label>Cover Image* </Label>
                <ImgUpload
                  value={profileData.coverImage}
                  onChange={(url) => handleImageChange('coverImage', url)}
                />
              </div>
            </div>
          </form>
        )}
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          disabled={submitting}
          onClick={handleSubmit}
          className="w-full"
        >
          {submitting ? 'Saving...' : 'Create Profile'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminCelebrityUpload;
