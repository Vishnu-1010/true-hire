import fs from "fs/promises";
import path from "path";
import imagekit from "../config/imagekit.js";

const uploadToImageKit = async (filePath, folder = "/uploads/temp") => {
  if (!filePath) throw new Error("File path is required");

  try {
    const fileBuffer = await fs.readFile(filePath);
    const fileName = path.basename(filePath); // <-- now works

    const result = await imagekit.upload({
      file: fileBuffer,
      fileName,
      folder,
      useUniqueFileName: true,
    });
await fs.unlink(filePath);
    return result.url;
  } catch (err) {
    await fs.unlink(filePath);
    console.error("ImageKit upload failed:", err.message);
    throw err;
  } finally {
    // Always try to delete local temp file
    try {
      await fs.unlink(filePath);
      console.log("Temp file deleted:", filePath);
    } catch (cleanupErr) {
      if (cleanupErr.code !== "ENOENT") {
        console.error("Failed to delete temp file:", cleanupErr.message);
      }
    }
  }
};

export default uploadToImageKit;
