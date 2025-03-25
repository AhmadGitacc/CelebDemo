
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Upload, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  aspectRatio?: number;
  className?: string;
  maxSizeInMB?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onClear,
  aspectRatio = 1, // Default square
  className,
  maxSizeInMB = 5 // Default 5MB
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = (file: File) => {
    // Check file size
    if (file.size > maxSizeInMB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSizeInMB}MB`,
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    // In a real implementation, you would upload to a server/cloud storage
    // For this demo, we'll use FileReader to get a data URL
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result && onChange) {
        // Simulate a slight delay to show loading state
        setTimeout(() => {
          onChange(e.target!.result as string);
          setIsUploading(false);
          
          toast({
            title: "Image uploaded",
            description: "Your image has been successfully uploaded",
          });
        }, 1000);
      }
    };

    reader.onerror = () => {
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image",
        variant: "destructive"
      });
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange('');
    }
    
    // Reset the file input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg transition-colors",
          dragOver ? "border-accent bg-accent/5" : "border-border hover:border-muted-foreground/50",
          value ? "p-0 overflow-hidden" : "p-4"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {value ? (
          <div className="relative group">
            <AspectRatio ratio={aspectRatio}>
              <img 
                src={value} 
                alt="Uploaded image" 
                className="object-cover w-full h-full rounded-lg"
              />
            </AspectRatio>
            
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full"
                onClick={handleClear}
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center text-center gap-2 py-4 cursor-pointer"
            onClick={triggerFileInput}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                <div className="text-sm text-muted-foreground">Uploading...</div>
              </>
            ) : (
              <>
                <div className="p-2 rounded-full bg-accent/10 text-accent">
                  <ImageIcon className="h-8 w-8" />
                </div>
                <div className="text-sm font-medium">
                  Drag & drop an image or click to browse
                </div>
                <div className="text-xs text-muted-foreground">
                  PNG, JPG, GIF up to {maxSizeInMB}MB
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      <Input 
        ref={inputRef}
        type="file" 
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
