import { superoak } from "../../deps.js";
import { app } from "../../app.js";

Deno.test({
  name: "GET to / should return a JSON",
  async fn() {
    const client = await superoak(app);
    await client
      .get("/api/questions/random")
      .expect(200)
      .expect("Content-Type", new RegExp("application/json"));
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
