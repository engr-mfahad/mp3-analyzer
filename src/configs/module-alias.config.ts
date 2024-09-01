import path from "path";

const moduleAliases = {
  "@configs/env": `${path.join(__dirname, "env.config")}`,

  "@controllers/mp3": `${path.join(
    __dirname,
    "..",
    "controllers",
    "mp3.controller"
  )}`,

  "@definitions/env": `${path.join(
    __dirname,
    "..",
    "types",
    "utils",
    "env.d"
  )}`,

  "@routes/mp3": `${path.join(__dirname, "..", "routes", "mp3.route")}`,

  "@utils/env": `${path.join(__dirname, "..", "utils", "env.util")}`,
};

export default moduleAliases;
