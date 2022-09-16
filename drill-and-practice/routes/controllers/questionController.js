import {
  minLength,
  required,
  validate,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";
import * as questionService from "../../services/questionService.js";
import { showTopic } from "./topicController.js";

const showQuestion = async ({ params, response, render, errorData }) => {
  const question = await questionService.getQuestionById(params.qId);
  if (question.topic_id != params.id) {
    response.status = 404;
    return;
  }
  const options = await questionService.getOptionsById(params.qId);
  render("question.eta", { question, options, errorData });
};

const addQuestion = async ({ render, request, params, response, user }) => {
  const topicId = params.id;
  const body = request.body();
  const bodyParams = await body.value;
  const question_text = bodyParams.get("question_text");
  const rules = {
    question_text: [required, minLength(1)],
  };
  const [passes, errors] = await validate({ question_text }, rules);
  if (passes) {
    await questionService.addQuestion(user.id, topicId, question_text);
    response.redirect(`/topics/${topicId}`);
  } else {
    const errorData = { errors, question_text };
    await showTopic({ params, render, errorData, response });
  }
};

const addOption = async ({ params, request, response, render }) => {
  const body = request.body();
  const bodyParams = await body.value;
  const option_text = bodyParams.get("option_text");
  const is_correct = bodyParams.has("is_correct");
  const rules = {
    option_text: [required, minLength(1)],
  };
  const [passes, errors] = await validate({ option_text }, rules);
  if (passes) {
    await questionService.addOption(params.qId, option_text, is_correct);
    response.redirect(`/topics/${params.id}/questions/${params.qId}`);
  } else {
    const errorData = { errors, option_text, is_correct };
    await showQuestion({ params, render, errorData, response });
  }
};

export { addQuestion, showQuestion, addOption };
