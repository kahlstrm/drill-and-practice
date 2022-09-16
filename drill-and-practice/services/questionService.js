import { executeQuery } from "../database/database.js";

const getTopicQuestions = async (topic_id) => {
  //fetch topic questions and count amount of options for each question
  const res = await executeQuery(
    "SELECT q.*,COUNT(o.id) AS option_count FROM questions AS q LEFT JOIN question_answer_options AS o ON q.id=o.question_id WHERE topic_id=$topic_id GROUP BY (q.id) ORDER BY q.question_text",
    { topic_id }
  );
  return res.rows;
};
const getQuestionById = async (id) => {
  const res = await executeQuery("SELECT * FROM questions WHERE id=$id", {
    id,
  });
  return res.rows[0];
};
const getOptionsById = async (question_id) => {
  const res = await executeQuery(
    "SELECT o.*,count(qa.id) FROM question_answer_options AS o LEFT JOIN question_answers as qa ON o.question_id=qa.question_id WHERE o.question_id=$question_id GROUP BY (o.id) ORDER BY o.option_text",
    { question_id }
  );
  return res.rows;
};
const getOptionById = async (id) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options where id=$id",
    { id }
  );
  return res.rows[0];
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
const removeQuestion = async (question_id) => {
  await executeQuery("DELETE FROM questions where id=$question_id", {
    question_id,
  });
};
const addOption = async (question_id, option_text, is_correct) => {
  await executeQuery(
    "INSERT INTO question_answer_options (question_id,option_text,is_correct) values($question_id,$option_text,$is_correct)",
    {
      question_id,
      option_text,
      is_correct,
    }
  );
};
const removeOption = async (option_id) => {
  await executeQuery(
    "DELETE FROM question_answers WHERE question_answer_option_id=$option_id",
    { option_id }
  );
  await executeQuery(
    "DELETE FROM question_answer_options WHERE id=$option_id",
    { option_id }
  );
};
export {
  getTopicQuestions,
  removeQuestions,
  addQuestion,
  removeQuestion,
  addOption,
  removeOption,
  getQuestionById,
  getOptionsById,
  getOptionById,
};
