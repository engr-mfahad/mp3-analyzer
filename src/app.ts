// Before importing any aliased modules we should import and register those otherwise `Cannot find module` will be thrown.
import modules from "./utils/module-alias.util";
import express, { Express, json } from "express";
import mp3Routes from "@routes/mp3";

modules.register();

const app: Express = express();

app.use(json());

app.use("/", mp3Routes);

export default app;
