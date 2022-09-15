import {
  minLength,
  required,
  validate,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";
import * as questionService from "../../services/questionService.js";
import { showTopic } from "./topicController.js";
const addQuestion = async ({ render, request, params, response }) => {
  const topicId = params.id;
  const body = request.body();
  const bodyParams = await body.value;
  const question_text = bodyParams.get("question_text");
  const rules = {
    question_text: [required, minLength(1)],
  };
  const [passes, errors] = await validate({ question_text }, rules);
  if (passes) {
    await questionService.addQuestion(1, topicId, question_text);
    response.redirect(`/topics/${topicId}`);
  } else {
    const errorData = { errors, question_text };
    await showTopic({ params, render, errorData, response });
  }
};

export { addQuestion };
