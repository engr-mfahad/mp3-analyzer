import { mp3FileFilter, uploadStorage } from "@configs/mp3-upload";
import multer from "multer";

const mp3Upload = multer({
  storage: uploadStorage,
  fileFilter: mp3FileFilter,
}).single("audio");

export default mp3Upload;
