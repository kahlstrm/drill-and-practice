import { superoak } from "../../deps.js";
import { app } from "../../app.js";

Deno.test({
  name: "get /topics redirects to login page if not auth'd",
  async fn() {
    const client = await superoak(app);
    await client.get("/topics").expect(302).expect("location", "/auth/login");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "get /quiz redirects to login page if not auth'd",
  async fn() {
    const client = await superoak(app);
    await client.get("/quiz").expect(302).expect("location", "/auth/login");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
