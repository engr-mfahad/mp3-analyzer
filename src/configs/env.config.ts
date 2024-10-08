import path from "path";
import { ZodRawShape, z } from "zod";

const schema: ZodRawShape = {
  PORT: z
    .string()
    .regex(/^\d+$/, "PORT must be a number.")
    .transform(Number)
    .default("7000"),
  UPLOAD_DIR: z.string().default("media"),
  SAVE_UPLOADS: z
    .string()
    .transform((val) => val.toLowerCase() === "true")
    .default("false"),
  BASE_DIR: z
    .string()
    .transform(() => path.join(__dirname, "..", ".."))
    .default(""),
};

export default schema;
