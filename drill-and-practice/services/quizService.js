import { executeQuery } from "../database/database.js";
import { getOptionsById } from "./questionService.js";
const getRandomQuestion = async (topic_id) => {
  let res;
  if (topic_id) {
    res = await executeQuery(
      "SELECT q.* from (questions WHERE topic_id=$topic_id) as q join question_answer_options as qa ON q.id=qa.question_id ORDER BY random() LIMIT 1",
      { topic_id }
    );
  } else {
    res = await executeQuery(
      "SELECT q.* from questions as q join question_answer_options as qa ON q.id=qa.question_id ORDER BY random() LIMIT 1"
    );
  }
  const question = res.rows[0];
  if (!question) {
    return {};
  }
  const options = await getOptionsById(question.id);
  return {
    questionId: question.id,
    questionText: question.question_text.trim(),
    answerOptions: options.map((option) => ({
      optionId: option.id,
      optionText: option.option_text.trim(),
    })),
  };
};

export { getRandomQuestion };
