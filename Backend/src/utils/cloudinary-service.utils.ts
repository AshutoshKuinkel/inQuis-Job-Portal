import cloudinary from "../config/cloudinary.config";
import CustomError from "../middlewares/error-handler.middleware";
import fs from "fs";

export const uploadFile = async (path: string, dir = "/") => {
  try {
    const { public_id, secure_url } = await cloudinary.uploader.upload(path, {
      unique_filename: true,
      folder: "inQuis-Job-Portal" + dir,
    });

    //delete image from uploads
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }

    console.log({ public_id, secure_url });

    return {
      public_id,
      path: secure_url,
    };
  } catch (err) {
    console.error("Cloudinary upload error", err);
    throw new CustomError(`Error uploading file.`, 500);
  }
};