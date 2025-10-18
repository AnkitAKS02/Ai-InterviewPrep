import cloudinary from "../lib/cloudinary.js";
import { PdfConverter } from  "pdf-poppler";
import fs from "fs-extra";
import path from "path";

/**
 * Converts a PDF file to images and uploads them to Cloudinary.
 * @param {string} pdfPath - Local path of the PDF file
 * @returns {Promise<string[]>} - Array of Cloudinary URLs
 */
export const convertPdfToImages = async (pdfPath) => {
  const outputDir = path.join("uploads", `${Date.now()}`);
  await fs.mkdir(outputDir);

  // Convert PDF to images
  const options = {
    format: "png",
    out_dir: outputDir,
    out_prefix: path.basename(pdfPath, path.extname(pdfPath)),
    page: null, // convert all pages
  };

  await PdfConverter.convert(pdfPath, options);

  // Upload all images to Cloudinary
  const files = await fs.readdir(outputDir);
  const uploadedUrls = [];

  for (const fileName of files) {
    const filePath = path.join(outputDir, fileName);
    const uploadRes = await cloudinary.v2.uploader.upload(filePath, {
      folder: "pdf_images",
    });
    uploadedUrls.push(uploadRes.secure_url);
  }

  // Clean up local files
  await fs.remove(outputDir);
  await fs.remove(pdfPath);

  return uploadedUrls;
};
