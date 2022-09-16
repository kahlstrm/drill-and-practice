import { executeQuery } from "../database/database.js";
import { getOptionsById, getQuestionById } from "./questionService.js";
const getRandomQuestionId = async (topic_id) => {
  let res;
  if (topic_id) {
    res = await executeQuery(
      "SELECT q.id from (SELECT * from questions WHERE topic_id=$topic_id) as q left join question_answer_options as qa ON q.id=qa.question_id ORDER BY random() LIMIT 1",
      { topic_id }
    );
  } else {
    res = await executeQuery(
      "SELECT q.id from questions as q left join question_answer_options as qa ON q.id=qa.question_id ORDER BY random() LIMIT 1"
    );
  }
  return res.rows[0]?.id;
};
const getQuestion = async (question_id) => {
  const promises = [getQuestionById(question_id), getOptionsById(question_id)];
  const [question, options] = await Promise.all(promises);
  return {
    topicId: question.topic_id,
    questionId: question.id,
    questionText: question.question_text.trim(),
    answerOptions: options.map((option) => ({
      optionId: option.id,
      optionText: option.option_text.trim(),
    })),
  };
};
const getRandomQuestion = async (topic_id) => {
  const id = await getRandomQuestionId(topic_id);
  return await getQuestion(id);
};
export { getRandomQuestion, getRandomQuestionId, getQuestion };
