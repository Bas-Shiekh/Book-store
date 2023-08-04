import { v2 as cloudinary } from 'cloudinary';
import config from '../config/environment';

cloudinary.config({
  cloud_name: config.cloudinaryName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

const uploadImageToCloudinary = async (imagePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
  } catch (error) {
    throw new Error('Failed to upload image to Cloudinary.');
  }
};

export default uploadImageToCloudinary;
