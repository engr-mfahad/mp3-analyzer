import { DestinationCallback, FilenameCallback } from "@definitions/multer";
import { ErrorCode } from "@enums/error-code";
import { MimeType } from "@enums/mime-type";
import env from "@utils/env";
import { Request } from "express";
import fs from "fs";
import multer, { FileFilterCallback, StorageEngine } from "multer";
import path from "path";

export const uploadStorage: StorageEngine = multer.diskStorage({
  destination(
    _req: Request,
    _file: Express.Multer.File,
    callback: DestinationCallback
  ) {
    const uploadDir = path.join(env.BASE_DIR, env.UPLOAD_DIR);
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    callback(null, env.UPLOAD_DIR);
  },
  filename(
    _req: Request,
    file: Express.Multer.File,
    callback: FilenameCallback
  ) {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

export const mp3FileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  if (file.mimetype !== MimeType.MP3Audio) {
    return callback(new Error(ErrorCode.UnrecognizableFormat));
  }
  callback(null, true);
};
