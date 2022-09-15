import { executeQuery } from "../database/database.js";

const getTopicQuestions = async (topic_id) => {
  //fetch topic questions and count amount of options for each question
  const res = await executeQuery(
    "SELECT q.*,count(o.id) as option_count FROM questions AS q left join question_answer_options AS o ON q.id=o.question_id WHERE topic_id=$topic_id GROUP BY (q.id) ORDER BY q.question_text",
    { topic_id }
  );
  return res.rows;
};
export { getTopicQuestions };
