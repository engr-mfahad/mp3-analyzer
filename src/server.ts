import app from "./app";
// Any aliased module imports should be placed after the `app` import because that's where we're registering those.
import env from "@utils/env";

app.listen(env.PORT, () =>
  console.info(`[app] server is running on port: ${env.PORT}`)
);
