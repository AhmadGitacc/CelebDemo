import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';
import { collection, addDoc } from 'firebase/firestore';
import { db } from "@/lib/firebase";

interface ImageUploadProps {
  celebId: string;
  onChange: (url: string, id: string) => void; // updated here
}

const ImgUpload: React.FC<ImageUploadProps> = ({ celebId, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'yaza_upload');
    formData.append('cloud_name', 'ddzy2ozek');

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/ddzy2ozek/image/upload", {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.secure_url) {
        throw new Error("Upload failed");
      }

      const docRef = await addDoc(collection(db, "celebrities", celebId, "gallery"), {
        url: data.secure_url,    
      });
      
      onChange(data.secure_url, docRef.id);
      
      toast({
        title: "Image uploaded successfully",
        className: "bg-green-100 border border-green-400 text-green-800",
      });
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: "Image Upload Failed",
        description: "There was a problem uploading the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='flex flex-col md:w-fit'>
      <Label htmlFor='image-upload' className='cursor-pointer text-black rounded-lg py-2 px-4 text-sm hover:bg-gray-200 transition flex items-center space-x-2 border border-gray-300'>
        {isUploading ? 'Uploading...' : 'Upload Image'}
      </Label>

      <input
        id='image-upload'
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isUploading}
        className="hidden"
      />
    </div>
  );
};

export default ImgUpload;
