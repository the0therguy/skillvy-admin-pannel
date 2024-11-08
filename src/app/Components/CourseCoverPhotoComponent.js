"use client"
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {ImagePlus, X, Loader2} from "lucide-react";
import baseURL from "@/app/Components/BaseURL";
import {useToast} from "@/hooks/use-toast";

// Form schema using Zod
const formSchema = z.object({
  image: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      {
        message: "Only .jpg, .jpeg, .png and .gif formats are supported",
      }
    )
    .optional(),
});

const CourseCoverPhotoComponent = ({courseAdd, courseUuid}) => {
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast()


  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    debugger
    try {
      setIsLoading(true);
      const fileInput = document.getElementById("image-upload");
      console.log(data)

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("image", data.image);

      // Setup request options
      const requestOptions = {
        method: "PUT",
        body: formData,
        redirect: "follow",
      };

      // Send the request
      const response = await fetch(`${baseURL}course-image-update/${courseUuid}/`, requestOptions);
      const result = await response.json(); // Parse the response as JSON
      if (response.ok) {
        toast({description: "Image added successfully"})
        setPreview(null);
        reset()
      } else {
        console.log(result)
        toast({description: result.details, variant: "destructive"})
      }

    } catch (error) {
      // Error handling
      toast({description: error.message, variant: "destructive"});
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Set form value
    setValue("image", file, {shouldValidate: true});

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    setPreview(null);
    setValue("image", undefined, {shouldValidate: true});
    reset({image: undefined});
  };

  return (
    <>
      {
        courseAdd ? (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="image-upload"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Image
              </Label>

              <div className="relative">
                <label
                  htmlFor="image-upload"
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer",
                    "hover:bg-gray-50 transition-colors",
                    isLoading && "opacity-50 cursor-not-allowed",
                    errors.image ? "border-red-500" : "border-gray-300"
                  )}
                >
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center">
                      <Loader2 className="w-8 h-8 text-gray-400 animate-spin"/>
                      <p className="mt-2 text-sm text-gray-500">Uploading...</p>
                    </div>
                  ) : preview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={preview}
                        alt="Preview"
                        className="object-cover w-full h-full rounded-lg"
                      />
                      <button
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <X className="w-4 h-4 text-gray-500"/>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <ImagePlus className="w-8 h-8 text-gray-400"/>
                      <p className="mt-2 text-sm text-gray-500">
                        Click or drag image to upload
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Max file size: 5MB
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Supported formats: JPG, PNG, GIF
                      </p>
                    </div>
                  )}

                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    disabled={isLoading}
                    {...register("image")}
                    onChange={(e) => {
                      register("image").onChange(e);
                      handleFileChange(e);
                    }}
                  />
                </label>

                {errors.image && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.image.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !preview}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                  Uploading...
                </>
              ) : (
                "Upload Image"
              )}
            </Button>
          </form>
        ) : null
      }
    </>
  );
};

export default CourseCoverPhotoComponent;