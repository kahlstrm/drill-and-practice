import { superoak } from "../../deps.js";
import { app } from "../../app.js";

Deno.test({
  name: "get request should create sessions",
  async fn() {
    const client = await superoak(app);
    await client
      .get("/")
      .expect(200)
      .expect("set-cookie", new RegExp("session="));
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
