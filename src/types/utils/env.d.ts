import { z } from "zod";

export interface Env {
  PORT: z.ZodDefault<z.ZodEffects<z.ZodString, number, string>>;
  UPLOAD_DIR: z.ZodDefault<z.ZodString>;
  SAVE_UPLOADS: z.ZodDefault<z.ZodEffects<z.ZodString, boolean, string>>;
}
