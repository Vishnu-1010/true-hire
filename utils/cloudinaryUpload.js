import fs from "fs/promises";
import cloudinary from "../config/cloudinary.js";

 const uploadToCloudinary = async (  filePath,folder = "uploads/temp",resourceType = "auto") => {
  if (!filePath) {
    throw new Error("File path is required");
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: resourceType,
      allowed_formats: ["jpg", "png", "pdf"],
    });

    return result.secure_url;
  } catch (err) {
    throw err; // preserve original error
  } finally {
    
    try {
      await fs.unlink(filePath);
    } catch (cleanupError) {
      console.error("File cleanup failed:", cleanupError.message);
    }
  }
};

export default uploadToCloudinary;
