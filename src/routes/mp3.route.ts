import { Router } from "express";
import { countAudioFrames } from "../controllers/mp3.controller";

const router: Router = Router();

router.post("/file-upload", countAudioFrames);

export default router;
