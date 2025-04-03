"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  image: File | null;
  onImageChange: (newImage: File | null) => void;
}

export function ImageUpload({ image, onImageChange }: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validImages = acceptedFiles.filter((file) => file.type.startsWith("image/"));
      if (validImages.length !== acceptedFiles.length) {
        toast.error("File không hợp lệ. Chỉ chấp nhận hình ảnh!");
      }

      if (validImages.length > 0) {
        onImageChange(validImages[0]);
      }
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
  });

  const removeImage = () => {
    onImageChange(null);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer relative min-h-[200px] flex items-center justify-center"
      >
        <input {...getInputProps()} />
        {image ? (
          <div className="relative w-full h-full max-w-[1920px] max-h-[1080px]">
            <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full max-w-[1920px] max-h-[1080px] object-contain rounded-lg" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1"
              onClick={(e) => {
                e.stopPropagation(); // Ngăn sự kiện dropzone khi click nút X
                removeImage();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : isDragActive ? (
          <p>Thả file hình ảnh vào đây ...</p>
        ) : (
          <p>Kéo và thả file hình ảnh vào đây, hoặc click để chọn file</p>
        )}
      </div>
    </div>
  );
}
