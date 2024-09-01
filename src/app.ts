import express, { Express, json } from "express";
import mp3Routes from "./routes/mp3.route";

const app: Express = express();

app.use(json());

app.use("/", mp3Routes);

export default app;
