import { validasaur as v } from "../../deps.js";
import * as quizService from "../../services/quizService.js";
import { getOptionById } from "../../services/questionService.js";

const randomQuestion = async ({ response }) => {
  const question = await quizService.getRandomQuestion();
  response.body = question;
};

const checkAnswer = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const doc = await body.value;
  const rules = {
    questionId: [v.required, v.isNumeric],
    optionId: [v.required, v.isNumeric],
  };
  const [passes, errors] = await v.validate(doc, rules);
  if (passes) {
    const option = await getOptionById(doc.optionId);
    if (!option || option.question_id != questionId) {
      response.status = 400;
      return;
    }
    response.body = { correct: option.is_correct };
  } else {
    response.status = 400;
    response.body = errors;
  }
};
export { randomQuestion, checkAnswer };
