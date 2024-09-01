import { ErrorResponse } from "@definitions/api";
import { ErrorCode, ErrorMessage } from "@enums/error-code";
import { HttpStatus } from "@enums/http-status";
import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";

const errorParser = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.file &&
    err &&
    err instanceof MulterError &&
    err.code === "LIMIT_UNEXPECTED_FILE"
  )
    err = new Error(ErrorCode.NoFileUploaded);
  if (err) {
    console.error(err);
    const errorResponse: ErrorResponse = {
      code: "",
      message: "",
    };
    let httpStatus: HttpStatus = HttpStatus.UnsupportedMediaType;
    switch (err.message) {
      case ErrorCode.NoFileUploaded:
        httpStatus = HttpStatus.BadRequest;
        errorResponse.code = ErrorCode.NoFileUploaded;
        errorResponse.message = ErrorMessage.NO_FILE_UPLOADED;
        break;
      case ErrorCode.UnrecognizableFormat:
        errorResponse.code = ErrorCode.UnrecognizableFormat;
        errorResponse.message = ErrorMessage.UNRECOGNIZABLE_FORMAT;
        break;
      case ErrorCode.VersionMismatch:
        errorResponse.code = ErrorCode.VersionMismatch;
        errorResponse.message = ErrorMessage.VERSION_MISMATCH;
        break;
      case ErrorCode.LayerMismatch:
        errorResponse.code = ErrorCode.LayerMismatch;
        errorResponse.message = ErrorMessage.LAYER_MISMATCH;
        break;

      default:
        httpStatus = HttpStatus.InternalServerError;
        errorResponse.code = ErrorCode.InternalServerError;
        errorResponse.message = ErrorMessage.INTERNAL_SERVER_ERROR;
        break;
    }
    return res.status(httpStatus).json({ error: errorResponse });
  }
  next();
};

export default errorParser;
