import configs from "@configs/env";
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object(configs);

const env = envSchema.parse(process.env);

export default env;
