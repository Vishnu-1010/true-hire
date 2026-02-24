import fs from "fs";
import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (
  filePath,
  folder,
  resourceType = "image",
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: resourceType,
    });
    fs.unlinkSync(filePath); // delete local file after upload
    return result.secure_url;
  } catch (err) {
    fs.unlinkSync(filePath); // cleanup even if upload fails
    throw err;
  }
};
