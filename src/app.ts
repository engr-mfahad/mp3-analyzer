// Before importing any aliased modules we should import and register those otherwise `Cannot find module` will be thrown.
import modules from "./utils/module-alias.util";
import mp3Routes from "@routes/mp3";
import mp3Upload from "@utils/mp3-upload";
import express, { Express, json } from "express";

modules.register();

const app: Express = express();

app.use(json());

app.use(mp3Upload);

app.use("/", mp3Routes);

export default app;
