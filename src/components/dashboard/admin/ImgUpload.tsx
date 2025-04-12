
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
}

const ImgUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
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

            onChange(data.secure_url);
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
            <input
                id='image-upload'
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="cursor-pointer bg-black w-fi text-white rounded-lg py-2 px-4 text-sm hover:bg-gray-600 transition flex items-center space-x-2"
            />
            {isUploading && <p>Uploading...</p>}
            {value && <img src={value} alt="Uploaded preview" className="mt-2 h-80" />}
        </div>
    );
};

export default ImgUpload;
