import Fastify from "fastify";
import { connectDB } from "./src/config/db.js";
import { adminJs, buildAdminjsRouter } from "./src/config/setup.js";
import registerRoutes from "./src/routes/index.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import registerSocketIO from "./src/config/sockets.js";
const app = Fastify({ logger: true });

app.setErrorHandler(errorHandler);

const start = async () => {
  try {
    await buildAdminjsRouter(app);
    await connectDB();
    await registerRoutes(app);
    await registerSocketIO(app);
    const PORT = process.env.PORT || 3000;
    await app.listen({ port: PORT, host: "0.0.0.0" });

    app.log.info(`server listening on ${PORT}${adminJs.options.rootPath}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
