import { NextFunction, Request, Response } from "express";

export const countAudioFrames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ frameCount: 0 });
};
