import { APIResponse } from "@definitions/api";
import { ErrorCode } from "@enums/error-code";
import { HttpStatus } from "@enums/http-status";
import mp3Parser from "@utils/mp3-parser";
import { NextFunction, Request, Response } from "express";
import * as fs from "fs";

const _postreqs = (path: string, callback: CallableFunction) => {
  fs.unlink(path, (err: NodeJS.ErrnoException | null) => {
    if (err) console.error(`Failed to delete file which is caused by: ${err}`);
    callback();
  });
};

export const countAudioFrames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file?.path) throw new Error(ErrorCode.NoFileUploaded);
  const data: APIResponse = {
    frameCount: 0,
  };
  try {
    data.frameCount = mp3Parser.countFrames(req.file.path);
  } catch (error) {
    return await _postreqs(req.file.path, () => {
      next(error);
    });
  }
  if (!process.env.SAVE_UPLOADS)
    return await _postreqs(req.file.path, () =>
      res.status(HttpStatus.OK).json(data)
    );
  else res.status(HttpStatus.OK).json(data);
};
