import { executeQuery } from "../database/database.js";

const getTopicQuestions = async (topic_id) => {
  //fetch topic questions and count amount of options for each question
  const res = await executeQuery(
    "SELECT q.*,count(o.id) as option_count FROM questions AS q left join question_answer_options AS o ON q.id=o.question_id WHERE topic_id=$topic_id GROUP BY (q.id) ORDER BY q.question_text",
    { topic_id }
  );
  return res.rows;
};
const removeQuestions = async (topic_id) => {
  //remove all answers to questions by topic_id
  await executeQuery(
    "DELETE FROM question_answers WHERE question_id IN (SELECT id FROM questions WHERE topic_id=$topic_id)",
    { topic_id }
  );
  //remove all question options by topic_id
  await executeQuery(
    "DELETE FROM question_answer_options WHERE question_id IN (SELECT id FROM questions WHERE topic_id=$topic_id)",
    { topic_id }
  );
  //remove all questions by topic_id
  await executeQuery("DELETE FROM questions WHERE topic_id=$topic_id", {
    topic_id,
  });
};
const addQuestion = async (user_id, topic_id, question_text) => {
  await executeQuery(
    "INSERT INTO questions (user_id,topic_id,question_text) values($user_id,$topic_id,$question_text)",
    {
      user_id,
      topic_id,
      question_text,
    }
  );
};
export { getTopicQuestions, removeQuestions, addQuestion };
