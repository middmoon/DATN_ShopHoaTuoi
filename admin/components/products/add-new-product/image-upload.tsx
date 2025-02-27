"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import { toast } from "sonner";

interface ImageUploadProps {
  images: File[];
  onImagesChange: (newImages: File[]) => void;
  onAvatarChange: (index: number) => void;
  avatarIndex: number;
}

export function ImageUpload({ images, onImagesChange, onAvatarChange, avatarIndex }: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validImages = acceptedFiles.filter((file) => file.type.startsWith("image/"));
      if (validImages.length !== acceptedFiles.length) {
        toast.error("Một số file không hợp lệ. Chỉ chấp nhận hình ảnh!");
      }

      const newImages = [...images, ...validImages];
      onImagesChange(newImages);

      if (newImages.length === 1) {
        onAvatarChange(0);
      }
    },
    [images, onImagesChange, onAvatarChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // const removeImage = (index: number) => {
  //   const newImages = images.filter((_, i) => i !== index);
  //   onImagesChange(newImages);

  //   if (index === avatarIndex) {
  //     onAvatarChange(0);
  //   } else if (index < avatarIndex) {
  //     onAvatarChange(avatarIndex - 1);
  //   }
  // };

  // const removeImage = (index: number) => {
  //   const newImages = images.filter((_, i) => i !== index);
  //   onImagesChange(newImages);

  //   if (newImages.length === 0) {
  //     onAvatarChange(-1);
  //   } else if (index === avatarIndex) {
  //     onAvatarChange(0);
  //   } else if (index < avatarIndex) {
  //     onAvatarChange(avatarIndex - 1);
  //   }
  // };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);

    if (newImages.length === 0) {
      onAvatarChange(-1);
    } else if (newImages.length === 1) {
      onAvatarChange(0);
    } else if (index === avatarIndex) {
      onAvatarChange(0);
    } else if (index < avatarIndex) {
      onAvatarChange(avatarIndex - 1);
    }
  };

  return (
    <div className="space-y-4">
      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer">
        <input {...getInputProps()} />
        {isDragActive ? <p>Thả các file hình ảnh vào đây ...</p> : <p>Kéo và thả các file hình ảnh vào đây, hoặc click để chọn file</p>}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((file, index) => (
          <div key={index} className="relative">
            <img src={URL.createObjectURL(file) || "/placeholder.svg"} alt={`Preview ${index}`} className="w-full h-32 object-cover rounded-lg" />
            <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1" onClick={() => removeImage(index)}>
              <X className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={index === avatarIndex ? "default" : "outline"}
              size="sm"
              className="absolute bottom-1 left-1"
              onClick={() => onAvatarChange(index)}
            >
              {index === avatarIndex ? "Avatar" : "Set as Avatar"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
