import { superoak } from "../../deps.js";
import { app } from "../../app.js";

Deno.test({
  name: "Registering with a non-email address shouldn't work",
  async fn() {
    const client = await superoak(app);
    await client
      .post("/auth/register")
      .set("Content-type", "application/x-www-form-urlencoded")
      .send("email=thisisnotanemail&password=123456")
      .expect(200)
      .expect(new RegExp("email is not a valid email address"));
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
