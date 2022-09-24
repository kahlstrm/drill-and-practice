import { superoak } from "../../deps.js";
import { app } from "../../app.js";

Deno.test({
  name: "get /auth/login the login page",
  async fn() {
    const client = await superoak(app);
    await client
      .get("/auth/login")
      .expect(200)
      .expect(new RegExp("Guest Login"));
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Logging in successfully redirects to /topics",
  async fn() {
    const client = await superoak(app);
    await client
      .post("/auth/login")
      .set("Content-type", "application/x-www-form-urlencoded")
      .send("email=admin@admin.com&password=123456")
      .expect(302)
      .expect("location", "/topics");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
