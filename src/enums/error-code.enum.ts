export enum ErrorCode {
  NoFileUploaded = "NO_FILE_UPLOADED",
  UnrecognizableFormat = "UNRECOGNIZABLE_FORMAT",
  VersionMismatch = "VERSION_MISMATCH",
  LayerMismatch = "LAYER_MISMATCH",
  InternalServerError = "INTERNAL_SERVER_ERROR",
}

export const ErrorMessage: Record<ErrorCode, string> = {
  [ErrorCode.NoFileUploaded]:
    "The uploaded file must be sent via the form-field whose name should be `audio`.",
  [ErrorCode.UnrecognizableFormat]:
    "The uploaded file isn't identifiable as an audio MPEG. Also, make sure to set the MimeType as `audio/mpeg`.",
  [ErrorCode.VersionMismatch]:
    "The uploaded file must be an audio MPEG of version 1.",
  [ErrorCode.LayerMismatch]:
    "The uploaded file must be an audio MPEG of layer 3.",
  [ErrorCode.InternalServerError]: "An unexpected error occurred.",
};
