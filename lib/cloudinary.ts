import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary - it will automatically parse CLOUDINARY_URL if provided
// or use individual components
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
  // Fallback to individual components if needed
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dwbhyqykj",
  api_key: process.env.CLOUDINARY_API_KEY || "326174176873516",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "YoxP9RoRWZXR05_uFNSCdddJn18",
});

export default cloudinary;

export const uploadImage = async (
  file: Buffer,
  folder: string = "tshirt-products"
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "auto",
          transformation: [
            { width: 800, height: 800, crop: "limit" },
            { quality: "auto" },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
      .end(file);
  });
};

export const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting image from cloudinary:", error);
    throw error;
  }
};
