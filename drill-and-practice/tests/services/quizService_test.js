import { assert } from "https://deno.land/std@0.140.0/testing/asserts.ts";
import * as quizService from "../../services/quizService.js";

Deno.test({
  name: "getStatistics should show current stats for the site",
  async fn() {
    const stats = await quizService.getStatistics();
    assert(Object.hasOwn(stats, "topic_count"));
    assert(Object.hasOwn(stats, "question_count"));
    assert(Object.hasOwn(stats, "correct_count"));
    assert(Object.hasOwn(stats, "incorrect_count"));
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
