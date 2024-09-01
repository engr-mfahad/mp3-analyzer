import path from "path";

const moduleAliases = {
  "@configs/env": `${path.join(__dirname, "env.config")}`,
  "@configs/mp3-upload": `${path.join(__dirname, "mp3-upload.config")}`,

  "@controllers/mp3": `${path.join(
    __dirname,
    "..",
    "controllers",
    "mp3.controller"
  )}`,

  "@definitions/api": `${path.join(__dirname, "..", "types", "api", "api.d")}`,
  "@definitions/multer": `${path.join(
    __dirname,
    "..",
    "types",
    "multer",
    "disk-storage.d"
  )}`,
  "@definitions/env": `${path.join(
    __dirname,
    "..",
    "types",
    "utils",
    "env.d"
  )}`,

  "@enums/error-code": `${path.join(
    __dirname,
    "..",
    "enums",
    "error-code.enum"
  )}`,
  "@enums/http-status": `${path.join(
    __dirname,
    "..",
    "enums",
    "http-status.enum"
  )}`,
  "@enums/mime-type": `${path.join(
    __dirname,
    "..",
    "enums",
    "mime-type.enum"
  )}`,

  "@middlewares/error": `${path.join(
    __dirname,
    "..",
    "middlewares",
    "error.middleware"
  )}`,

  "@routes/mp3": `${path.join(__dirname, "..", "routes", "mp3.route")}`,

  "@utils/env": `${path.join(__dirname, "..", "utils", "env.util")}`,
  "@utils/mp3-parser": `${path.join(
    __dirname,
    "..",
    "utils",
    "mp3-parser.util"
  )}`,
  "@utils/mp3-upload": `${path.join(
    __dirname,
    "..",
    "utils",
    "mp3-upload.util"
  )}`,
};

export default moduleAliases;
