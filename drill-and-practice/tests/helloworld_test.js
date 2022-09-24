import { assertEquals } from "https://deno.land/std@0.140.0/testing/asserts.ts";

const fun = () => {
  return "hello world";
};

Deno.test("Fun should return 'hello world'", () => {
  assertEquals(fun(), "hello world");
});
