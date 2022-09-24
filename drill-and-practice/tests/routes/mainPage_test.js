import { superoak } from "../../deps.js";
import { app } from "../../app.js";

Deno.test({
  name: "get / shows the main page",
  async fn() {
    const client = await superoak(app);
    await client
      .get("/")
      .expect(200)
      .expect(new RegExp("Welcome to Drill and Practice!"));
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
