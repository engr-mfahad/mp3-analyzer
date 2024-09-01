import schema from "@configs/env";
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object(schema);

const env = envSchema.parse(process.env);

export default env;
