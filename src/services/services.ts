import { v2 as cloudinary } from "cloudinary";
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.CLOUD_API_KEY;
const api_secret = process.env.CLOUD_API_SECRET;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});
export const uploadFiles = (file, options, cb) =>
  cloudinary.uploader.upload(file, options, cb);

export const dataUri = (file) => parser.format("jpeg", file.buffer);
