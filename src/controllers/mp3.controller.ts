import { NextFunction, Request, Response } from "express";

export const countAudioFrames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.file);
  res.json({ frameCount: 0 });
};
