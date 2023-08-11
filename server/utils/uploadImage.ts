import { v2 as cloudinary } from 'cloudinary';
import config from '../config/environment';

cloudinary.config({
  cloud_name: config.cloudinaryName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

const uploadImageToCloudinary = async (base64Image: string) => {
  try {
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
    );
    return result;
  } catch (error) {
    throw new Error("Failed to upload image to Cloudinary.");
  }
};

export default uploadImageToCloudinary;
