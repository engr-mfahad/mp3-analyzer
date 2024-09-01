export interface DestinationCallback {
  error: Error | null;
  destination: string;
}

export interface FilenameCallback {
  error: Error | null;
  filename: string;
}
