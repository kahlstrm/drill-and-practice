import { Application, Session, oakCors, etag } from "./deps.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { serveStaticMiddleware } from "./middlewares/serveStaticMiddleware.js";
import { router } from "./routes/routes.js";

const app = new Application();
const session = new Session();
app.use(serveStaticMiddleware);
app.use(session.initMiddleware());
app.use(oakCors());
app.use(etag.factory());

app.use(errorMiddleware);
app.use(authMiddleware);
app.use(renderMiddleware);
app.use(router.routes());

export { app };
